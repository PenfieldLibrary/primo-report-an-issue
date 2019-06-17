# primo-report-an-issue
## Description

This is an add-on for the "Send To" actions in Brief Records Display. It adds report an issue button.

### Screenshot

![screenshot1](https://github.com/PenfieldLibrary/primo-report-an-issue/raw/master/.docs/report-issue.jpg)

## Installation

1. Replace the custom.js file in your primo customization package.

2. If you are adding to an existing custom.js file copy only the follow from the src file starting with:
<b>var app = angular.module('viewCustom', ['angularLoad']);</b> :
    ```
    //Load latest jquery
    app.component('prmTopBarBefore', {
    .
    .
    .
    action: "https://<your report URL>?Permalink="+encodeURIComponent("https://<Your Primo URL>/discovery/search?query=any,contains,")+"     {recordId}"+encodeURIComponent("&tab=default_tab&search_scope=all&sortby=rank&vid=<Your Primo Code>&offset=0")}]);
    ```
3. copy the follow from the src file into your custom.js file statring with to the end of the src file:
    ```
    //Code outside main function
    function loadScript(url, callback)
    .
    .
    .
    ```
## Adding your library custom report an issue URL in the custom.js file
Replace the following with your own Report and Issue URL (2 places):

```js
url: '<your report URL>'
```

## Changing the Report Issue label with your own. (optional)
Replace the "Report Issue" text (optional)
```js
 name: "Report Issue",
```
