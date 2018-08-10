"use strict";
exports.__esModule = true;
var React = require("react");
var clockStatusBar = function (oni) {
    // Create a status bar item on the right side
    var clockStatusBarItem = oni.statusBar.createItem(1, 1);
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
var faceStatusBar = function (oni) {
    var faceStatusBarItem = oni.statusBar.createItem(1, 2, "face");
    faceStatusBarItem.show();
    oni.configuration.setValues({ counter: 0 });
    var faces = [
        "(´･_･`)",
        "( ´･_･)",
        "(  ´･_)",
        "(   ´･)",
        "(    ´)",
        "(     )",
        "(     )",
        "(`    )",
        "(･`   )",
        "(_･`  )",
        "(･_･` )",
    ];
    var updateFace = function () {
        var counter = Number(oni.configuration.getValue("counter"));
        var face = faces[(counter + 1) % faces.length];
        faceStatusBarItem.setContents(React.createElement("div", null,
            React.createElement("pre", null, face)));
        oni.configuration.setValues({ counter: counter + 1 });
    };
    updateFace();
    window.addEventListener("keypress", updateFace);
};
exports.activate = function (oni) {
    // access the Oni plugin API here
    // or bind a new action:
    oni.input.bind("<c-enter>", function () { return alert("Hello world"); });
    clockStatusBar(oni);
    //faceStatusBar(oni)
};
exports.configuration = {
    activate: exports.activate,
    // change configuration values here:
    "oni.useDefaultConfig": true,
    "oni.loadInitVim": true,
    "editor.fontSize": "13px",
    "editor.fontFamily": "Monaco",
    "editor.completions.enabled": true
};
