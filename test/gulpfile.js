var gulp = require('gulp'),
    jimp = require('../');

gulp.task('default', function () {
    gulp.src('logo.png').pipe(jimp({
        name: 'logo-100.png',
        resize: { width: 100, height: 100 },
        crop: { x: 100, y: 100, width: 200, height: 200 },
        invert: true,
        greyscale: true,
        sepia: true,
        opacity: 0.5,
        scale: 1.2,
        blur: 2,
        gaussian: 2
    })).pipe(gulp.dest('./images/'));
});
