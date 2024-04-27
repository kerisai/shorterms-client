console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Filter keywords
  const KEYWORDS = ["signin", "signup", "register", "sign-in", "sign-up"];

  if (msg !== "VALIDATE_URL") return; 

  console.log("Inside chrome.runtime.onMessage");

  const tab = sender.tab;

  if (!tab || !tab.url || !tab.id) {
    console.log("Tab or URL doesn't exist!");
    return;
  }

  if (isSearchEngineQuery(tab.url)) {
    console.log("Tab is a search query!");
    return;
  }

  let url = tab.url;
  let urlContainsKeyword = false;
  
  console.log(`url: ${url}`);
  console.log("Finding valid keywords in URL...");
  for (const kw of KEYWORDS) {
    console.log(`Checking keyword ${kw} in url`);
    if (url.toLowerCase().includes(kw)) {
      urlContainsKeyword = true;
      break;
    }
  }

  console.log(`urlContainsKeyword: ${urlContainsKeyword}`);

  if (urlContainsKeyword) {
    const response = "VALIDATE_URL_SUCCESS";

    sendResponse(response);
  }

  return;
});

const isSearchEngineQuery = (url: string) => {
  const GOOGLE = "google.com/search";
  const BING = "bing.com/search";
  const YOUTUBE = "youtube.com/results";
  const TIKTOK = "tiktok.com/search";

  return url.includes(GOOGLE) 
    || url.includes(BING)
    || url.includes(TIKTOK)
    || url.includes(YOUTUBE);
};

// async function getActiveTab() {
//   const tabs = await chrome.tabs.query({
//       currentWindow: true,
//       active: true
//   });

//   return tabs[0];
// }