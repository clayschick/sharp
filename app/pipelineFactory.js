var debug = require('debug')('pipelineFactory');

var sharp = require('sharp');
var _ = require('underscore');

var transforms = require('./transformFactory');

module.exports = function(options){
   var pipeline = sharp();
   var keys = Object.keys(options);
   _.each(keys, function (key) {
      if(transforms[key] !== undefined) transforms[key](pipeline, options[key]);
   });
   return pipeline;
}
