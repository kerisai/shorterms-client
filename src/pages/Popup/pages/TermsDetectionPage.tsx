import React from 'react';

const TermsDetectionPage = () => {
  let temp = [];
  for (let i = 0; i < 100; i++) {
    temp.push("Lorem ipsum");
  }

  return (
    <div className={`w-full min-h-full bg-green-300`}>
      {temp.map(item => (
        <div className="text-lg">
          {item}
        </div>
      ))}
    </div>
  );
}

export default TermsDetectionPage;