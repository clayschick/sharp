var debug = require('debug')('transformFactory');

var sharp = require('sharp');

module.exports = {
   resize: function(pipeline, dimensions) {
      debug("resize: " + JSON.stringify(dimensions))
      return pipeline.resize(dimensions.width, dimensions.height)
   },
   crop: function(pipeline, gravity) {
      debug("crop: " + JSON.stringify(sharp.gravity[gravity]))
      return pipeline.crop(sharp.gravity[gravity])
   },
   quality: function (pipeline, quality) {
      if(quality === 80) debug("default quality value is 80")
      debug("quality: " + quality)
      return pipeline.quality(quality)
   },
   format: function(pipeline, format){
      debug("format: " + JSON.stringify(sharp.format[format]))
      return pipeline.toFormat(sharp.format[format])
   },
   progressive: function(pipeline){
      debug("progressive scan: true")
      return pipeline.progressive()
   },
   tile: function(pipeline, tile){
      debug("tile: " + JSON.stringify(tile))
      return pipeline.tile(tile.size, tile.overlap)
   }
}
