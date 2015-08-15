var File = require('vinyl');
var fs = require('fs');
var through = require('through2');
var async = require('async');
var debug = require('debug')('fileFactory');

var options = require('./outputs');

module.exports = function(){
   return through.obj(function(file, encoding, callback){
      var self = this;

      debug(options.outputs);

      async.forEach(options.outputs, function(output, next){
         var fileStream = new File({
            path: file.path,
            base: file.base,
            cwd: file.cwd,
            contents: fs.createReadStream(file.path)
         });
         var ext = '-' + output.width + 'x' + output.height + '.' + output.format;
         fileStream.extname = ext;

         debug(fileStream.inspect());

         self.push(fileStream);
         next();

      }, callback)
   })
};
