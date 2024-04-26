
console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// SCRIPTS THAT SHOULD BE RUN WHENEVER A URL PATTERN IS MATCHED!
const findTermsURLInPage = (): String | null => {
  const allLinks = document.querySelectorAll("a");

  if (allLinks.length == 0) {
    return null;
  }

  // TODO algo

  return "";
};
