# gulp-jimp2 [![Build Status](https://travis-ci.org/haydenbleasel/gulp-jimp2.svg?branch=master)](https://travis-ci.org/haydenbleasel/gulp-jimp2)

A JIMP wrapper for Gulp forked from [antoinejaussoin/gulp-jimp](https://github.com/antoinejaussoin/gulp-jimp). Forked to provide a configuration for the full set of JIMP features, handle multiple image outputs, work purely with image buffers and deal with the Gulp stream properly. Install with:

```
npm install gulp-jimp2
```

## Usage

```js

var gulp = require('gulp'),
    jimp = require('gulp-jimp2');

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
            resize: { width: 100, height: 100 },
            scale: 1.2,
            rotate: 90,
            brightness: 0.5,
            contrast: 0.3
        },
        '-3': {
            posterize: 2,
            dither565: true,
            background: '#ff0000'
        }
    })).pipe(gulp.dest('./images/'));
});
```
