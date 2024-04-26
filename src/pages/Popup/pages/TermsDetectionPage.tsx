import React from 'react';

const TermsDetectionPage = () => {
  let temp = [];
  for (let i = 0; i < 100; i++) {
    temp.push("Lorem ipsum");
  }

  return (
    <div className={`w-full min-h-full flex flex-col bg-green-300`}>
      <img />

      <h1>
        We detected a Terms of Service link on this site
      </h1>
      <p>
        Do you want to summarize it using Shorterms AI?
      </p>

      {/* {temp.map(item => (
        <div className="text-lg">
          {item}
        </div>
      ))}
       */}
    </div>
  );
}

export default TermsDetectionPage;