
const { contextBridge, ipcRenderer } = require('electron')
const os = require('os');
const { exec} = require("child_process");

contextBridge.exposeInMainWorld('electron_api', {
    os: os,
    exec: exec,
    runCommand: (title) => ipcRenderer.send('run-command', title),
    terminalKeyStrock: (e) => ipcRenderer.send("terminal.keystroke", e),
    handleIncomingData: (callback) => ipcRenderer.on("terminal.incomingData", callback)
})