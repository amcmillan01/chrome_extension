/**
 * chrome_extension
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
 */

'use strict';

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
  document.getElementById('data').innerHTML = JSON.stringify(tabs[0], null, 2);
});
