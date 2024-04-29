console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// Run Content Script on Window Load

// document.addEventListener("load", () => {
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

const findTermsURLInPage = (): string | null => {
  let termsURL: string = "";
  
  const anchorTagsList = document.querySelectorAll("a");

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

const runContentScript = async () => {
  useMutationObserver();

  let termsURL = findTermsURLInPage();

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
