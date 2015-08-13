var sharp = require('sharp');
var File = require('vinyl');

module.exports = {
   formatWebp: function formatWebp(image, next) {
      var webp = new File(image);
      webp.extname = '.webp';
      var jpeg = webp.clone();
      jpeg.extname = '.jpeg';

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
