/**
 * Turn current page into grayscale
 */
function setGrayscale() {
    document.body.style.filter = "grayscale(100%)";
}

chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.type === "setGrayscale") {
        setGrayscale();
    }
});
