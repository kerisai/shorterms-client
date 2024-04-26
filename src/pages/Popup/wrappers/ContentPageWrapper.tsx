import React, { ReactNode } from "react";

interface ContentPageProps {
  children: ReactNode;
  scroll: Boolean;
}

const ContentPageWrapper = ({ 
  children, 
  scroll = false,
}: ContentPageProps) => {
  return (
    <div className={`
      relative mt-[50px] w-full h-[550px]
      overflow-x-hidden ${scroll ? "overflow-y-scroll" : "overflow-y-hidden"}
      bg-backdrop
    `}>
      {children}
    </div>
  );
};

export default ContentPageWrapper;