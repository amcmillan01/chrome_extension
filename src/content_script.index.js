/**
 * chrome_extension
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
 */

'use strict';

console.log('loaded');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('[r]', request);
  if (request.message && request.message =='page_og_data') {
    var ogData = {};
    var metaTags = $('meta[property]');

    var getMetaValue = function (key) {
      var val = $('meta[name="' + key + '"]').attr('content');
      if (_.isEmpty(val)) {
        val = $('meta[property="' + key + '"]').attr('content');
      }

      if (!_.isUndefined(val)){
        val = val.trim();
      }

      return val;
    };

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
    //ogData._rnd = Date.now();

    console.log(ogData);
    sendResponse(ogData);

  }
  return true;
});
