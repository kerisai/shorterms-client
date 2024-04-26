import React, { ReactNode } from "react";

interface PopupWrapperProps {
  children: ReactNode;
}

const PopupWrapper = ({ 
  children, 
}: PopupWrapperProps) => {
  return (
    <div className={`w-[400px] h-[600px] rounded overflow-hidden`}>
      {children}
    </div>
  );
};

export default PopupWrapper;