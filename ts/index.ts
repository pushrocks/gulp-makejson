/// <reference path="typings/tsd.d.ts" />
'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var pushrocks = require('pushrocks');

module.exports = function (options) {

    var files = [];

    options = options ? options : {};
    options.filename = options.filename || 'output.json';
    options.relative = options.relative || false;
    options.strip = options.strip || false;

    return through.obj(function (file, enc, cb) {

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-to-json', 'Streaming not supported'));
            return cb();
        }

        var path = file.path;
        if (options.relative) {
            path = file.relative;
        }

        if (options.strip) {
            path = path.replace(options.strip, '');
        }


        return cb();

    }, function (cb) {



    });
};