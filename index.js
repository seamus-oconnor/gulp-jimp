var es = require('event-stream');
var Jimp = require('jimp');
var fs = require('fs');
var path = require('path');

module.exports = function (opts) {

    function modifyFile(file, cb) {

        if (file.isNull()) return cb(null, file); // pass along
        if (file.isStream()) return cb(new Error('gulp-jimp: Streaming not supported'));
        
        var image = new Jimp(file.path, function (err) {
            
            if (err)
                return cb(err);

            if (opts.resize)
                this.resize(opts.resize.width, opts.resize.height);

            if (opts.quality)
                this.quality(opts.quality);

            if (opts.greyscale)
                this.greyscale();

            if (opts.invert)
                this.invert();

            if (opts.sepia)
                this.sepia();

            if (opts.opacity)
                this.opacity(opts.opacity);

            if (opts.scale)
                this.scale(opts.scale);

            if (opts.blur)
                this.blur(opts.blur);

            if (opts.gaussian)
                this.gaussian(opts.gaussian);

            if (opts.crop)
                this.crop(opts.crop.x, opts.crop.y, opts.crop.width, opts.crop.height);

            var tempFile = file.path + '.tmp' + path.extname(file.path);
            
            this.write(tempFile, function (err) {
                                
                if (err)
                    return cb(err);

                setTimeout(function () {
                    
                    fs.readFile(tempFile, null, function (err, data) {
                    
                        if (err)
                            return cb(new Error(err));

                        file.contents = new Buffer(data);
                        
                        fs.unlink(tempFile, function (err) {
                            
                            if (err)
                                return cb(new Error(err));
                            
                            cb(null, file);
                        });

                    });
                }, 00); // Concurrency issue

            });
        });

    }

    return es.map(modifyFile);
};