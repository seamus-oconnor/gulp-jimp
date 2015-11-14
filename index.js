(function () {

    'use strict';

    var _ = require('underscore'),
        async = require('async'),
        through2 = require('through2'),
        gutil = require('gulp-util'),
        Jimp = require('jimp');

    module.exports = function (options) {

        function print(message) {
            if (options.logging) {
                console.log(message + '...');
            }
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

                if (options.crop) {
                    //print('Applying Crop of ' + options.crop.width + 'x' + options.crop.height + ' at ' + options.crop.x + ',' + options.crop.y);
                    //pxData.copy(rawData, rawPos, pxPos, pxPos + byteWidth);: RangeError: out of range index
                    //image.crop(options.crop.x, options.crop.y, options.crop.width, options.crop.height);
                }

                if (options.invert) {
                    print('Inverting image');
                    image.invert();
                }

                if (options.flip || options.mirror) {
                    print('Flipping (mirroring) image ' + (options.flip.horizontal ? '' : 'not ') + 'horizontally and ' + (options.flip.vertical ? '' : 'not ') + 'vertically');
                    image.flip(options.flip.horizontal, options.flip.vertical);
                }

                if (options.gaussian) {
                    print('Applying gaussian blur of ' + options.gaussian);
                    image.gaussian(options.gaussian);
                }

                if (options.blur) {
                    print('Applying fast blur of ' + options.blur);
                    image.blur(options.blur);
                }

                if (options.greyscale) {
                    print('Applying greyscale');
                    image.greyscale();
                }

                if (options.sepia) {
                    print('Applying sepia tone');
                    image.sepia();
                }

                if (options.opacity !== undefined) {
                    print('Changing opacity to ' + options.opacity);
                    image.opacity(options.opacity);
                }

                if (options.resize) {
                    print('Resizing image to ' + options.resize.width + 'x' + options.resize.height);
                    image.resize(options.resize.width, options.resize.height);
                }

                if (options.scale) {
                    print('Scaling image by ' + options.scale);
                    image.scale(options.scale);
                }

                if (options.rotate) {
                    print('Rotating image ' + options.rotate + ' degrees clockwise');
                    image.rotate(options.rotate);
                }

                if (options.blit) {
                    print('Blitting ' + options.blit.src + ' at ' + options.blit.x + ',' + options.blit.y);
                    image.blit(options.blit.src, options.blit.x, options.blit.y);
                }

                if (options.composite) {
                    print('Compositing ' + options.composite.src + ' at ' + options.composite.x + ',' + options.composite.y);
                    image.composite(options.composite.src, options.composite.x, options.composite.y);
                }

                if (options.brightness !== undefined) {
                    print('Adjusting brightness by ' + options.brightness);
                    image.brightness(options.brightness);
                }

                if (options.contrast !== undefined) {
                    print('Adjusting contrast by ' + options.contrast);
                    image.contrast(options.contrast);
                }

                if (options.posterize !== undefined) {
                    print('Posterizing image with ' + options.posterize + ' level');
                    image.posterize(options.posterize);
                }

                if (options.mask) {
                    print('Masking ' + options.mask.src + ' at ' + options.mask.x + ',' + options.mask.y);
                    image.mask(options.mask.src, options.mask.x, options.mask.y);
                }

                if (options.dither565) {
                    print('Dithering image, reducing colour space to 16 bits');
                    image.dither565();
                }

                if (options.cover) {
                    print('Covering image within ' + options.cover.width + 'x' + options.cover.height);
                    image.cover(options.cover.width, options.cover.height);
                }

                if (options.contain) {
                    print('Containing image within ' + options.contain.width + 'x' + options.contain.height);
                    image.contain(options.contain.width, options.contain.height);
                }

                if (options.background) {
                    print('Setting background colour to ' + options.background);
                    image.background(options.background);
                }

                if (options.fade !== undefined) {
                    print('Fading image by ' + options.fade);
                    image.fade(options.fade);
                }

                if (options.opaque) {
                    print('Setting the alpha channel on every pixel to fully opaque');
                    image.opaque();
                }

                if (options.quality) {
                    print('Setting quality level to ' + options.quality);
                    image.quality(options.quality);
                }

                image.getBuffer(Jimp.MIME_PNG, function (error, buffer) {
                    self.push(new gutil.File({ path: options.name, contents: buffer }));
                    return callback(error);
                });

            }).catch(function (error) {
                return callback(error);
            });

        });

    };

})();
