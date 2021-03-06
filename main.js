'use strict';

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const ipc = require('ipc');
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var aboutWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1024, height: 768});
  aboutWindow = new BrowserWindow({width: 300, height: 200, show: false, frame: false});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.openDevTools();
  aboutWindow.loadURL('file://' + __dirname + '/views/about/about.html');
  // aboutWindow.openDevTools();

  // toggle about window visibility...
  ipc.on('toggle-about', function() {
   if (aboutWindow.isVisible()) {
    console.log('hide');
    aboutWindow.hide();
   } else {
    console.log('show');
    aboutWindow.show();
   }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    app.quit();
  });
});