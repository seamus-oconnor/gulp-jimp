var gulp = require('gulp'),
    jimp = require('../');

gulp.task('default', function () {
    gulp.src('logo.png').pipe(jimp({
        name: 'logo-100.png',
        crop: { x: 100, y: 100, width: 200, height: 200 },
        invert: true,
        flip: { horizontal: true, vertical: true },
        gaussian: 2,
        blur: 2,
        greyscale: true,
        sepia: true,
        opacity: 0.5,
        resize: { width: 100, height: 100 },
        scale: 1.2,
        rotate: 90,
        brightness: 0.5,
        contrast: 0.3,
        posterize: 2,
        dither565: true,
        background: '#ff0000',
        logging: true
    })).pipe(gulp.dest('./images/'));
});
