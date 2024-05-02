import React from 'react'

type Props = {}

const InfoModal = (props: Props) => {
  return (
    <div className={`
      absolute top-0 right-0 z-100 opacity-70
      px-4 py-2 rounded-lg bg-gray-200 w-[200px] h-[50px]
    `}>
      <p>
        We detected a Terms of Service link in this page  
      </p>
      <p>
        Please open the Shorterms Chrome extension or click 
        {navigator.userAgent.indexOf('Mac OS X') != -1 ? "Cmd + Shift + S" : "Ctrl + Shift + S"}
        to open.
      </p>
    </div>
  );
}

export default InfoModal;