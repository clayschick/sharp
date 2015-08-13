var fs = require('fs');
var glob = require('glob');
var sharp = require('sharp');
var _ = require('highland');

var readFile = _.wrapCallback(fs.readFile);
//var dest = fs.createWriteStream('img/output');

glob('img/*.jpg', function(er, files) {
   var fileStreams = _(files);
   //var readStreams = fileStreams.map(readFile).parallel(10);

   fileStreams
      .map(_.wrapCallback(fs.readFile))
      .map(function(x){
         _.log(fs.stat(x.toString()))
         return x;
      })
      .each(_.log);
});

function rename (file, cb) {
  //_.log(file);
  cb(data);
}
