/**
 * chrome_extension
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
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

// event handler for form submission
$('#og-form').on('submit', function () {

  var url = $('#url').val();

  // make a request to the background script to get open graph data for the given url
  chrome.runtime.sendMessage({option: 'og_data', url: url}, function (response) {

    var table = createTable(response);
    $('#result').html(table);

  });

  return false;
});
