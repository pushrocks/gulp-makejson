/// <reference path="typings/tsd.d.ts" />
'use strict';
var gutil = require('gulp-util');
var path = require("path");
var through = require('through2');
var beautylog = require("beautylog");

module.exports = function (options, logBool:boolean = false) {

    //handle options
    options = options ? options : {};
    options.filename = options.filename || 'output.json';

    //log output filename
    if (logBool) beautylog.log('filenames output is ' + options.filename);

    var filesInPipeline = false;
    var firstFileProcessed = false;
    var constructObject = {};
    var initialBase:string;

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

        //get base of first file
        if(!firstFileProcessed) {
            filesInPipeline = true;
            initialBase = file.base;
        }

        return cb();

    };

    /**
     * gets executed on end of stream, pipes the build json down the pipeline
     * @param cb the callback to let gulp know that we are finished here
     */
    var pipeJson = function (cb) {
        if (filesInPipeline) {
            //create the final JSON
            var finalJson = JSON.stringify(constructObject, null, 0);

            //create the final file we return
            var finalFile = new gutil.File({
                base: initialBase,
                path: path.join(initialBase,options.filename),
                contents: new Buffer(finalJson)
            });
            this.push(finalFile)
            cb();
        } else {
            cb(null);
        }
    };


    return through.obj(buildJson,pipeJson);
};