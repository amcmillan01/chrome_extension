
'use strict';

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
  document.getElementById('data').innerHTML = JSON.stringify(tabs[0], null, 2);
});
