
// background.js
chrome.commands.onCommand.addListener((command) => {
  if (command === 'trigger-macro') {
    chrome.storage.sync.get(['macros'], async function(result) {
      const macros = result.macros || {};
      const macroNames = Object.keys(macros);
      
      if (macroNames.length === 0) {
        return;
      }

      // Create a list of macro options
      const options = macroNames.map((name, index) => ({
        content: name,
        description: macros[name]
      }));

      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Inject the content script
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: insertMacroText,
        args: [macros[macroNames[0]]] // Insert first macro by default
      });
    });
  }
});


// Function to be injected into the page
function insertMacroText(text) {
  const activeElement = document.activeElement;
  if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable) {
    const start = activeElement.selectionStart;
    const end = activeElement.selectionEnd;
    const value = activeElement.value || activeElement.innerText;
    const newValue = value.substring(0, start) + text + value.substring(end);
    
    if (activeElement.isContentEditable) {
      activeElement.innerText = newValue;
    } else {
      activeElement.value = newValue;
    }
    
    activeElement.selectionStart = activeElement.selectionEnd = start + text.length;
  }
}
