console.log('This is the background page.');
console.log('Put the background scripts here.');

// chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg !== 'VALIDATE_URL') return;

  // Filter keywords
  console.log('Inside chrome.runtime.onMessage');

  const KEYWORDS = [
    'login',
    'log-in',
    'signin',
    'signup',
    'register',
    'sign-in',
    'sign-up',
  ];
  const tab = sender.tab;

  if (!tab || !tab.url || !tab.id) {
    console.log("Tab or URL doesn't exist!");
    return;
  }

  if (isSearchEngineQuery(tab.url)) {
    console.log('Tab is a search query!');
    return;
  }

  let url = tab.url;
  let urlContainsKeyword = false;

  console.log(`url: ${url}`);
  console.log('Finding valid keywords in URL...');
  for (const kw of KEYWORDS) {
    console.log(`Checking keyword ${kw} in url`);
    if (url.toLowerCase().includes(kw)) {
      urlContainsKeyword = true;
      break;
    }
  }

  console.log(`urlContainsKeyword: ${urlContainsKeyword}`);

  if (urlContainsKeyword) {
    const response = 'VALIDATE_URL_SUCCESS';

    sendResponse(response);
  } else {
    const responseInvalid = 'INVALID_URL';
    console.log(responseInvalid);
    sendResponse(responseInvalid);
  }
});

const isSearchEngineQuery = (url: string) => {
  const GOOGLE = 'google.com/search';
  const BING = 'bing.com/search';
  const YOUTUBE = 'youtube.com/results';
  const TIKTOK = 'tiktok.com/search';

  return (
    url.includes(GOOGLE) ||
    url.includes(BING) ||
    url.includes(TIKTOK) ||
    url.includes(YOUTUBE)
  );
};

// "externally_connectable": {
//   "ids": ["ipdmhnfcaelfmeappeahgeofdncnncmb"],
//   "matches": ["http://*/*", "https://*/*", "<all_urls>"],
//   "accepts_tls_channel_id": false
// }
