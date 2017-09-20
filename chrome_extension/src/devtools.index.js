/**
 * chrome_extension
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
 */

'use strict';

// `Opt + Cmd + J` to debug devtools of the devtools

var network = {
  status: {}
};

// create a long live connection to the background script
var port = chrome.runtime.connect({
  name: 'Chrome Extension'
});

// listen for message from background script
port.onMessage.addListener(function (message) {
  $('#msg-from-bg').html(JSON.stringify(message, null, 2));
});

// event handler for when we navigate to a new page
chrome.devtools.network.onNavigated.addListener(function () {
  $('#network').html('...');
  network = {
    status: {}
  };
});

// event handler for when request have been completed
chrome.devtools.network.onRequestFinished.addListener(function (request) {
  console.log('[r]', request);

  // sum up the response status
  var status = request.response.status;

  network.status[status] = network.status[status] || 0;
  network.status[status]++;

  $('#network').html(JSON.stringify(network, null, 2));
});
