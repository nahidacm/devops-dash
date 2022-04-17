"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
// const { app, BrowserWindow, ipcMain } = require('electron');
var path = require('path');
var pty = require("node-pty");
var os = require("os");
// Enable live reload for Electron too
require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require("../node_modules/electron")
});
var shell = os.platform() === "win32" ? "powershell.exe" : "bash";
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    electron_1.app.quit();
}
var createWindow = function () {
    // Create the browser window.
    var mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    });
    //ipcing
    var ptyProcess = pty.spawn(shell, [], {
        name: "xterm-color",
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
    });
    ptyProcess.on('data', function (data) {
        mainWindow.webContents.send("terminal.incomingData", data);
        process.stdout.write(data);
    });
    electron_1.ipcMain.on("terminal.keystroke", function (event, key) {
        ptyProcess.write(key);
    });
    // ipcMain.on('run-command', (event, command) => {
    //   const webContents = event.sender
    //   // const win = BrowserWindow.fromWebContents(webContents)
    //   // win.setTitle(title)
    //   console.log(command)
    // })
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
