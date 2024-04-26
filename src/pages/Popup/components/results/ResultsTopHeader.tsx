import React from 'react'

type Props = {}

const ResultsTopHeader = (props: Props) => {
  return (
    <>
    <div className="py-1 px-2">
      <h1 className="font-semibold text-lg">
        Stark Lab, Inc
      </h1>
      <p className="text-xs text-gray-500 underline">
        www.getstark.co/tos
      </p>
      <p className="text-xs text-gray-500">
        Fetched 15 April 2024
      </p>
    </div>

    <hr className="border-[1.5px] border-gray-300 w-full" />
    </>
  )
}

export default ResultsTopHeader