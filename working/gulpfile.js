var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var babel = require("gulp-babel");
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var htmlReplace = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin');
var del = require('del');
var sequence = require('run-sequence');
var jsonminify = require('gulp-jsonminify');
var uglify = require('gulp-uglify');

var config = {
  dist: 'dist/',
  src: 'src/',
  cssin: 'src/css/**/*.css',
  jsin: 'src/js/**/*.js',
  jonsin: 'src/js/**/*.json',
  imgin: 'src/img/**/*.{jpg,jpeg,png,gif,svg}',
  htmlin: 'src/*.html',
  scssin: 'src/scss/**/*.scss',
  cssout: 'dist/css/',
  jsout: 'dist/js/',
  jsonout: 'dist/js/',
  imgout: 'dist/img/',
  htmlout: 'dist/',
  scssout: 'src/css/',
  cssoutname: 'style.css',
  jsoutname: 'script.js',
  cssreplaceout: 'css/style.css',
  jsreplaceout: 'js/script.js'
};

gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('serve', ['sass'], function() {
  browserSync({
    server: config.src
  });

  gulp.watch([config.htmlin, config.jsin], ['reload']);
  gulp.watch(config.scssin, ['sass']);
  gulp.watch(config.jsin, ['js']);
});

gulp.task('sass', function() {
  return gulp.src(config.scssin)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scssout))
    .pipe(browserSync.stream());
});

gulp.task('css', function() {
  return gulp.src(config.cssin)
    .pipe(concat(config.cssoutname))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.cssout));
});

gulp.task("babel", function () {
  return gulp.src(config.jsin)
    .pipe(concat(config.jsoutname))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(config.jsout));
});

gulp.task('json', function () {
    return gulp.src(config.jonsin)
        .pipe(jsonminify())
        .pipe(gulp.dest(config.jsonout));
});

gulp.task('img', function() {
  return gulp.src(config.imgin)
    .pipe(changed(config.imgout))
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgout));
});

gulp.task('html', function() {
  return gulp.src(config.htmlin)
    .pipe(htmlReplace({
      'css': config.cssreplaceout,
      'js': config.jsreplaceout
    }))
    .pipe(htmlMin({
      sortAttributes: true,
      sortClassName: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(config.dist))
});

gulp.task('clean', function() {
  return del([config.dist]);
});

gulp.task('build', function() {
  sequence('clean', ['img','json','html', 'babel', 'css']);
});

gulp.task('default', ['serve']);
