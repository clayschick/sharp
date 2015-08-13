var glob = require('glob');
var gs = require('glob-stream');
var fs = require('fs');
var async = require('async');
var through = require('through2');
var sharp = require('sharp');

var log = function(file){
   console.log(file);
}

var transform = through(function(buf, _, next){
   //console.log(buf);
   sharp(buf)
     .webp()
     .resize(1600,750)
     .on('err', function(err){
        console.log(err);
     })
     .on('data', function(data){
        this.push(data);
        next();
     });
})

var trans = sharp()
   .webp()
   .resize(1600,750)
   .on('err', function(err){
      console.log(err);
   });

var createStreams = function(file){
   console.log(file);
   var rs = fs.createReadStream(file);
   var ws = fs.createWriteStream(file + '.webp');

   rs.pipe(trans)
      .pipe(ws);
}

gs.create('./img/*.jpg')
   .on('data', function(file){
      console.log(file);
   })

glob('./img/*.jpg', function(er, files){
   console.log(files);
   async.map(files, createStreams, function(err, results){
      console.log(results);
   })
})
