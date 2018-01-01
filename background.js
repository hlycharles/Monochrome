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

chrome.browserAction.onClicked.addListener(tab => {
  getGrayStatus(isActive => {
    if (!isActive) {
      chrome.tabs.executeScript(null, {
        file: "grayscale.js",
      });
    } else {
      chrome.tabs.executeScript(null, {
        file: "colorize.js",
      });
    }
    saveGrayStatus(!isActive);
  });
});
