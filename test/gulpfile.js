var gulp = require('gulp'),
    jimp = require('../');

gulp.task('default', function () {
    gulp.src('logo.png').pipe(jimp({
        '-1': {
            crop: { x: 451, y: 402, width: 632, height: 702 },
            invert: true,
            flip: { horizontal: true, vertical: true },
            gaussian: 2,
            blur: 2,
            greyscale: true,
            sepia: true,
            opacity: 0.5
        },
        '-2': {
            resize: { width: 100 },
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
    }, true)).pipe(gulp.dest('./images/'));
});
