# gulp-makejson
creates json from source files and pipes the resulting json down to the next plugin

### Buildstatus/Dependencies
[![Build Status](https://travis-ci.org/pushrocks/gulp-makejson.svg?branch=v0.0.9)](https://travis-ci.org/pushrocks/gulp-makejson)
[![Dependency Status](https://david-dm.org/pushrocks/gulp-makejson.svg)](https://david-dm.org/pushrocks/gulp-makejson)
[![devDependency Status](https://david-dm.org/pushrocks/gulp-makejson/dev-status.svg)](https://david-dm.org/pushrocks/gulp-makejson#info=devDependencies)

### Usage
```javascript
var gulp = require("gulp");
var gulpMakeJson = require('gulp-makejson');

gulp.task("myTask", function() {
    gulp.src("./markdown/*.md") //markdown is just an example here. Can be any kind of textfiles.
    .pipe(gulpMakeJson())
    .pipe(gulp.dest("./build/"))
});
```

The task will create a json of all files in the pipeline in the following way:

```json
{
    "myfirstfile.md": "#mytitle\nThis is the first paragraph",
    "mysecondfile.md": "#mytitle\nThis is the second paragraph"
}
```

Note: Using this plugin will currently result in only one json file being emitted.

Feel free to contribute. Pullrequests will be reviewed in a timely manner.

Regards
Phil from Lossless Digital.