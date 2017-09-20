# Chrome Extension

<img src="https://travis-ci.org/amcmillan01/chrome_extension.svg?branch=master">

Get Open Graph information about a given url

### The Moving Parts

 - background script : a long lived process that runs in the background 
 - content script : allows you to interact with the current webpage
 - dev tools : allows interaction with network resources status (404, 200, etc)
 - page actions : get the open graph information for the current url via the `content script`
 - browser action : get the open graph information for a given url via the `background script`
 - context menu :
 
### Useful Links
  
 - https://developer.chrome.com/extensions/overview
 - https://developer.chrome.com/extensions/api_index#stable_apis
 - https://developer.chrome.com/webstore/using_webstore_api
 - https://developer.chrome.com/apps/about_apps
 - https://chrome.google.com/webstore/developer/dashboard

### BoilerPlate (./boiler_plate)

 - npm run boiler_plate

 A simple extension that add an icon next to the address bar. When clicked, it displays information about the current tab.

### Requirements

- node

### Getting Started

- npm run clean
- npm run prepare
- npm run start
