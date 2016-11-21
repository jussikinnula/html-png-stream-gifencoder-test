var fs = require('fs');
var streamify = require('stream-array');
var GIFEncoder = require('gifencoder');
var htmlPngStream = require('html-png-stream');

function getHtml(title, color) {
    title = title || 'X';
    return '<html><body style="background-color: ' + color + '"><h1>' + title + '</h1></body></html>';
}

var width = 640;
var height = 480;
var encoder = new GIFEncoder(width, height);

streamify([
    getHtml('Red', '#FF0000'),
    getHtml('Green', '#00FF00'),
    getHtml('Blue', '#0000FF')
])
    .pipe(htmlPngStream({
        width: width,
        height: height,
        browser: 'phantomjs'
    }))
    .pipe(encoder.createWriteStream({
        repeat: 0,
        delay: 500,
        quality: 10
    }))
    .pipe(fs.createWriteStream('test.gif'));
