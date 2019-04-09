async function openSciHubPdf() {
  browser.storage.local.get("currentUrl", function (storage) {
    browser.tabs.create({
      url: "https://sci-hub.tw/" + storage.currentUrl,
    });
  })
}

async function updateCurrentPage(details) {
  return browser.storage.local.set({
    currentUrl: details.url,
  })
}

browser.webRequest.onBeforeRequest.addListener(updateCurrentPage, {
  urls: ["<all_urls>"],
  types: ["main_frame"]
});


browser.browserAction.onClicked.addListener(openSciHubPdf);
