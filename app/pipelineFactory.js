var _ = require('underscore');
var sharp = require('sharp');
var debug = require('debug')('pipelineFactory');

var transforms = {
   dimensions: function(pipeline, dimensions) {
      debug(dimensions);
      return pipeline.resize(dimensions.width, dimensions.height)
   },
   crop: function(pipeline, gravity) {
      debug(sharp.gravity[gravity])
      return pipeline.crop(sharp.gravity[gravity])
   },
   format: function(pipeline, format){
      debug(sharp.format[format]);
      return pipeline.toFormat(sharp.format[format])
   }
}

module.exports = function(options){
   var sharpPipeline = sharp()
   var keys = Object.keys(options);
   _.each(keys, function (key) {
      if(transforms[key] !== undefined) transforms[key](sharpPipeline, options[key]);
   });
   return sharpPipeline;
}
