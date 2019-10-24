const SCIHUB_URL = 'scihub_url';
const DEFAULT_SCIHUB_URL = 'https://sci-hub.tw/';

let storage = browser.storage.sync;
let errorLabel = document.getElementById("defaultUrlError");
let savedLabel = document.getElementById("defaultUrlSaved");
let defaultUrlInput = document.getElementById("defaultUrl");
defaultUrlInput.disabled = true;

let last_url = DEFAULT_SCIHUB_URL;
let config = {};

config[SCIHUB_URL] = DEFAULT_SCIHUB_URL;

storage.get(config).then(function(config) {
  defaultUrlInput.value = config[SCIHUB_URL];
  last_url = config[SCIHUB_URL];
  defaultUrlInput.disabled = false;
});

function registerChanges(e) {
  if (!e.target.value.match(/^((http|https)\:\/\/)?(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[1-9]?[0-9]+)?\/?$/)) {
    errorLabel.style.display = 'block';
    savedLabel.style.display = 'none';
  } else {
    errorLabel.style.display = 'none';
    savedLabel.style.display = 'block';
    let config = {};
    config[SCIHUB_URL] = e.target.value;
    storage.set(config);
  }
}
defaultUrlInput.addEventListener("input", registerChanges);

