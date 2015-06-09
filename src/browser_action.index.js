/**
 * chrome_extension
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
 */

'use strict';

$('#og-form').on('submit', function() {

  var url = $('#url').val();

  chrome.runtime.sendMessage({option: "og_data", url: url}, function (response) {
    $('#result').html(JSON.stringify(response, null, 2));
  });

  return false;
});
