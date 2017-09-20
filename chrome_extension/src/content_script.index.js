/**
 * chrome_extension
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
 *
 * extracts open graph info from the current page
 */

'use strict';

/**
 *
 * @param {string} key
 * @return {string}
 */
var getMetaValue = function (key) {
  var val = $('meta[name="' + key + '"]').attr('content');
  if (_.isEmpty(val)) {
    val = $('meta[property="' + key + '"]').attr('content');
  }

  if (!_.isUndefined(val)) {
    val = val.trim();
  }

  return val;
};

// listens from requests coming from the page_action script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  if (request.option) {
    if (request.option === 'page_og_data') {

      var ogData = {};

      // get all the meta tags
      var metaTags = $('meta[property]');

      // extract the open graph data
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

      // fall back if not all the og data is available
      ogData.title = ogData.title || $('title').text().trim();
      ogData.description = ogData.description || getMetaValue('description');

      console.log(ogData);
      sendResponse(ogData);
    }

    // listen for message from background script
    else if (request.option === 'select_text') {
      sendResponse('"' + request.value + '" was selected...');
    }
  }

  // return true -- just incase `sendResponse` is wrapped within a callback
  return true;
});
