var debug = require('debug')('transform');

var buildPipeline = require('./pipelineFactory');

module.exports = function(image, next) {
   var ext = '-' + image.options.name + '.' + image.options.format;
   image.extname = ext;

   var pipeline = buildPipeline(image.options);

   image
      .pipe(pipeline
         .on('err', function(err) {
            console.log(err);
            next(err);
         })
         .on('data', function(data) {
            debug("received data");
            image.contents = data;
            next(null, image);
         }));
}
