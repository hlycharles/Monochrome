/**
 * Gets the current status of the extension
 *
 * @param {function(string)} callback called when the current status of the
 *   extension is retrieved
 */
function getGrayStatus(callback) {
  chrome.storage.sync.get("active", items => {
    callback(chrome.runtime.lastError ? false : items["active"]);
  });
}

/**
 * Sets current status of the extension
 *
 * @param {bool} isActive whether the extension is active
 */
function saveGrayStatus(isActive) {
  var items = {};
  items["active"] = isActive;
  chrome.storage.sync.set(items);
}

/**
 * Set current tab to grayscale
 */
function setCurrentTabGrayscale() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "setGrayscale"});
  });
}

/**
 * Colorize current tab
 */
function setCurrentTabColorful() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "setColorful"});
  });
}

chrome.browserAction.onClicked.addListener(tab => {
  getGrayStatus(isActive => {
    if (!isActive) {
      setCurrentTabGrayscale();
    } else {
      setCurrentTabColorful();
    }
    saveGrayStatus(!isActive);
  });
});

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.type === "checkIsActive") {
    getGrayStatus(isActive => {
      if (isActive) {
        setCurrentTabGrayscale();
      }
    })
  }
});
