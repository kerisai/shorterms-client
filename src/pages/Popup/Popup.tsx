import React, { useEffect, useState } from 'react';
import "../../assets/styles/tailwind.css";

// Wrappers
import PopupWrapper from './wrappers/PopupWrapper';
import ContentPageWrapper from "./wrappers/ContentPageWrapper";

// Pages
import Header from './components/Header';
import DetectingTOSLoaderPage from './pages/DetectingTOSLoaderPage';
import TOSFoundPage from './pages/TOSFoundPage';
import NoTOSFoundPage from './pages/NoTOSFoundPage';
import ShorteningTOSLoaderPage from './pages/ShorteningTOSLoaderPage';
import ShortenTOSResultPage from './pages/ShortenTOSResultPage';

// Other
import { DetectTOSService } from './service/DetectTOSService';
import ErrorPage from './pages/ErrorPage';


/** Shorterms App States
 * 1. Initial / Detecting ToS 
 *  -- the app is searching for a ToS link on the current page => DetectingTOSLoaderPage
 * 2. ToS Found 
 *  -- the app has found a ToS link within the user's current page => TOSFoundPage
 * 3. ToS Not Found 
 *  -- the app cannot find a ToS link on the current page => NoTOSFoundPage
 * 4. Shorten ToS Loading 
 *  -- user consents to Shorten ToS and shortening service is run => ShorteningTOSLoaderPage
 * 5. Shorten ToS Finished
 *  -- system displays the results page with the 4 main tabs => ShortenTOSResultPage
 * 6. Error
 *  -- whenever an error occurs at runtime
 */
enum View {
  InitLoading,
  TOSFound,
  TOSNotFound,
  ShortenTOSLoading,
  ShortenTOSFinished,
  Error,
}


const Popup = () => {
  /**
   * App Main States
   */
  const [view, setView] = useState<View>(View.InitLoading);
  const [termsURL, setTermsURL] = useState<string>("");
  const [summarizeData, setSummarizeData] = useState<{
    service_provider: string,
    effective_date: string,
    content: string,
  } | null >(null);

  /**
   * Auxiliary States
   */
  const [isPageScrollable, setIsPageScrollable] = useState<Boolean>(false);

  /**
   * Page Logic States
   */
  const [detectedTOSLink, setDetectedTOSLink] = useState<String>("");

  // NOTE dummy data
  const service = new DetectTOSService();

  const findTOSLink = async () => {
    setView(View.InitLoading);

    try {
      const fetchedTermsURL = await service.findTOSLink();

      if (!fetchedTermsURL) {
        setView(View.TOSNotFound);
        return;
      }
      
      setView(View.TOSFound);
      setTermsURL(fetchedTermsURL);
    } catch (err) {
      const error = err as unknown as Error;
      
      console.log("ERROR");
      console.log(error);
      
      setView(View.Error);
    }

    // TODO DELETE - CONTROL PAGE for DEV
    // setView(View.ShortenTOSFinished);
  };

  const userAgreesToSummarizeTOS = () => {
    console.log("User given agreement to summarize TOS...");
    setView(View.ShortenTOSLoading);
  };

  const fetchTOSSummary = async () => {
    const response = await fetch("https://shorterms-api.fly.dev/summaries", {
      method: "POST",
      body: JSON.stringify({
        link_to_page: termsURL,
      }),
    });
    
    const data = await response.json();

    if (data) {
      setView(View.ShortenTOSFinished);
      setSummarizeData(data);
    } else {
      console.log("Error: summarize API failed to return data.");
      setView(View.Error)
    }
  };

  const renderView = (): React.ReactNode => {
    // Simple routing mechanism for app
    switch(view) {
      case View.TOSNotFound:
        return <NoTOSFoundPage />;
      case View.TOSFound:
        return <TOSFoundPage
          onAgree={userAgreesToSummarizeTOS}
        />;
      case View.ShortenTOSLoading:
        return <ShorteningTOSLoaderPage
          summarizeCallback={fetchTOSSummary}
        />;
      case View.ShortenTOSFinished:
        if (summarizeData !== null) {
          return <ShortenTOSResultPage
            service_provider={summarizeData.service_provider}
            effective_date={summarizeData.effective_date}
            content={summarizeData.content}
            terms_url={termsURL}
          />;
        }
        
        return <ErrorPage />;
      case View.Error:
        return <ErrorPage />;
      default: 
        return <DetectingTOSLoaderPage
          findTOSLink={findTOSLink}
        />;
    }
  };

  return (
    <PopupWrapper>
      <Header />
      
      <ContentPageWrapper scroll={isPageScrollable}>
        {renderView()}
      </ContentPageWrapper>
    </PopupWrapper>
  );
};

export default Popup;
