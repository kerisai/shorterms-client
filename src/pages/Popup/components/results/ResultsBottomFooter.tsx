import React from 'react'

type Props = {}

const ResultsBottomFooter = (props: Props) => {
  return (
    <div className="absolute bottom-0 flex flex-col">
      <hr className="border-[1.5px] border-gray-300 w-full" />
      <footer className="py-1 px-2">
        <p className="text-xs text-gray-500">
          *This may not represent the service provider's terms accurately.  See Shorterms' disclaimer for more. 
        </p>
      </footer>
    </div>
  )
}

export default ResultsBottomFooter