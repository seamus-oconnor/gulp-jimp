gulp-jimp
=========

[![Build Status](https://travis-ci.org/antoinejaussoin/gulp-jimp.svg)](https://travis-ci.org/antoinejaussoin/gulp-jimp)

![](https://nodei.co/npm/gulp-jimp.png?downloads=True&stars=True)

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

## Resize

```js
{ resize: { width: 100, height: 100 } } // Very quick, unlike "crop"
```

## Crop

```js
{ crop: { x: 100, y: 100, width: 200, height: 200 } } // Very slow for some reason
```

## Invert

```js
{ invert: true } // Inverts the colours (very fast)
```

## Greyscale

```js
{ greyscale: true } // Turns into gray scale (very fast)
```

## Sepia

```js
{ sepia: true } // Turns into sepia (very fast)
```

## Opacity

```js
{ opacity: 0.5 } // Between 0 and 1, but doesn't seem to work
```

## Scale

```js
{ scale: 1.2 } // Will increase the image size by 20%
```


## Blur

```js
{ blur: 10 } // Value between 1 (slighly blured) and 100 (completely blured)
```

## Gaussian

```js
{ gaussian: 90 } // Min value: 1 (very very slow, even at 1, even slower when you go higher)
```

### Big Thanks

Thanks to Oliver Moran and his wonderful [Jimp module](https://www.npmjs.org/package/jimp)

### Roadmap

I'm planning to take a look at the original Jimp module, to see if I can make that use streams/buffers to avoid having to write a temporary file.
