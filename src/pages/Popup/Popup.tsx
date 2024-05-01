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
  const [termsURL, setTermsURL] = useState<String>("");
  const [isDetectingTOS, setIsDetectingTOS] = useState<Boolean>(false);
  const [isTOSFound, setIsTOSFound] = useState<Boolean>(false);
  const [isTOSShorteningLoading, setIsTOSShorteningLoading] = useState<Boolean>(false);
  const [isTOSShorteningFinished, setIsTOSShorteningFinished] = useState<Boolean>(false);
  
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

  const renderView = (): React.ReactNode => {
    // Simple routing mechanism for app
    switch(view) {
      case View.TOSNotFound:
        return <NoTOSFoundPage />;
      case View.TOSFound:
        return <TOSFoundPage />;
      case View.ShortenTOSLoading:
        return <ShorteningTOSLoaderPage />;
      case View.ShortenTOSFinished:
        return <ShortenTOSResultPage />;
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
