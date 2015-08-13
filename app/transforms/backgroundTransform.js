var sharp = require('sharp');
var File = require('vinyl');

// var pipeline = sharp().resize(1600, 750);
// pipeline.clone().webp();
// pipeline.clone().jpg();

module.exports = {
   background: function background(image, next) {
      var file = new File(image);
      file.extname = '.webp';

      //file.pipe(pipeline);

      var clonedFile = file.clone();

      file.pipe(sharp()
         .webp()
         .resize(1600, 750)
         .on('err', function(err) {
            console.log(err);
            next(err);
         })
         .on('data', function(data) {
            file.contents = data;
            next(null, file);
         }));
   }
}
