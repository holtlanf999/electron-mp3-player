'use strict';
const remote = require('remote');
const ipc = require('ipc');
const fs = require('fs');
const path = require('path');

//remote is used to require modules 
//from the main process to the renderer process
const Menu = remote.require('menu');

// create a new menu to the app...
var menu = Menu.buildFromTemplate([{
	label: 'About',
	submenu: 
	[
		{
			label: 'About Electron MP3',
			click: function() {
				ipc.send('toggle-about');
			}
		}
	]
}]);

// set the new app menu
Menu.setApplicationMenu(menu);

var songs = []; // empty array to store the songs... 

var dirPath = '/audio'; // Path to songs directory...

fs.readdir(__dirname + dirPath, (err, data) => { //read the specified directory to extract the song names...
  if (err) throw err;
  songs = data; // returns and array with all the song names...
  getSongs(); // callback that sends the songs array to the renderer process...
});

function getSongs(argument) {
	console.log('Get Songs: ', songs);

	//This sends the songs array to the render process...
	ipc.send('songs', songs);
}