
// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { hideTitle, hideChannel } = message;

  // Apply changes based on message
  applyChanges(hideTitle, hideChannel);
});

// Apply changes when the page is loaded
chrome.storage.local.get(['hideTitle', 'hideChannel'], (data) => {
  applyChanges(data.hideTitle || false, data.hideChannel || false);
});

function applyChanges(hideTitle, hideChannel) {
  // Hide title
  const titleElement = document.querySelector('h1.style-scope .ytd-watch-metadata');
  if (titleElement) {
    titleElement.style.display = hideTitle ? 'none' : '';
  }

  // Hide channel name
  const channelElement = document.querySelector('#upload-info.style-scope .ytd-video-owner-renderer');
  if (channelElement) {
    channelElement.style.display = hideChannel ? 'none' : '';
  }
}