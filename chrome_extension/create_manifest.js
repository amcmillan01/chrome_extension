/**
 * chrome_extension
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
 */

'use strict';

var fs = require('fs');
var pkg = require('./package.json');
var manifest = require('./manifest_tpl.json');

// set some manifest info based on package.json
manifest.name = pkg.name;
manifest.description = pkg.description;
manifest.version = pkg.version;
manifest.author = pkg.author;

var actions = {
  'page_action': {
    'default_icon': {
      '19': 'logo.png'
    },
    'default_title': '',
    'default_popup': 'page_action.index.html'
  },
  'browser_action': {
    'default_icon': {
      '19': 'logo.png'
    },
    'default_title': '',
    'default_popup': 'browser_action.index.html'
  }
};

// add page_action or browser action to the manifest
if (process.argv.length === 3) {
  var action = process.argv[2];
  if (actions[action]){
    manifest[action] = actions[action];
  }
}

fs.writeFileSync('./src/manifest.json', JSON.stringify(manifest, null, 2));
