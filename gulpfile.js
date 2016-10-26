var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var order = require('gulp-order');

gulp.task('js', function(){
  return gulp.src(['./public/*.js', './public/js/*.js', './public/js/**/*.js'])
  .pipe(plumber())
  .pipe(order([
    'app.js', '.js'
  ]))
  .pipe(concat('all.js'))
  .pipe(gulp.dest('public/dist'));
});

gulp.task("sass", function(){
  return gulp.src(["./public/styles/main.scss"])
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('all.css'))
  .pipe(gulp.dest('public/dist'));
});

gulp.task('watch', function() {
  gulp.watch('./public/styles/*.scss', ['sass']);
  gulp.watch('./public/styles/**/*.scss', ['sass']);
  gulp.watch('./public/*.js', ['js']);
  gulp.watch('./public/js/*.js', ['js']);
  gulp.watch('./public/js/**/*.js', ['js']);

});

gulp.task('default', ['watch', 'js', 'sass']);
