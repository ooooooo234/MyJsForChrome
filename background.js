(function () {
  chrome.storage.sync.get(['fullscreen_visible'], function (res) {
    chrome.contextMenus.create({
      id: 'fullscreen',
      title: chrome.i18n.getMessage('fullscreen_title') || 'fullscreen',
      contexts: [
        'all'
      ],
      visible: res['fullscreen_visible']
    });
  });
}) ();
for (let number = 1; number <= 10; number++) {
  let id = 'list_' + number;
  chrome.storage.sync.get([id], function (res) {
    let visible = ((res[id] != null) && ((res[id] + ' ').length > 1));
    res[id] = res[id] || id;
    chrome.contextMenus.create({
      id: id,
      title: res[id].split('').slice(0, 25).join('') || id,
      contexts: [
        'all'
      ],
      visible: visible
    });
  });
}
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId.split('list_') [1] != null) {
    let id = info.menuItemId;
    //let number = Number(info.menuItemId.split('list_') [1]);
    chrome.storage.sync.get([id], async function (res) {
      try {
        const results = chrome.userScripts.execute({
          target: { tabId: tab.id },
          js: [{ code: res[id]}]
        });
        console.log("Script executed successfully.", results);
      } catch (error) {
        console.error(chrome.i18n.getMessage('warning_text'));
        console.error("Script execution failed:", error);
      }
    });
  } else {
    switch (info.menuItemId) {
      case 'fullscreen':
        {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['fullscreen.js']
          });
          break;
        }
    }
  }
});
