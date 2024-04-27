import React from 'react'

type Props = {
  content: string;
}

const TabCapsules = ({
  content,
}: Props) => {
  return (
    <div className={`
      bg-primary-600 text-white 
      px-4 py-1 border rounded-xl
      hover:bg-white hover:border-primary-600 hover:text-primary-600 hover:cursor-pointer duration-200
    `}>
      {content}
    </div>
  )
}

export default TabCapsules