import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

import "../../assets/styles/tailwind.css";

const Popup = () => {
  return (
    <div>
      <header>
        <h1 className='text-red-500'>
          Hello World!!
        </h1>
      </header>
    </div>
  );
};

// Select our shadow host
let extensionRoot = document.getElementById('extension-host');
if (extensionRoot) {
  // Create the shadow root
  const shadowRoot = extensionRoot.shadowRoot;

  if (shadowRoot) {
    let div = shadowRoot.getElementById('extension');
    if (!div) {
      // Create a div element
      div = document.createElement('div');
      div.setAttribute('id', 'extension');

      // Append div to shadow DOM
      shadowRoot.appendChild(div);
    }
  }
}

export default Popup;
