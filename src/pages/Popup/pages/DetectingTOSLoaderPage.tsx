import React, { useEffect } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {
  findTOSLink: () => {};

}

const DetectingTOSLoaderPage = ({
  findTOSLink
}: Props) => {
  useEffect(() => {
    findTOSLink();
  }, []);

  return (
    <div className="w-full h-[70dvh] flex flex-col justify-center items-center">
      <ClipLoader
        color="#458bff"
        size={60}
        speedMultiplier={0.6}
      />

      <span className="pt-[18px]"></span>

      <h1 className="text-lg text-center text-gray-800 font-semibold">
        Hello! 
      </h1>
      <h2 className="text-sm text-center text-gray-500">
        Finding Terms of Service URL in the page...
      </h2>
    </div>
  )
}

export default DetectingTOSLoaderPage