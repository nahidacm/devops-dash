
const { contextBridge, ipcRenderer } = require('electron')
const os = require('os');
const { exec} = require("child_process");

contextBridge.exposeInMainWorld('electron_api', {
    os: os,
    exec: exec,
    runCommand: (title: any) => ipcRenderer.send('run-command', title),
    terminalKeyStrock: (e: any) => ipcRenderer.send("terminal.keystroke", e),
    handleIncomingData: (callback: any) => ipcRenderer.on("terminal.incomingData", callback)
})