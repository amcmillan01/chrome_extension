/**
 * chrome_extension
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
 */

'use strict';

var fs = require('fs');
var pkg = require('./package.json');
var manifest = require('./src/manifest_tpl.json');

// use the package version number as the manifest version
manifest.version = pkg.version;

fs.writeFileSync('./src/manifest.json', JSON.stringify(manifest));
