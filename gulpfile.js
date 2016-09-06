var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var pug = require('gulp-pug');
var concat = require('gulp-concat');


gulp.task('default', ['stylus', 'pug', 'js'], function() {
  browserSync.init({
    server: {
      baseDir: "dist/"
    }
  });
  gulp.watch('src/stylus/**/*.styl', ['stylus']);
  gulp.watch('src/pug/**/*.pug', ['pug']);
  gulp.watch('src/js/**/*.js', ['js']);
});


gulp.task('stylus', function() {
    gulp.src('src/stylus/style.styl')
    .pipe(stylus({
        'include css': true,
        'compress': true
    }))
    .pipe(autoprefixer('last 15 version'))
    .on('error', function(err) { console.log(err.message); })
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});


gulp.task('pug', function buildHTML() {
  return gulp.src('src/pug/*.pug')
  .pipe(pug({
    'pretty': false
  }))
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.stream());
});



gulp.task('lib', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/imagesloaded/imagesloaded.pkgd.min.js',
    'node_modules/isotope-layout/dist/isotope.pkgd.min.js',
    'node_modules/fitvids/dist/fitvids.min.js'
  ])
  .pipe(concat('lib.js'))
  .pipe(gulp.dest('./dist/'));
});


gulp.task('js', function() {
  gulp.src('src/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/'));
});