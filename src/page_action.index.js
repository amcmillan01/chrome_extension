/**
 * chrome_extension
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
 *
 * this page_action script communicates with the content_script to get the necessary data
 */

'use strict';

// get the current active tab
chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

  var tabId = tabs[0].id;
  var config = {
    option: 'page_og_data'
  };

  // send message to the content_script to get the open graph info to the current tab
  chrome.tabs.sendMessage(tabId, config, function (response) {

    // create a table to display the results
    var html = ['<table border="1">'];
    _.each(response, function (val, key) {
      html.push('<tr><td><b>', key, '</b></td><td>', val, '</td></tr>');
    });
    html.push('</table>');

    // insert the table into the devtools ui
    $('#result').html(html.join(''));

  });
});
