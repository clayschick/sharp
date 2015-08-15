var glob = require('vinyl-fs');
var map = require('map-stream');
var debug = require('debug')('index');
var fileFactory = require('./fileFactory');
var transforms = require('./transforms');
var options = require('./outputs');

function transform(file, callback){
   // call a transform from a factory
   callback(null, file);
}

glob.src(['./img/*.jpg'], {
      buffer: false
   })
   .pipe(fileFactory())
   .pipe(map(transforms))
   .pipe(glob.dest('./output'));
