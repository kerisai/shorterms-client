import React from 'react';

import ResultsTopHeader from '../components/results/ResultsTopHeader';
import ResultsTabNavigation from '../components/results/ResultsTabNavigation';
import ResultsContentSection from '../components/results/ResultsContentSection';
import ResultsBottomFooter from '../components/results/ResultsBottomFooter';

type Props = {}

const ShortenTOSResultPage = (props: Props) => {
  return (
    <div className="relative flex flex-col w-full h-full">
      <ResultsTopHeader />

      <ResultsTabNavigation />

      <ResultsContentSection />

      <ResultsBottomFooter />
    </div>
  )
}

export default ShortenTOSResultPage