(function () {

    'use strict';

    var _ = require('underscore'),
        async = require('async'),
        through2 = require('through2'),
        gutil = require('gulp-util'),
        Jimp = require('jimp');

    module.exports = function (parameters) {

        function print(message) {
            console.log(message + '...');
        }

        return through2.obj(function (file, encoding, callback) {

            var self = this;

            if (file.isNull()) {
                return callback(null, file);
            }

            if (file.isStream()) {
                return callback(new gutil.PluginError('gulp-jimp2', 'Streaming not supported'));
            }

            Jimp.read(file.contents).then(function (image) {

                if (parameters.resize) {
                    print('Applying Resize of ' + parameters.resize.width + 'x' + parameters.resize.height);
                    image.resize(parameters.resize.width, parameters.resize.height);
                }

                if (parameters.quality) {
                    print('Applying Quality of ' + parameters.quality);
                    image.quality(parameters.quality);
                }

                if (parameters.greyscale) {
                    print('Applying Greyscale');
                    image.greyscale();
                }

                if (parameters.invert) {
                    print('Applying Invert');
                    image.invert();
                }

                if (parameters.sepia) {
                    print('Applying Sepia');
                    image.sepia();
                }

                if (parameters.opacity !== undefined) {
                    print('Applying Opacity of ' + parameters.opacity);
                    image.opacity(parameters.opacity);
                }

                if (parameters.scale) {
                    print('Applying Scale of ' + parameters.scale);
                    image.scale(parameters.scale);
                }

                if (parameters.blur) {
                    print('Applying Blur of ' + parameters.blur);
                    image.blur(parameters.blur);
                }

                if (parameters.gaussian) {
                    print('Applying Gaussian of ' + parameters.gaussian);
                    image.gaussian(parameters.gaussian);
                }

                if (parameters.crop) {
                    //print('Applying Crop of ' + parameters.crop.width + 'x' + parameters.crop.height + ' at ' + parameters.crop.x + ':' + parameters.crop.y);
                    //pxData.copy(rawData, rawPos, pxPos, pxPos + byteWidth);: RangeError: out of range index
                    //image.crop(parameters.crop.x, parameters.crop.y, parameters.crop.width, parameters.crop.height);
                }

                image.getBuffer(Jimp.MIME_PNG, function (error, buffer) {
                    self.push(new gutil.File({ path: parameters.name, contents: buffer }));
                    return callback(error);
                });

            }).catch(function (error) {
                return callback(error);
            });

        });

    };

})();
