"use strict";
exports.__esModule = true;
var React = require("react");
var Oni = require("oni-api");
var clockStatusBar = function (oni) {
    // Create a status bar item on the right side
    var clockStatusBarItem = oni.statusBar.createItem(1);
    // Make it visible
    clockStatusBarItem.show();
    // Create a function to get the current time
    var updateClock = function () {
        var currentDate = new Date();
        var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        clockStatusBarItem.setContents(React.createElement("div", null, time));
    };
    // Run it on initial load
    updateClock();
    // And again every second.
    // NOTE - This isn't a robust solution and WILL impact performance...
    // Not recommended to leave this in your config!
    window.setInterval(updateClock, 1000 /* Every second */);
};
exports.activate = function (oni) {
    // access the Oni plugin API here
    // or bind a new action:
    oni.input.bind("<c-enter>", function () { return alert("Hello world"); });
    clockStatusBar(oni);
};
exports.configuration = {
    activate: exports.activate,
    // change configuration values here:
    "oni.useDefaultConfig": true,
    "oni.loadInitVim": true,
    "editor.fontSize": "14px",
    "editor.fontFamily": "Monaco",
    "editor.completions.enabled": true
};
