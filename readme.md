# gulp-jimp [![Build Status](https://travis-ci.org/haydenbleasel/gulp-jimp.svg?branch=master)](https://travis-ci.org/haydenbleasel/gulp-jimp)

A JIMP wrapper for Gulp. Provides a configuration for the full set of JIMP features, handles multiple image outputs, works purely with image buffers and deals with the Gulp stream properly. Install with:

```
npm install gulp-jimp
```

## Usage

The configuration takes a set of objects with the configuration:

```js
suffix: {           // If the suffix is '-1', then 'source.jpg' -> 'source-1.jpg'
    modifiers,      // Crop, Invert, Flip, Gaussian, Blur, Greyscale, Sepia, etc.
    type            // BMP, Bitmap, JPG or JPEG. Case unnecessary and anything else is PNG.
},
```

For example:

```js
var gulp = require('gulp'),
    jimp = require('gulp-jimp');

gulp.task('default', function () {
    gulp.src('logo.png').pipe(jimp({
        '-1': {
            crop: { x: 100, y: 100, width: 200, height: 200 },
            invert: true,
            flip: { horizontal: true, vertical: true },
            gaussian: 2,
            blur: 2,
            greyscale: true,
            sepia: true,
            opacity: 0.5,
        },
        '-2': {
            autocrop: { tolerance: 0.0002, cropOnlyFrames: false },
            resize: { width: 100, height: 100 },
            scale: 1.2,
            rotate: 90,
            brightness: 0.5,
            contrast: 0.3,
            type: 'bitmap'
        },
        '-3': {
            posterize: 2,
            dither565: true,
            background: '#ff0000',
            type: 'jpg'
        }
    })).pipe(gulp.dest('./images/'));
});
```

This will output the following files:

```
logo-1.png
logo-2.png
logo-3.png
```

If you need an ES5 build for legacy purposes, just require the ES5 file:

```js
var jimp = require('gulp-jimp/es5');
```

To build the ES5 version:

```npm run es5```
