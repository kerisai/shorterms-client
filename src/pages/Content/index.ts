// console.log('Content script works!');
// console.log('Must reload extension for modifications to take effect.');
const termsURLDetectedEvent = new Event("termsURLDetectedEvent");

// Custom event handler for Shorterms
document.addEventListener("termsURLDetectedEvent", () => {
  // Add parent container node for Modal
  let shortermsContainer = document.createElement('div');
  shortermsContainer.id = "shorterms-container";
  shortermsContainer.style.cssText = "position: absolute; top: 0px; right: 0px; width: 0px; height: 0px; overflow: visible; z-index: 2147483647;";

  // Refer to Simplify
  const shortermsContainerSpan = document.createElement("span");
  shortermsContainerSpan.id = "shorterms-container-span";
  
  shortermsContainer.appendChild(shortermsContainerSpan);

  // Append Shadow DOM before inserting to Body
  injectInfoModal(shortermsContainerSpan);

  document.body.insertAdjacentElement("afterend", shortermsContainer);
})

chrome.runtime.sendMessage('VALIDATE_URL', async (response: any) => {
  if (response === 'VALIDATE_URL_SUCCESS') {
    // console.log('VALIDATE_URL_SUCCESS, running script...');

    try {
      const termsURL = await runContentScript();

      if (termsURL === null) {
        throw new Error('Error: termsURL is null!');
      }

      // console.log('SET termsURL', termsURL);
      // console.log(`sendResponse: ${termsURL}`);
      // console.log(termsURL);

      chrome.storage.session.set({ termsURL: termsURL });
      
      document.dispatchEvent(termsURLDetectedEvent);
    } catch (err) {
      const error = err as unknown as Error;

      // console.log(error.message);
    }
  } else {
    // console.log('INVALID_URL');
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log('Inside FIND_TOS_LINK_REQUEST');

  if (message === 'FIND_TOS_LINK_REQUEST') {
    chrome.runtime.sendMessage('VALIDATE_URL', async (response: any) => {
      if (response === 'VALIDATE_URL_SUCCESS') {
        // console.log('VALIDATE_URL_SUCCESS, running script...');

        try {
          const termsURL = await runContentScript();

          if (termsURL === null) {
            throw new Error('Error: termsURL is null!');
          }

          // console.log('SET termsURL', termsURL);
          // console.log(`sendResponse: ${termsURL}`);
          sendResponse(termsURL);

          // TODO Inject Shadow DOM Modal into page
          // await injectInfoModal();

        } catch (err) {
          const error = err as unknown as Error;

          // console.log(error.message);
        }
      } else {
        // console.log('INVALID_URL');
      }
    });
  }

  // NOTE - Listener must return true bcs sendResponse is sent within async context
  // https://www.extension.ninja/blog/post/solved-message-port-closed-before-response-was-received/
  return true;
});

const filterAnchorsByTextContent = (
  anchorTagsList: NodeListOf<HTMLAnchorElement>
) => {
  let termsURL = '';

  enum AnchorTextKeywords {
    TERMS = 'terms',
    TOS = 'tos',
  }

  for (let i = 0; i < anchorTagsList.length; i++) {
    const item = anchorTagsList[i];
    const itemLower = item.text.toLowerCase();

    if (itemLower.includes(AnchorTextKeywords.TERMS)) {
      termsURL = item.href;
      break;
    }

    if (itemLower.includes(AnchorTextKeywords.TOS)) {
      termsURL = item.href;
      break;
    }
  }

  return termsURL;
};

const findTermsURLInPage = async (): Promise<string> => {
  const POLLING_DURATION_SEC = 10;

  let termsURL = '';

  try {
    const anchorTagsList = await pollFindTermsURL(POLLING_DURATION_SEC);

    const fakeDOM = document.getElementsByTagName('body')[0];
    // console.log(`DOM length ${fakeDOM.innerHTML.length} chars\n`);
    // console.log('DOM\n', fakeDOM);

    if (anchorTagsList.length == 0) {
      throw new Error('Error: No links found, anchorTagsList has 0 elements!');
    }

    // Filter by "Terms" related textContent
    // console.log('<a> tags\n', anchorTagsList);
    // console.log(`Running filterAnchorsByTextContent on ${anchorTagsList.length} <a> tags`);
    termsURL = filterAnchorsByTextContent(anchorTagsList);

    if (termsURL.length === 0) {
      throw new Error('Error: termsURL has length 0!');
    }

    return termsURL;
  } catch (error) {
    // Throw error to caller
    throw error;
  }
};

// Polling process for finding Terms URL for pages with delayed script load
const pollFindTermsURL = async (
  duration_secs: number
): Promise<NodeListOf<HTMLAnchorElement>> => {
  const MS_IN_SECONDS = 1000;
  const POLL_COUNT = 20;
  const POLL_INTERVAL_SEC = duration_secs / POLL_COUNT;

  let pollingTries = 0;
  let anchorTagsList: NodeListOf<HTMLAnchorElement>;

  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (pollingTries >= POLL_COUNT) {
        // console.log('Max poll tries reached...');
        clearTimeout(timer);
        reject(
          new Error(
            'Error: Failed to retrieve anchor element within specified duration'
          )
        );
      }

      pollingTries++;
      // console.log(`Running poll... #${pollingTries}`);

      anchorTagsList = document.querySelectorAll('a');

      if (anchorTagsList.length === 0) {
        // console.log(`Poll ${pollingTries} - No links found: anchorTagsList has 0 elements!`);
      } else {
        // Stop interval if anchor tags are found
        // console.log(`Poll ${pollingTries} - Found result!`);
        clearTimeout(timer);
        resolve(anchorTagsList);
      }
    }, POLL_INTERVAL_SEC * MS_IN_SECONDS);
  });
};

// MutationObserver impl
const initMutationObserver = () => {
  const callback = (mutationList: any, observer: any) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        // console.log('A child node has been added or removed.');
      } else if (mutation.type === 'attributes') {
        // console.log(`The ${mutation.attributeName} attribute was modified.`);
      }
    }
  };

  return new MutationObserver(callback);
};

const useMutationObserver = () => {
  const DURATION_SECS = 30;

  const targetNode = document.querySelector('body') as Node;

  const config = {
    attributes: true,
    childList: true,
    subtree: true,
  };

  const observer = initMutationObserver();

  observer.observe(targetNode, config);

  setTimeout(() => {
    observer.disconnect();
  }, DURATION_SECS * 1000);
};

/**
 * A function to find the terms URL within the page
 * @returns string
 */
const runContentScript = async (): Promise<string> => {
  // useMutationObserver();

  try {
    return await findTermsURLInPage();
  } catch (err: unknown) {
    throw err;
  }
};

// Inject InfoModal HTML into page

// IMPL 2 - Working but Shadow DOM covers the whole page...
const injectInfoModal = async (parent: HTMLElement) => {
  // console.log("Running injectInfoModal()...");

  // Insert as Shadow DOM
  const shadow = parent.attachShadow({ mode: "open" });

  const infoModal = await fetch(chrome.runtime.getURL('InfoModal.html'));
  const infoModalHTMLString = await infoModal.text();
  const infoModalHTML = convertStringIntoHTMLNode(infoModalHTMLString)

  // console.log(`infoModalHTML: ${infoModalHTML} | text: ${infoModalHTML?.textContent}`);
  
  shadow?.appendChild(infoModalHTML);
};

const convertStringIntoHTMLNode = (HTMLString: string) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = HTMLString;
  const HTML = wrapper.firstChild!;

  return HTML;
}
