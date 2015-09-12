var gulp = require('gulp'),
  minifyCSS = require('gulp-minify-css'),
  sass = require('gulp-sass'),
  fileInclude = require('gulp-file-include'),
  browserSync = require('browser-sync').create();

gulp.task('compileStyle', function(){
  'use strict';
  gulp.src('scss/*.scss')
    .pipe(sass({outputStyle: 'compressed', includePaths: ['bower_components/foundation/scss'] }).on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./site/css/'))
    .pipe(browserSync.stream());
});

gulp.task('fileInclude', function() {
  return gulp.src(['./*.html'])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./site/'));
});

gulp.task('copyAssets', function() {
  gulp.src(['./images/*', './js/*', './documents/*'], { 'base' : '.' })
    .pipe(gulp.dest('./site/'));
});

gulp.task('default', ['compileStyle','fileInclude','copyAssets'], function() {
  'use strict';
  browserSync.init({
      server: {
          baseDir: './site/'
      }
  });
  gulp.watch('scss/*.scss', ['compileStyle']);
  gulp.watch(['./*.html', './includes/*.html'], ['fileInclude'], browserSync.reload);
  gulp.watch('./site/*.html').on('change', browserSync.reload);
});