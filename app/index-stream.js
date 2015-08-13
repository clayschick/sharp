var glob = require('vinyl-fs');
var map = require('map-stream');

//var backgroundTransform = require('./transforms/backgroundTransform');
var transforms = require('./transforms');
/*
to run as stream use {buffer:false}
*/
glob.src(['img/*.jpg'], {
      buffer: false
   })
   .pipe(map(transforms.formatWebp))
   .pipe(glob.dest('./img/output'));
