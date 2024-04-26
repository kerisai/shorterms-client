import React, { ReactNode } from "react";

interface ContentPageProps {
  children: ReactNode;
  scroll?: boolean;
}

const ContentPage = ({ 
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

export default ContentPage;