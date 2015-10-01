/// <reference path="typings/tsd.d.ts" />
'use strict';
var gutil = require('gulp-util');
var path = require("path");
var pr = require('pushrocks');
var through = require('through2');
module.exports = function (options, logBool) {
    if (logBool === void 0) { logBool = false; }
    //handle options
    options = options ? options : {};
    options.filename = options.filename || 'output.json';
    //log output filename
    if (logBool)
        pr.beautylog.log('filenames output is ' + options.filename);
    var constructObject = {};
    var initialBase;
    /**
     * build the json, does not pipe anything down the pipeline, look at the pipeJson function for that
     * @param file The file (or chunk in node stream terms)
     * @param enc
     * @param cb The callback
     * @returns {any}
     */
    var buildJson = function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-to-json', 'Streaming not supported'));
            return cb();
        }
        //create a new param on file with the String of the current Buffer as content
        constructObject[file.relative] = String(file.contents);
        return cb();
    };
    /**
     * gets executed on end of stream, pipes the build json down the pipeline
     * @param cb the callback to let gulp know that we are finished here
     */
    var pipeJson = function (cb) {
        //create the final JSON
        var finalJson = JSON.stringify(constructObject, null, 0);
        //create the final file we return
        var finalFile = new gutil.File({
            base: initialBase,
            path: path.join(initialBase, options.filename),
            contents: new Buffer(finalJson)
        });
        cb(null, finalFile);
    };
    return through.obj(buildJson, pipeJson);
};
