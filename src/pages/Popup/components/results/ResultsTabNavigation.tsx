import React from 'react'
import TabCapsules from '../TabCapsules'

type Props = {}

const ResultsTabNavigation = (props: Props) => {
  return (
    <nav className="flex flex-row justify-between py-1 px-2">
      <TabCapsules 
        content='What you agree'
      />

      <TabCapsules 
        content='What they agree'
      />

      <TabCapsules 
        content='Other points'
      />

      {/* TODO add Chatbox Tab */}
    </nav>
  )
}

export default ResultsTabNavigation