/**
 * check if the extension is active on every page load
 */
chrome.runtime.sendMessage({
    type: "checkIsActive",
});
