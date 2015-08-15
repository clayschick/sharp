var File = require('vinyl');
var glob = require('vinyl-fs');
var map = require('map-stream');
//var through = require('through2');
//var file = require('./file');

//var backgroundTransform = require('./transforms/backgroundTransform');
//var transforms = require('./transforms');
var transforms = require('./transformFactory');

glob.src(['img/*.jpg'], {
      buffer: false
   })
   .pipe(map(transforms.formatWebp))
   .pipe(glob.dest('./img/output'))
   .pipe(map(transforms.formatJpeg))
   .pipe(glob.dest('./img/output'));
