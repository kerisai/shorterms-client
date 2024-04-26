import React from 'react'
import { PiSmileySadThin } from "react-icons/pi";


type Props = {}

const NoTOSFoundPage = (props: Props) => {
  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center">
      <PiSmileySadThin 
        size={100}
      />

      <span className="pt-[12px]"></span>

      <h1 className="text-base text-gray-700">
        {"Hmm... no Terms of Service link found in page :("}
      </h1>
    </div>
  )
}

export default NoTOSFoundPage