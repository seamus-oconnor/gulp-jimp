/* eslint func-names: 0, no-invalid-this: 0 */

const async = require('async'),
    through2 = require('through2'),
    gutil = require('gulp-util'),
    colors = require('colors'),
    color = require('tinycolor2'),
    path = require('path'),
    Jimp = require('jimp');

(() => {

    'use strict';

    const MAX_HEX = 255;

    function jimp (outputs, logging) {

        function print (message, context) {
            const prefix = context ? `[${colors.green(context) }] ` : '';

            if (logging) {
                console.log(`${ prefix }${ message }...`);
            }
        }

        function getMIME (extension, type) {
            type = type || extension.substr(1);

            switch (type.toLowerCase()) {
                case 'bmp':
                    return { mime: Jimp.MIME_BMP, extension: '.bmp' };
                case 'jpg':
                    return { mime: Jimp.MIME_JPEG, extension: '.jpg' };
                default:
                    return { mime: Jimp.MIME_PNG, extension: '.png' };
            }
        }

        return through2.obj(function (file, encoding, next) {
            const self = this;

            if (file.isNull()) {
                return next(null, file);
            }

            if (file.isStream()) {
                return next(new gutil.PluginError('gulp-jimp', 'Streaming not supported'));
            }

            Jimp.read(file.contents).then((origImage) => {
                const oldName = path.basename(file.path),
                    oldDirname = path.dirname(file.path),
                    oldBase = file.base,
                    extension = path.extname(oldName),
                    filename = path.basename(oldName, extension);

                async.forEachOf(outputs, (options, suffix, callback) => {
                    const rgba = options.background ? color(options.background).toRgb() : { r: 0, g: 0, b: 0, a: 0 },
                        background = Jimp.rgbaToInt(rgba.r, rgba.g, rgba.b, rgba.a * MAX_HEX),
                        type = getMIME(extension, options.type),
                        newName = filename + suffix + type.extension;

                    const image = origImage.clone();

                    // Crop or autocrop not both
                    if (options.crop) {
                        print(`Applying Crop of ${ options.crop.width }x${ options.crop.height } at ${ options.crop.x },${ options.crop.y }`, newName);
                        image.crop(options.crop.x, options.crop.y, options.crop.width, options.crop.height);
                    } else if (options.autocrop) {
                        print(`Autoroping image with tolerance of ${ options.autocrop.tolerance } and only frames: ${ options.autocrop.cropOnlyFrames }`, newName);
                        image.autocrop(options.autocrop.tolerance, options.autocrop.cropOnlyFrames);
                    }

                    if (options.invert) {
                        print('Inverting image', newName);
                        image.invert();
                    }
                    if (options.flip || options.mirror) {
                        print(`Flipping (mirroring) image ${ options.flip.horizontal ? '' : 'not ' }horizontally and ${ options.flip.vertical ? '' : 'not ' }vertically`, newName);
                        image.flip(options.flip.horizontal, options.flip.vertical);
                    }
                    if (options.gaussian) {
                        print(`Applying gaussian blur of ${ options.gaussian }`, newName);
                        image.gaussian(options.gaussian);
                    }
                    if (options.blur) {
                        print(`Applying fast blur of ${ options.blur }`, newName);
                        image.blur(options.blur);
                    }
                    if (options.greyscale) {
                        print('Applying greyscale', newName);
                        image.greyscale();
                    }
                    if (options.sepia) {
                        print('Applying sepia tone', newName);
                        image.sepia();
                    }
                    if (Number.isFinite(options.opacity)) {
                        print(`Changing opacity to ${ options.opacity }`, newName);
                        image.opacity(options.opacity);
                    }
                    if (options.resize) {
                        print(`Resizing image to ${ options.resize.width || 'AUTO' }x${ options.resize.height || 'AUTO' }`, newName);
                        image.resize(options.resize.width || Jimp.AUTO, options.resize.height || Jimp.AUTO);
                    }
                    if (options.scaleToFit) {
                        print(`Scaling image to fit within ${ options.scaleToFit.width }x${ options.scaleToFit.height }`, newName);
                        image.scaleToFit(options.scaleToFit.width, options.scaleToFit.height);
                    }
                    if (options.scale) {
                        print(`Scaling image by ${ options.scale }`, newName);
                        image.scale(options.scale);
                    }
                    if (options.rotate) {
                        print(`Rotating image ${ options.rotate } degrees clockwise`, newName);
                        image.rotate(options.rotate);
                    }
                    if (options.blit) {
                        print(`Blitting ${ options.blit.src } at ${ options.blit.x },${ options.blit.y }`, newName);
                        image.blit(options.blit.src, options.blit.x, options.blit.y);
                    }
                    if (options.composite) {
                        print(`Compositing ${ options.composite.src } at ${ options.composite.x },${ options.composite.y }`, newName);
                        image.composite(options.composite.src, options.composite.x, options.composite.y);
                    }
                    if (Number.isFinite(options.brightness)) {
                        print(`Adjusting brightness by ${ options.brightness }`, newName);
                        image.brightness(options.brightness);
                    }
                    if (Number.isFinite(options.contrast)) {
                        print(`Adjusting contrast by ${ options.contrast }`, newName);
                        image.contrast(options.contrast);
                    }
                    if (Number.isFinite(options.posterize)) {
                        print(`Posterizing image with ${ options.posterize } level`, newName);
                        image.posterize(options.posterize);
                    }
                    if (options.mask) {
                        print(`Masking ${ options.mask.src } at ${ options.mask.x },${ options.mask.y }`, newName);
                        image.mask(options.mask.src, options.mask.x, options.mask.y);
                    }
                    if (options.dither565) {
                        print('Dithering image, reducing colour space to 16 bits', newName);
                        image.dither565();
                    }
                    if (options.cover) {
                        print(`Covering image within ${ options.cover.width }x${ options.cover.height }`, newName);
                        image.cover(options.cover.width, options.cover.height);
                    }
                    if (options.contain) {
                        print(`Containing image within ${ options.contain.width }x${ options.contain.height }`, newName);
                        image.contain(options.contain.width, options.contain.height);
                    }
                    if (options.background) {
                        print(`Setting background colour to ${ options.background }`, newName);
                        image.background(background);
                    }
                    if (Number.isFinite(options.fade)) {
                        print(`Fading image by ${ options.fade }`, newName);
                        image.fade(options.fade);
                    }
                    if (options.opaque) {
                        print('Setting the alpha channel on every pixel to fully opaque', newName);
                        image.opaque();
                    }
                    if (Number.isFinite(options.quality)) {
                        print(`Setting quality level to ${ options.quality }`, newName);
                        image.quality(options.quality);
                    }

                    image.getBuffer(type.mime, (error, buffer) => {
                        self.push(new gutil.File({
                            base: oldBase,
                            path: path.resolve(oldDirname, newName),
                            contents: buffer
                        }));
                        return callback(error);
                    });
                }, (error) =>
                    next(error));
            }).catch((error) =>
                next(error));
        });
    }

    module.exports = jimp;

})();
