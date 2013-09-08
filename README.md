editable-div
============

In-place editable DIV (single-line) for Angular.js.

## Usage

~~~~
<div editable-div ng-model="data" callback="callbackFn" place-holder="Place Holder Text">
~~~~

The specified model value (`$scope.data`) is shown in the DIV.  The DIV is cursor sensitive and highlight the background when the mouse is hovering.  When a user clicks the DIV, it switch the DIV into INPUT and let you edit.

The INPUT field response to [ENTER] and [ESC] key.  When edit is done, it triggers a callback function(`$scope.callbackFn()`).

Use optional `place-holder` to specify place holder text.
