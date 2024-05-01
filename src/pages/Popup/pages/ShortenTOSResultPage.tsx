import React from 'react';

import ResultsTopHeader from '../components/results/ResultsTopHeader';
import ResultsTabNavigation from '../components/results/ResultsTabNavigation';
import ResultsContentSection from '../components/results/ResultsContentSection';
import ResultsBottomFooter from '../components/results/ResultsBottomFooter';

type Props = {
  service_provider: string;
  effective_date: string;
  content: string;
  terms_url: string;
}

const ShortenTOSResultPage = ({
  service_provider,
  effective_date,
  content,
  terms_url,
}: Props) => {
  return (
    <div className="relative flex flex-col w-full h-full">
      <ResultsTopHeader
        service_provider={service_provider}
        terms_url={terms_url}
        effective_date={effective_date}
      />

      {/* <ResultsTabNavigation /> */}

      <ResultsContentSection
        markdown={content}
      />

      <ResultsBottomFooter />
    </div>
  )
}

export default ShortenTOSResultPage