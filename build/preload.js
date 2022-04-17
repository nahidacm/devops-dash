"use strict";
var _a = require('electron'), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
var os = require('os');
var exec = require("child_process").exec;
contextBridge.exposeInMainWorld('electron_api', {
    os: os,
    exec: exec,
    runCommand: function (title) { return ipcRenderer.send('run-command', title); },
    terminalKeyStrock: function (e) { return ipcRenderer.send("terminal.keystroke", e); },
    handleIncomingData: function (callback) { return ipcRenderer.on("terminal.incomingData", callback); }
});
