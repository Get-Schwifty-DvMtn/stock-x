var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var order = require('gulp-order');

gulp.task('js', function(){
  return gulp.src(['./public/app/*.js', './public/app/js/*.js', './public/app/js/**/*.js'])
  .pipe(plumber())
  .pipe(order([
    'app.js', '*.js'
  ]))
  .pipe(concat('all.js'))
  .pipe(gulp.dest('.public/dist'));
});

gulp.task("sass", function(){
  return gulp.src(["./public/styles/*.scss"])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('.public/dist'));
});

gulp.task('watch', function() {
  gulp.watch('./public/styles/*.scss', ['sass']);
  gulp.watch('./public/app/*.js', ['js']);
  gulp.watch('./public/app/js/*.js', ['js']);
  gulp.watch('./public/app/js/**/*.js', ['js']);

});

gulp.task('default', ['watch', 'js', 'sass']);
