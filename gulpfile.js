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
      flexys  : './demo/flexys/',
      sass    : './demo/sass/',
      styles  : './demo/styles/',
      scripts : './demo/scripts/'
    }
  };

  var configs = {
    sass   : {},
    rename : { suffix: '.min' },
    clean  : { read: false }
  };

  /**
   * Task group to release Flexys
   */
  gulp.task('clean:dist', function () {
    gulp.src(paths.dist, configs.clean)
      .pipe(clean());
  });

  gulp.task('release', ['clean:dist'], function () {
    gulp.src(paths.demo.flexys + 'flexys.scss')
      .pipe(sass(configs.sass).on('error', sass.logError))
      .pipe(gulp.dest(paths.dist))
      .pipe(rename(configs.rename))
      .pipe(minifyCss())
      .pipe(gulp.dest(paths.dist));
  });

  /**
   * Task group to develop demo pages
   */
  gulp.task('clean:styles', function () {
    gulp.src(paths.demo.styles, configs.clean)
      .pipe(clean());
  });

  gulp.task('demo:styles', ['clean:styles'], function () {
    gulp.src(paths.demo.sass + '**/*.scss')
      .pipe(sass(configs.sass).on('error', sass.logError))
      .pipe(gulp.dest(paths.demo.styles));
  });

  gulp.task('serve', function () {
    gulp.watch(paths.demo.sass + '**/*.scss', ['demo:styles']);

    livereload.listen();

    gulp.watch([
      paths.demo.styles + '**',
      paths.demo.scripts + '**',
      paths.dist
    ]).on('change', livereload.changed);
  });

})();
