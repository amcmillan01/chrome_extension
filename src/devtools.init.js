/**
 * chrome_extension
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
 *
 * setup the devtool component
 */

'use strict';

chrome.devtools.panels.create('Chrome Extension', 'logo-small.png', '/devtools.index.html', function (panel) {
  console.log('[panel]', panel);
});
