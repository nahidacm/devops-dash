
const { contextBridge, ipcRenderer } = require('electron')
const os = require('os');
const { exec} = require("child_process");

contextBridge.exposeInMainWorld('electron_api', {
    runCommand: (title) => ipcRenderer.send('run-command', title),
    os: os,
    exec: exec
})