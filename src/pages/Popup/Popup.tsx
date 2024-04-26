import React, { useState } from 'react';
import "../../assets/styles/tailwind.css";

import PopupWrapper from './wrappers/PopupWrapper';
import ContentPageWrapper from "./wrappers/ContentPageWrapper";

import Header from './components/Header';
import TOSFoundPage from './pages/TOSFoundPage';

/** Shorterms App States
 * 1. Detecting ToS 
 *  -- the app is searching for a ToS link on the current page => DetectingTOSLoaderPage
 * 2. ToS Found 
 *  -- the app has found a ToS link within the user's current page => TOSFoundPage
 * 3. ToS Not Found 
 *  -- the app cannot find a ToS link on the current page => NoTOSFoundPage
 * 4. Shorten ToS Loading 
 *  -- user consents to Shorten ToS and shortening service is run => ShorteningTOSLoaderPage
 * 5. Shorten ToS Finished
 *  -- system displays the results page with the 4 main tabs => ShortenTOSResultPage
 */

const Popup = () => {
  const [isPageScrollable, setIsPageScrollable] = useState<boolean>(false);

  const [detectedTOSLink, setDetectedTOSLink] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);

  return (
    <PopupWrapper>
      <Header />
      
      <ContentPageWrapper scroll={isPageScrollable}>
        {isLoading && (
          <div>
            LOADING
          </div>
        )}
        {detectedTOSLink.length > 0 && (
          <TOSFoundPage />
        )}
      </ContentPageWrapper>
    </PopupWrapper>
  );
};

// COMMENTED DUE TO RENDERING BUG
// // Select our shadow host
// let extensionRoot = document.getElementById('extension-host');
// if (extensionRoot) {
//   // Create the shadow root
//   const shadowRoot = extensionRoot.shadowRoot;

//   if (shadowRoot) {
//     let div = shadowRoot.getElementById('extension');
//     if (!div) {
//       // Create a div element
//       div = document.createElement('div');
//       div.setAttribute('id', 'extension');

//       // Append div to shadow DOM
//       shadowRoot.appendChild(div);
//     }
//   }
// }

export default Popup;
