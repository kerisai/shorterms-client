console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// Run Content Script on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  
  chrome.runtime.sendMessage("VALIDATE_URL", (response: any) => {
    if (response === "VALIDATE_URL_SUCCESS") {
      console.log("VALIDATE_URL_SUCCESS, running script...");
      runContentScript();
    }
    
    console.log("INVALID_URL");
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

  console.log(`document: ${document}`);
  console.log(`anchorTagsList: ${anchorTagsList}`);
  
  if (anchorTagsList.length == 0) {
    console.log(`No links found: anchorTagsList has 0 elements!`);
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
  let termsURL = findTermsURLInPage();

  // TODO pass to backend
  console.log("termsURL:", termsURL);

  return true;
};