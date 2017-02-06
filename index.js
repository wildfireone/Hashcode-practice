/**
* @Author: John Isaacs <john>
* @Date:   06-Feb-172017
* @Filename: index.js
* @Last modified by:   john
* @Last modified time: 06-Feb-172017
*/



var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('example.ln');

lr.on('error', function (err) {
	// 'err' contains error object
});

lr.on('line', function (line) {
	// 'line' contains the current line without the trailing newline character.
});

lr.on('end', function () {
	// All lines are read, file is closed now.
});
