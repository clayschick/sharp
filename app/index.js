var glob = require('vinyl-fs');
var map = require('map-stream');
var debug = require('debug')('index');

var fileFactory = require('./fileFactory');
var transform = require('./transform');

glob.src(['./img/*.jpg'], {
      buffer: false
   })
   .pipe(fileFactory())
   .pipe(map(transform))
   .pipe(glob.dest('./output'));
