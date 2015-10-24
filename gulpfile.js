(function () {
  'use strict';

  var gulp = require('gulp');
  var sass = require('gulp-sass');
  var minifyCss = require('gulp-minify-css');
  var rename = require('gulp-rename');
  var clean = require('gulp-clean');
  var autoprefixer = require('gulp-autoprefixer');
  var browserSync = require('browser-sync').create();

  var paths = {
    root : './',
    src  : './src/',
    dist : './dist/',
    demo : {
      root       : './demo/',
      components : './demo/components/',
      compiled   : './demo/.compiled/',
      index      : './index.html'
    }
  };

  var configs = {
    browserSync : {
      server : paths.root,
      port   : 9000,
      ui     : {
        port : 9001
      }
    },
    sass        : {},
    rename      : { suffix : '.min' },
    clean       : { read   : false }
  };


  /**
   * Task group to release Flexys
   */
  gulp.task('clean:dist', function () {
    gulp.src(paths.dist, configs.clean)
      .pipe(clean());
  });

  gulp.task('release', ['clean:dist'], function () {
    gulp.src(paths.src + '_flexysWithDep.scss')
      .pipe(sass(configs.sass).on('error', sass.logError))
      .pipe(gulp.dest(paths.dist))
      .pipe(rename(configs.rename))
      .pipe(minifyCss())
      .pipe(gulp.dest(paths.dist));
  });


  /**
   * Task group to develop demo pages
   */
  gulp.task('clean:compiled', function () {
    gulp.src(paths.demo.compiled, configs.clean)
      .pipe(clean());
  });

  gulp.task('demo:html', function () {
    gulp.src(paths.demo.index)
      .pipe(browserSync.stream());
  });

  gulp.task('demo:scripts', function () {
    gulp.src([
      paths.demo.root + '**/*.js',
      '!' + paths.demo.compiled
    ])
      .pipe(browserSync.stream());
  });

  gulp.task('demo:styles', ['clean:compiled'], function () {
    gulp.src([
      paths.demo.root + '**/*.scss',
      '!' + paths.demo.compiled
    ])
      .pipe(sass(configs.sass).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest(paths.demo.compiled))
      .pipe(browserSync.stream());
  });

  gulp.task('serve', function () {
    browserSync.init(configs.browserSync);

    gulp.watch(paths.demo.index, ['demo:html']);

    gulp.watch([
      paths.demo.root + '**/*.js',
      '!' + paths.demo.compiled
    ], ['demo:scripts']);

    gulp.watch([
      paths.demo.root + '**/*.scss',
      '!' + paths.demo.compiled
    ], ['demo:styles']);
  });

  gulp.task('default', ['release']);

})();
