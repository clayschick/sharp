var sharp = require('sharp');
var File = require('vinyl');

module.exports = {
   formatWebp: function formatWebp(image, next) {
      console.log(image.path);

      var webp = new File(image);
      webp.contents = image.contents;
      webp.extname = '.webp';

      console.log(webp.path);

      webp
         .pipe(sharp()
            .webp()
            .resize(1600, 750)
            .on('err', function(err) {
               console.log(err);
               next(err);
            })
            .on('data', function(data) {
               webp.contents = data;
               next(null, webp);
            }));
   },
   formatJpeg: function(image, next){
      console.log(image.path);

      var jpeg = new File(image);
      jpeg.contents = image.contents;
      jpeg.extname = '.jpeg';

      console.log(jpeg.path);

      jpeg
         .pipe(sharp()
            .jpeg()
            .resize(1600, 750)
            .on('err', function(err) {
               console.log(err);
               next(err);
            })
            .on('data', function(data) {
               jpeg.contents = data;
               next(null, jpeg);
            }));
   }
}
