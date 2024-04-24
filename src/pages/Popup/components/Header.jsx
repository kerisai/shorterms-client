import React from 'react';

import ShortermsIcon from "../../../assets/img/shorterms-logo.svg";
import CrossIcon from "../../../assets/img/shorterms-cross.svg";

const Header = () => {
  const handleClosePopup = () => {
    window.close();
  };
  return (
    <>
      <div className="flex justify-between px-4 py-2">
        <img src={ShortermsIcon} width={100} alt='Shorterms logo' />

        {/* <CrossIcon /> */}
        <img 
          src={CrossIcon} 
          onClick={handleClosePopup}
          alt='Close extension' 
          className="hover:cursor-pointer"
        />
      </div>
      
      <hr className="border-[1.5px]" />
    </>
  );
};

export default Header;