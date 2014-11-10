gulp-jimp
=========

> JavaScript Image Manipulation Program adapted to Gulp

Disclaimer: this is a work in progress, only works with JPG for now 

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
