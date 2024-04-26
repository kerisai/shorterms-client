import React from 'react';

import ShortermsIcon from "../../../assets/img/shorterms-logo.svg";
import CrossIcon from "../../../assets/img/shorterms-cross.svg";

const Header = () => {
  const handleClosePopup = () => {
    window.close();
  };
  return (
    <nav className="w-full fixed top-0 bg-white z-10">
      <div className={`
        flex justify-between 
        px-4 py-2
      `}>
        <img src={ShortermsIcon} width={100} alt='Shorterms logo' />

        {/* <CrossIcon /> */}
        <img 
          src={CrossIcon} 
          onClick={handleClosePopup}
          alt='Close extension' 
          className="hover:cursor-pointer"
        />
      </div>
      
      <hr className="border-[1.5px] border-gray-300 w-full" />
    </nav>
  );
};

export default Header;