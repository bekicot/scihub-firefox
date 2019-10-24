const SCIHUB_URL = 'scihub_url';
const DEFAULT_SCIHUB_URL = 'https://sci-hub.tw';
const CURRENT_URL = "current_url";
let storage = browser.storage.sync;
let config = {};

config[SCIHUB_URL] = DEFAULT_SCIHUB_URL;

function openSciHubPdf() {
  // Get current path
  browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
      if(tabs.length > 0) {
        // Get the CURRENT_URL configuration
        storage.get(config, function (config) {
          current_active_url = tabs[0].url
          browser.tabs.create({
            url: config[SCIHUB_URL] + '/' + current_active_url,
          });
        })
      }
  })
}

function updateCurrentPage(details) {
  let config = {};
  config[CURRENT_URL] = details.url;
  return storage.set(config);
}

browser.browserAction.onClicked.addListener(openSciHubPdf);
