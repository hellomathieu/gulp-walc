'use strict';
var gutil = require('gulp-util'),
    through = require('through2'),
    walc = require('walc')

module.exports = function (options) {

  var methods = ['console', 'alert'],
      w

  options = options || {}

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file)
      return
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-walc-debug', 'Streaming not supported'))
      return
    }

    try {

      options.path = null
      options.defaultAction = 'remove'

      options.methods = {}
      
      for (var i = methods.length - 1; i >= 0; i--) {

        if (typeof options[methods[i]] === 'string') {
          options.methods[methods[i]] = options[methods[i]] || options.defaultAction
          delete options[methods[i]]
        }

      }

      w = walc(options)

      file.contents = new Buffer(w.process(file.contents.toString()).toString())
      this.push(file)
    
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-walc-debug', err, {fileName: file.path}))
    }

    cb()
  });
};