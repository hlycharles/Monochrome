/**
 * Turn current page into full color
 */
function setColorful() {
    document.body.style.removeProperty("filter");
}

chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.type === "setColorful") {
        setColorful();
    }
});
