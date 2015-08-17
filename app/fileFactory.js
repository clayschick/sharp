var debug = require('debug')('fileFactory');

var File = require('vinyl');
var fs = require('fs');
var through = require('through2');
var async = require('async');

module.exports = function(opt){
   var options = require(opt);
   return through.obj(function(file, encoding, callback){
      var self = this;
      debug(options.outputs);

      async.each(options.outputs, function(output, next){
         async.each(output.formats, function (format, next) {
            var fileStream = new File({
               path: file.path,
               base: file.base,
               cwd: file.cwd,
               contents: fs.createReadStream(file.path)
            });

            output.format = format;
            fileStream.options = output;
            debug(fileStream.options);

            self.push(fileStream);
            next();
         })
         next();
      }, callback)
   })
};
