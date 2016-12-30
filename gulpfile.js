var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

gulp.task('webpack', (callback) => {
  webpack(require('./webpack.config.js'), (err, stats) => {
    if(err) throw new gutil.PluginError('webpack', err);
    callback();
  });
});

gulp.task('default', ['webpack']);
