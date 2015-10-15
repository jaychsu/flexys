(function () {
  'use strict';

  var gulp = require('gulp');
  var sass = require('gulp-sass');
  var minifyCss = require('gulp-minify-css');
  var rename = require('gulp-rename');
  var clean = require('gulp-clean');
  var livereload = require('gulp-livereload');

  var paths = {
    src  : './src/',
    dist : './dist/',
    demo : {
      root    : './demo/',
      sass    : './demo/sass/',
      styles  : './demo/styles/',
      scripts : './demo/scripts/'
    }
  };

  var configs = {
    sass       : {},
    rename     : { suffix: '.min' },
    clean      : { read: false }
  };

  gulp.task('clean:dist', function () {
    gulp.src(paths.dist, configs.clean)
      .pipe(clean());
  });

  gulp.task('clean:styles', function () {
    gulp.src(paths.demo.styles, configs.clean)
      .pipe(clean());
  });

  gulp.task('compile', ['clean:dist'], function () {
    gulp.src(paths.demo.sass + 'flexys.scss')
      .pipe(sass(configs.sass).on('error', sass.logError))
      .pipe(gulp.dest(paths.dist))
      .pipe(rename(configs.rename))
      .pipe(minifyCss())
      .pipe(gulp.dest(paths.dist));
  });

  gulp.task('demo:styles', ['clean:styles'], function () {
    gulp.src(paths.demo.sass + 'main.scss')
      .pipe(sass(configs.sass).on('error', sass.logError))
      .pipe(gulp.dest(paths.demo.styles));
  });

  gulp.task('serve', function () {
    gulp.watch(paths.demo.sass + 'main.scss', ['demo:styles']);

    livereload.listen();

    gulp.watch([
      paths.demo.styles + '**',
      paths.demo.scripts + '**',
      paths.dist
    ]).on('change', livereload.changed);
  });

})();
