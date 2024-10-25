
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
  
  // Special handling for Gmail compose
  if (window.location.hostname === 'mail.google.com' && activeElement.getAttribute('role') === 'textbox') {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    // Create a new text node with the macro text
    const textNode = document.createTextNode(text);
    
    // Delete any selected text
    range.deleteContents();
    
    // Insert the new text
    range.insertNode(textNode);
    
    // Move the cursor to the end of the inserted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    
    return;
  }
  
  // Handle regular input fields and textareas
  if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
    const start = activeElement.selectionStart;
    const end = activeElement.selectionEnd;
    const value = activeElement.value;
    const newValue = value.substring(0, start) + text + value.substring(end);
    activeElement.value = newValue;
    activeElement.selectionStart = activeElement.selectionEnd = start + text.length;
    return;
  }
  
  // Handle other contenteditable elements
  if (activeElement.isContentEditable) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    // Create a new text node with the macro text
    const textNode = document.createTextNode(text);
    
    // Delete any selected text
    range.deleteContents();
    
    // Insert the new text
    range.insertNode(textNode);
    
    // Move the cursor to the end of the inserted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
