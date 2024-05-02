export class DetectTOSService {
  async findTOSLink(): Promise<string> {
    const EVENT_NAME = "FIND_TOS_LINK_REQUEST";
    const currentTab = await getActiveTab();
    let tabId = currentTab.id;
    
    if (tabId === undefined) {
      const errorMsg = "ERROR: Popup.service.DetectTOSService.findTOSLink: currentTab.id is undefined!";
      throw new Error(errorMsg);
    }

    // let link: string | null = null;

    const link = await new Promise<string>((resolve) => {
      chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
      if(tabs.length === 0) {
        resolve("");
        return;
      };

      chrome.tabs.sendMessage(tabs[0].id!, "FIND_TOS_LINK_REQUEST",
      (response: string) => {
        if (!response) {
          // (`No response received from event ${EVENT_NAME} callback`);
          resolve("");
          return;
        }  
        
        // (`Received response for link ${EVENT_NAME}\n`, response);

        resolve(response);
      });
  });});

  return link;
  }
}

async function getActiveTab(): Promise<chrome.tabs.Tab> {
  const tabs = await chrome.tabs.query({
    currentWindow: true,
    active: true,
  });

  return tabs[0];
}

