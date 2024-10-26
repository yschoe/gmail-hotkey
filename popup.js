
// popup.js
document.addEventListener('DOMContentLoaded', function() {
  const macroList = document.getElementById('macroList');
  const addButton = document.getElementById('addMacro');

  // Load existing macros
  chrome.storage.sync.get(['macros'], function(result) {
    const macros = result.macros || {};
    displayMacros(macros);
  });

  // Add new macro
  addButton.addEventListener('click', function() {
    addMacroEntry();
  });

  function addMacroEntry(name = '', text = '') {
    const entry = document.createElement('div');
    entry.className = 'macro-entry';
    entry.innerHTML = `
      <input type="text" class="macro-name" placeholder="Macro Name" value="${name}">
      <input type="text" class="macro-text" placeholder="Text to Insert" value="${text}">
      <button class="save-macro">Save</button>
      <button class="delete-macro">Delete</button>
    `;

    entry.querySelector('.save-macro').addEventListener('click', function() {
      const macroName = entry.querySelector('.macro-name').value;
      const macroText = entry.querySelector('.macro-text').value;
      
      if (macroName && macroText) {
        chrome.storage.sync.get(['macros'], function(result) {
          const macros = result.macros || {};
          macros[macroName] = macroText;
          chrome.storage.sync.set({ macros }, function() {
            displayMacros(macros);
          });
        });
      }
    });

    entry.querySelector('.delete-macro').addEventListener('click', function() {
      const macroName = entry.querySelector('.macro-name').value;
      chrome.storage.sync.get(['macros'], function(result) {
        const macros = result.macros || {};
        delete macros[macroName];
        chrome.storage.sync.set({ macros }, function() {
          displayMacros(macros);
        });
      });
    });

    macroList.appendChild(entry);
  }

  function displayMacros(macros) {
    macroList.innerHTML = '';
    for (const [name, text] of Object.entries(macros)) {
      addMacroEntry(name, text);
    }
  }
});

