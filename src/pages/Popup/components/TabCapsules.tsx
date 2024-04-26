import React from 'react'

type Props = {
  content: string;
}

const TabCapsules = ({
  content,
}: Props) => {
  return (
    <div className={`
      bg-primary-600 text-white hover:bg-white hover:text-primary-600 duration-200
      px-4 py-1 border rounded-xl
    `}>
      {content}
    </div>
  )
}

export default TabCapsules