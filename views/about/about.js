'use strict';
var ipc =  require('ipc'),

		nodeVer = 'Node version: ' + process.versions.node + '\n',
		chromiumVer = 'Chromium version: ' + process.versions.chrome + '\n',
		electronVer = 'Electron version: ' + process.versions.electron + '\n',
		playerVersion = 'Player Version 0.0.1',
		author = 'Lanford Gabriel Murillo',
		body = document.querySelector('html'),
		content = '<p class="text-center">' + nodeVer + '</p>' + 
							'<p class="text-center">' + chromiumVer + '</p>' + 
							'<p class="text-center">' + electronVer + '</p>' + 
							'<p class="text-center">' + playerVersion + '</p>' + 
							'<p class="text-center">' + author+ '</p>';

document.write(content);

body.addEventListener('click', function () {
	ipc.send('toggle-about');
});