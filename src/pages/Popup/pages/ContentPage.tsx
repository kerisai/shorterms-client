import React, { ReactNode } from "react";

interface ContentPageProps {
  children: ReactNode;
}

const ContentPage = ({ children }: ContentPageProps) => {
  return (
    <div className={`mt-[50px] w-full h-full overflow-x-hidden overflow-y-scroll`}>
      {children}
    </div>
  );
};

export default ContentPage;