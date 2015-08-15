var sharp = require('sharp');
var File = require('vinyl');

module.exports = {
   formatWebp: function formatWebp(image, next) {
      var webp = new File(image);
      webp.contents = image.contents;
      webp.extname = '.webp';

      console.log(webp.path);

      var jpeg = new File(image);
      jpeg.contents = image.contents;
      jpeg.extname = '.jpg';

      // How can I create a new file and add it
      // into the stream of streams?

      /*
         quilt4-1600x750.jpg
         quilt4-1600x750.webp
         I need to create a clone of the file
         and insert it into the pipeline
      */

      // var pipeline = sharp().resize(1600, 750);
      // pipeline.clone().webp().pipe(fs.createWriteStream(webp.path));
      //
      // webp.pipe(pipeline);

      webp
         .pipe(sharp()
            .webp()
            .resize(1600,750)
            .toFile(webp.path));

      next(null, image);

      // webp
      //    .pipe(sharp()
      //       .webp()
      //       .resize(1600, 750)
      //       .on('err', function(err) {
      //          console.log(err);
      //          next(err);
      //       })
      //       .on('data', function(data) {
      //          webp.contents = data;
      //          next(null, webp);
      //       }));

      // jpeg
      //    .pipe(sharp()
      //       .jpeg()
      //       .resize(1600, 750)
      //       .on('err', function(err) {
      //          console.log(err);
      //          next(err);
      //       })
      //       .on('data', function(data) {
      //          jpeg.contents = data;
      //          next(null, jpeg);
      //       }));
   }
}
