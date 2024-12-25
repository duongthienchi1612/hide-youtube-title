document.addEventListener('DOMContentLoaded', () => {
  const hideTitleCheckbox = document.getElementById('hideTitle');
  const hideChannelCheckbox = document.getElementById('hideChannel');
  const applyButton = document.getElementById('apply');

  // Load saved settings from Chrome Storage
  chrome.storage.local.get(['hideTitle', 'hideChannel'], (data) => {
    hideTitleCheckbox.checked = data.hideTitle || false;
    hideChannelCheckbox.checked = data.hideChannel || false;
  });

  // Save settings when user clicks "Apply"
  applyButton.addEventListener('click', () => {
    const hideTitle = hideTitleCheckbox.checked;
    const hideChannel = hideChannelCheckbox.checked;

    // Save settings to Chrome Storage
    chrome.storage.local.set({ hideTitle, hideChannel }, () => {
      console.log('Settings saved:', { hideTitle, hideChannel });
    });

    // Send settings to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { hideTitle, hideChannel });
    });
  });
});
