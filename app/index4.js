var glob = require('glob');
var vfs = require('vinyl-fs');
var async = require('async');
var debug = require('debug')('stream-factory');
var _ = require('highland');
var fileStreamFactory = require('./fileStreamFactory');

var options = {
   outputs: [{
      quality: 0.8,
      format: 'webp',
      progressive: true,
      transforms: [{
         type: 'thumbnail',
         width: 200,
         height: 200
      }]
   }, {
      quality: 0.9,
      format: 'jpeg',
      progressive: true,
      transforms: [{
         type: 'extract',
         left: 0,
         top: 0,
         width: 100,
         height: 100
      }]
   }, {
      format: 'png',
      transforms: [{
         type: 'rotate',
         angle: 90
      }]
   }]
};

var opts = [{
   format: 'webp',
   width: 1600,
   height: 750
}, {
   format: 'jpeg',
   width: 1600,
   height: 750
}];

function createStreams(file, callback) {
   var fileStreams = [];
   async.each(opts, function(opt, callback){
      var fileStream = fileStreamFactory.create(file, opt);
      fileStreams.push(fileStream);
   });
   debug(fileStreams);
   callback(null, fileStreams);
};

glob('./img/*.jpg', function(err, files) {
   if (err) console.log(err);
   /*
   [ './img/blurry.jpg', './img/quilt4.jpg' ]
   */
   debug(files);
   async.map(files, createStreams, function(err, results) {
      var merged = [].concat.apply([], results);
      /*
      [
        <File "img/blurry-1600x750.webp" <ReadStreamStream>>,
        <File "img/blurry-1600x750.jpeg" <ReadStreamStream>>,
        <File "img/quilt4-1600x750.webp" <ReadStreamStream>>,
        <File "img/quilt4-1600x750.jpeg" <ReadStreamStream>>
      ]
      */
      debug(merged);
      _(merged)
         //.map() // sharp transform function
         .pipe(vfs.dest('./output'));
   });
});
