# gulp-makejson
creates json from source files and pipes the resulting json down to the next plugin

### Buildstatus/Dependencies
[![Build Status](https://travis-ci.org/pushrocks/gulp-makejson.svg?branch=v0.0.9)](https://travis-ci.org/pushrocks/gulp-makejson)
[![Dependency Status](https://david-dm.org/pushrocks/gulp-makejson.svg)](https://david-dm.org/pushrocks/gulp-makejson)
[![devDependency Status](https://david-dm.org/pushrocks/gulp-makejson/dev-status.svg)](https://david-dm.org/pushrocks/gulp-makejson#info=devDependencies)

### Usage
```javascript
var gulp = require("gulp");
var gulpMarkdown = require("gulp-markdown");
var gulpMakeJson = require('gulp-makejson');

gulp.task("myTask", function() {
    gulp.src("./markdown/**/*.md") //markdown is just an example here. Can be any kind of textfiles.
    .pipw(gulpMarkdown()) // converts the md files in html
    .pipe(gulpMakeJson()) // packs all the html stuff in nice json format
    .pipe(gulp.dest("./build/"))
});
```

The task will create a json of all files in the pipeline in the following way:

```json
{
    "myfirstfile.md": "#mytitle\nThis is the first paragraph",
    "subfolder/mysecondfile.md": "#mytitle\nThis is the second paragraph"
}
```

>Note: Using this plugin will currently result in only one json file being emitted.
>Note: The key will reflect the relative path of a file

Feel free to contribute. Pull requests will be reviewed in a timely manner.

### About the authors:
[![Project Phase](https://mediaserve.lossless.digital/lossless.de/img/createdby_github.svg)](https://lossless.com/)

[![Support Us](https://img.shields.io/badge/Support%20us-PayPal-blue.svg)](https://paypal.me/lossless)