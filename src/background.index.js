/**
 * chrome_extension
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
 */

'use strict';

//https://developer.chrome.com/extensions/notifications

var senderPort = null;
var notificationId = null;

var options = {
  type: 'list', //"basic", "image", "list", or "progress"
  iconUrl: '../logo-small.png',
  title: 'Chrome Extension',
  items: [],
  message: ''
};

var notify = function (msg) {

  if (notificationId) {
    options.items.push({
      title: '',
      message: msg
    });

    chrome.notifications.update(notificationId, options, function (wasUpdate) {
      console.log('[wasUpdate]', wasUpdate);
      console.log('[options]', options);
    });
  } else {

    options.items = [{
      title: '',
      message: msg
    }];

    chrome.notifications.create(notificationId, options, function (id) {
      notificationId = id;
      console.log('[notificationId]', id);
      console.log('[options]', options);
    });
  }

};

/**
 *
 * @param {string} url
 * @param {function} cb
 * @return {undefined}
 */
var getOpenGraphData = function (url, cb) {
  notificationId = null;
  notify(url);

  $.get(url).done(function (html) {

    var ogData = {};
    // an easy way to extra meta tags
    var metaTags = html.match(/(<meta)([^>]+)(>)/g);
    notify(metaTags.length + ' meta tags found');

    _.each(metaTags, function (tag) {
      var prop = $(tag).attr('property');
      var name = $(tag).attr('name');
      var value = $(tag).attr('content');
      var key;
      if (!_.isEmpty(prop)) {
        key = prop.replace(/(og|twitter)\:/, '');
      } else if (!_.isEmpty(name)) {
        key = name.replace(/(og|twitter)\:/, '');
      }

      if (!_.isEmpty(key) && !_.isEmpty(value)) {
        ogData[key] = value;
      }
    });

    console.log('[ogData]', ogData);
    notify(Object.keys(ogData).length + ' open graph tags found');

    cb(ogData);
  });
};


// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    console.log(changeInfo);

    if (chrome.pageAction && chrome.pageAction.show && tab.url.match(/^(http(s)?)/)) {
      chrome.pageAction.show(tabId);
    }

    if (senderPort && senderPort.postMessage) {
      senderPort.postMessage({option: 'tab_updated'});
    }
  }

});

// list for messages from content_script, page_action, and browser_action
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  // handle request from browser_action
  if (request.option === 'og_data') {
    getOpenGraphData(request.url, sendResponse);
  }

  // return true since `sendResponse` is wrapped in a callback function
  return true;
});

//on port connect - from devtools
chrome.runtime.onConnect.addListener(function (port) {
  senderPort = port;

  // cleanup when the port is closed
  senderPort.onDisconnect.addListener(function () {
    console.log('devtool disconnected...');
    senderPort = null;
  });
});

// event handler for when the notification is closed
chrome.notifications.onClosed.addListener(function () {
  console.log('[close]', arguments);
  notificationId = null;
});
