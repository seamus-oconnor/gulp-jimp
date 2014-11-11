gulp-jimp
=========

[![Build Status](https://travis-ci.org/antoinejaussoin/gulp-jimp.svg)](https://travis-ci.org/antoinejaussoin/gulp-jimp)


> JavaScript Image Manipulation Program (JIMP) adapted to Gulp


Manipulate your images directly from Gulp, without the need for any external dependency (i.e. external executables). OS independent.

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
		.pipe(jimp({ resize: { width: 200, height: 300 }, scale: 30, greyscale: true }))
		.pipe(gulp.dest('dist'));
});
```

#### Options

Support all Jimp functionalities as of version 0.1.1.

You can define the transformations in the options, and add as many as you want (see example above).

## Crop

```js
{ crop: { x: 100, y: 100, width: 200, height: 200 } }
```

## Invert

```js
{ invert: true }
```

## Greyscale

```js
{ greyscale: true }
```

## Sepia

```js
{ sepia: true }
```

## Opacity

```js
{ opacity: 90 }
```

## Resize

```js
{ resize: { width: 100, height: 100 } }
```

## Scale

```js
{ scale: 90 }
```


## Blur

```js
{ blur: 90 }
```

## Gaussian

```js
{ gaussian: 90 }
```

### Big Thanks

Thanks to Oliver Moran and his wonderful [Jimp module](https://www.npmjs.org/package/jimp)

### Roadmap

I'm planning to take a look at the original Jimp module, to see if I can make that use streams/buffers to avoid having to write a temporary file.