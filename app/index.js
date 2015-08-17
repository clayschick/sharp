var debug = require('debug')('index');

var argv = require('yargs').argv;
var glob = require('vinyl-fs');
var map = require('map-stream');

var fileFactory = require('./fileFactory');
var transform = require('./transform');

/*
DEBUG=* /usr/bin/nodejs index.js --glob './img/*.jpg' --options './outputs'
*/

debug(argv);

glob.src([argv.glob], {
      buffer: false
   })
   .pipe(fileFactory(argv.options))
   .pipe(map(transform))
   .pipe(glob.dest('./output'));
