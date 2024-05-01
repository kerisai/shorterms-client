import React from 'react'

type Props = {
  service_provider: string,
  terms_url: string,
  effective_date: string,
}

const ResultsTopHeader = ({
  service_provider,
  terms_url,
  effective_date
}: Props) => {
  return (
    <>
    <div className="py-1 px-2">
      <h1 className="font-semibold text-lg">
        {service_provider}
      </h1>
      <a 
        href={terms_url} 
        target='_blank' 
        rel="noopener noreferrer"
        className="text-xs text-gray-500 underline">
        {terms_url}
      </a>
      <p className="text-xs text-gray-500">
        Effective since {effective_date}
      </p>
    </div>

    <hr className="border-[1.5px] border-gray-300 w-full" />
    </>
  )
}

export default ResultsTopHeader