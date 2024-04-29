console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// Run Content Script on Window Load
window.addEventListener("load", () => {
  console.log("window.onLoad()...");
  
  chrome.runtime.sendMessage("VALIDATE_URL", (response: any) => {
    if (response === "VALIDATE_URL_SUCCESS") {
      console.log("VALIDATE_URL_SUCCESS, running script...");
      runContentScript();
    } else {
      console.log("INVALID_URL");
    }
    
    return;
  });
});

/**
 * 
 */
const filterAnchorsByTextContent = (
  anchorTagsList: NodeListOf<HTMLAnchorElement>
) => {
  let termsURL = "";

  enum AnchorTextKeywords {
    TERMS = "terms",
    TOS = "tos",
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

const findTermsURLInPage = async (): Promise<string | null> => {
  const POLLING_DURATION_SEC = 10;
  
  let termsURL = "";
  
  const anchorTagsList = await pollFindTermsURL(POLLING_DURATION_SEC);
  // const anchorTagsList = document.querySelectorAll("a");

  const fakeDOM = document.getElementsByTagName('body')[0];
  console.log(`DOM length ${fakeDOM.innerHTML.length} chars\n`);
  console.log("DOM\n", fakeDOM);

  if (anchorTagsList.length == 0) {
    console.log(`ERROR, No links found: anchorTagsList has 0 elements!`);
    return null;
  }

  // Filter by "Terms" related textContent
  console.log("<a> tags\n", anchorTagsList);
  console.log(`Running filterAnchorsByTextContent on ${anchorTagsList.length} <a> tags`);
  termsURL = filterAnchorsByTextContent(anchorTagsList);

  if (termsURL.length === 0) {
    console.log("termsURL has length 0!");
    return null;
  }
  
  return termsURL;
};

// Polling process for finding Terms URL for pages with delayed script load
const pollFindTermsURL = async (
  duration_secs: number,
): Promise<NodeListOf<HTMLAnchorElement>> => {
  const MS_IN_SECONDS = 1000;
  const POLL_COUNT = 20;
  const POLL_INTERVAL_SEC = duration_secs / POLL_COUNT;

  let pollingTries = 0;
  let anchorTagsList: NodeListOf<HTMLAnchorElement>;

  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (pollingTries >= POLL_COUNT) {
        console.log("Max poll tries reached...");
        clearTimeout(timer);
        reject(new Error("Failed to retrieve anchor element within specified duration"));
      }
      
      pollingTries++;
      console.log(`Running poll... #${pollingTries}`);
      
      anchorTagsList = document.querySelectorAll("a");
  
      if (anchorTagsList.length === 0) {
        console.log(`ERROR, No links found: anchorTagsList has 0 elements!`);
      } else {
        // Stop interval if anchor tags are found
        clearTimeout(timer);
        resolve(anchorTagsList);
      }
    }, POLL_INTERVAL_SEC * MS_IN_SECONDS);
  });
};

const runContentScript = async () => {
  useMutationObserver();

  let termsURL = await findTermsURLInPage();

  // TODO pass to backend
  console.log("termsURL:", termsURL);

  return true;
};

// MutationObserver impl
const initMutationObserver = () => {
  const callback = (mutationList: any, observer: any) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        console.log("A child node has been added or removed.");
      } else if (mutation.type === "attributes") {
        console.log(`The ${mutation.attributeName} attribute was modified.`);
      }
    }
  };

  return new MutationObserver(callback);
};

const useMutationObserver = () => {
  const DURATION_SECS = 30;

  const targetNode = document.querySelector("body") as Node;

  const config = {
    attributes: true,
    childList: true,
    subtree: true,
  }

  const observer = initMutationObserver();
  
  observer.observe(targetNode, config);
  
  setTimeout(() => {
    observer.disconnect();
  }, DURATION_SECS*1000);
};
