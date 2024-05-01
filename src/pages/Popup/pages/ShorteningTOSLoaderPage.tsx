import React, { useEffect } from 'react'
import { ClipLoader } from 'react-spinners'

interface Props {
  summarizeCallback: () => void;
}

const ShorteningTOSLoaderPage = ({
  summarizeCallback,
}: Props) => {
  useEffect(() => {
    summarizeCallback();
  }, []);
  
  return (
    <div className="w-full h-[70dvh] flex flex-col justify-center items-center">
      <ClipLoader
        color="#458bff"
        size={60}
        speedMultiplier={0.8}
      />

      <span className="pt-[18px]"></span>

      <h1 className="text-lg text-center text-gray-800 font-semibold">
        Loading...
      </h1>
      <h2 className="text-sm text-center text-gray-500">
        Summarizing the terms... sit tight!
      </h2>
    </div>
  )
}

export default ShorteningTOSLoaderPage