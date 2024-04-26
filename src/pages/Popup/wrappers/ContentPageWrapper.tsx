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
      relative mt-[50px] w-full min-h-full 
      overflow-x-hidden ${scroll ? "overflow-y-scroll" : "overflow-y-hidden"}
      bg-backdrop
    `}>
      {children}
    </div>
  );
};

export default ContentPageWrapper;