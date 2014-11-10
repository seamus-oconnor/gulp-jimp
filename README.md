gulp-jimp
=========

> JavaScript Image Manipulation Program adapted to Gulp

## Install

```sh
$ npm install --save-dev gulp-jimp
```

## Usage

```js
var gulp = require('gulp');
var jimp = require('gulp-jimp');

gulp.task('default', function () {
	return gulp.src('src/images/*')
		.pipe({ resize: { width: 200, height: 300 }, scale: 30, greyscale: true })
		.pipe(gulp.dest('dist'));
});
```

#### Options

Support all Jimp functionalities as of version 0.1.1.

You can define the transformations in the options, and add as many as you want (see example above).

## Crop

