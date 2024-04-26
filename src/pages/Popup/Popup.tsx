import React, { useState } from 'react';
import "../../assets/styles/tailwind.css";

import logo from '../../assets/img/logo.svg';

import Header from './components/Header';
import ContentPage from "./pages/ContentPage";
import TermsDetectionPage from './pages/TermsDetectionPage';


const Popup = () => {
  const [isDetectionPage, setIsDetectionPage] = useState<boolean>(true);

  return (
    <div className={`w-[400px] h-[600px] rounded overflow-hidden`}>
      <Header />
      
      <ContentPage scroll={!isDetectionPage}>
        <TermsDetectionPage />
      </ContentPage>
    </div>
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
