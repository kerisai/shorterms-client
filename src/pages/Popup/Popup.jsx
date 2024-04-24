import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import Header from './components/Header';

import "../../assets/styles/tailwind.css";

const Popup = () => {
  return (
    <div className={`w-[350px] h-[600px] rounded`}>
      <Header />
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
