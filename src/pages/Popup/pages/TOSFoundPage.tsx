import React from 'react';
import { IoIosWarning } from "react-icons/io";


import Button from '../components/Button';

const TOSFoundPage = () => {
  return (
    <div 
    // NOTE top-[80%] pushes content to container bottom, adjust ~20% in top distance for extension layout
    className={`
      absolute top-[22%] 
      w-[100%] max-h-full 
      overflow-hidden 
      px-[28px]
      flex flex-col items-center`
    }>
      <div className="flex flex-col items-center">
        <IoIosWarning
          size={50}
          className="text-gray-600"
        />

        <span className="pt-[6px]"></span>

        <h1 className="text-gray-800 px-2 text-xl text-center">
          We detected a Terms of Service link
          on this site
        </h1>

        <span className="pt-[4px]"></span>

        <p className="text-gray-500 text-xs text-center">
          Summarize it with Shorterms AI?
        </p>
      </div>
      
      <span className="pt-[24px]"></span>

      <div className="w-[120px]">
        <Button 
          label="Yes"
          onClick={() => {}}
        />
      </div>

      <span className="pt-[12px]"></span>

      <p className="text-[10px] text-gray-500">
        By clicking “Yes” you agree to 
        Shorterms Terms of Service
      </p>
    </div>
  );
}

export default TOSFoundPage;