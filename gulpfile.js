const gulp = require('gulp');
const jade = require('gulp-jade');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pump = require('pump');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const autoprefixer =require('gulp-autoprefixer');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const base64 = require('gulp-base64');

gulp.task('compress', function (cb) {
    pump([
          gulp.src('src/js/*.js'),
          babel({presets: ['@babel/env']}),
          concat('main.js'),
          uglify(),
          rename({suffix: '.min'}),
          gulp.dest('dist/js')
      ],
      cb
    );
});

gulp.task('templates', function() {
    gulp.src('src/templates/*.jade')
      .pipe(jade({
        locals: {}
      }))
      .pipe(gulp.dest('dist/html'))
});

gulp.task('style', function () {
  gulp.src('src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(base64())
    .pipe(concat('style.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('imagemin', function(){
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});
    

gulp.task('default', ['compress', 'templates', 'style', 'imagemin']);