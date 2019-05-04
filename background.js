const SCIHUB_URL = 'scihub_url';
const DEFAULT_SCIHUB_URL = 'https://sci-hub.tw/';
const CURRENT_URL = "current_url";
let storage = browser.storage.sync;
let config = {};

config[SCIHUB_URL] = DEFAULT_SCIHUB_URL;
config[CURRENT_URL] = null;

function openSciHubPdf() {
  storage.get(config, function (config) {
    browser.tabs.create({
      url: config[SCIHUB_URL] + '/' + config[CURRENT_URL],
    });
  })
}

function updateCurrentPage(details) {
  let config = {};
  config[CURRENT_URL] = details.url;
  return storage.set(config);
}

browser.webRequest.onBeforeRequest.addListener(updateCurrentPage, {
  urls: ["<all_urls>"],
  types: ["main_frame"]
});


browser.browserAction.onClicked.addListener(openSciHubPdf);
