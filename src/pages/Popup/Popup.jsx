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

export default Popup;
