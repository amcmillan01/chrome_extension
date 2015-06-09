/**
 * chrome_extension
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
 */

'use strict';

//https://developer.chrome.com/extensions/notifications
var notificationId = null;

var options = {
  type: 'basic', //"basic", "image", "list", or "progress"
  iconUrl: '../logo-small.png',
  title: 'Extension Name',
  message: 'My extension is up and running...'
};

var notify = function(msg){
  options.message = msg;
  chrome.notifications.create(null, options, function(wasUpdated){
    console.log('[wasUpdated]', wasUpdated);
  });
};

/**
 *
 * @param {string} url
 * @param {function} cb
 * @return {undefined}
 */
var getOpenGraphData = function (url, cb) {

  notify('fetching data for: ' + url);

  $.get(url).done(function (html) {

    var ogData = {};
    // an easy way to extra meta tags
    var metaTags = html.match(/(<meta)([^>]+)(>)/g);;
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
  if (chrome.pageAction && chrome.pageAction.show && tab.url.match(/.*/)) {
    chrome.pageAction.show(tabId);
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('[request]', request, sender);
  if (request.option === 'og_data') {
    getOpenGraphData(request.url, sendResponse);
  }
  // return true since `sendResponse` is wrapped in a callback function
  return true;
});

//chrome.notifications.create(null, options, function(id){
//  notificationId = id;
//  console.log('[id]', notificationId);
//});