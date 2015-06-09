/**
 * chrome_extension
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
 */

'use strict';

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {message: 'page_og_data'}, function (response) {
    var html = ['<table>'];
    _.each(response, function(val, key){
      html.push('<tr><td><b>'+key+'</b></td><td>'+val+'</td></tr>');
    });

    html.push('</table>');
    $('#result').html(html.join(''));
    //$('#result').html(JSON.stringify(response, null, 2));
  });
});

// send message to bg
//chrome.runtime.sendMessage({option: "get_page_og"}, function(response) {
//  console.log(response);
//});
