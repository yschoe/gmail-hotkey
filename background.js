chrome.commands.onCommand.addListener((command) => {
  if (command === "insert_text_1") {
    insertText("No reply usually means no. Repeated reminders are considered unprofessional.");
  } else if (command === "insert_text_2") {
    insertText("This is predefined text 2");
  }
});

function insertText(text) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (text) => {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA") {
          activeElement.value += text;
        }
      },
      args: [text]
    });
  });
}
