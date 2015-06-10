/**
 * chrome_extension
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
 *
 * this page_action script communicates with the content_script to get the necessary data
 */

'use strict';

/**
 * create a table to display the results
 * @param {object} data
 * @return {string}
 */
var createTable = function (data) {
  var html = ['<table border="1">'];
  _.each(data, function (val, key) {
    html.push('<tr><td><b>', key, '</b></td><td>', val, '</td></tr>');
  });
  html.push('</table>');

  return html.join('');
};

// get the current active tab
chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

  // send message to the content_script to get the open graph info to the current tab
  chrome.tabs.sendMessage(tabs[0].id, {option: 'page_og_data'}, function (response) {

    var table = createTable(response);
    $('#result').html(table);

  });
});
