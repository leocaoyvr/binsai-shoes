// Requirements
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var data         = require('gulp-data');
var fs           = require('fs');
var imageMin     = require('gulp-imagemin');
var plumber      = require('gulp-plumber');
var pug          = require('gulp-pug');
var scss         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var browserSync  = require('browser-sync');
var runSequence  = require('run-sequence');

// Optimize images
gulp.task('images', function () {
  return gulp.src('./dev/img/*')
    .pipe((imageMin({ progressive: true, interlaced: true })))
    .pipe(gulp.dest('./dist/img/'))
});

// SCSS
gulp.task('scss', function() {
  gulp.src('./dev/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
  .pipe(autoprefixer({ browsers: [ 'last 2 versions' ] }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist/css/'))
  .pipe(browserSync.stream())
});

// Minify JS
gulp.task('javascript', function() {
  return gulp.src(['./dev/js/*.js'])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/js/'))
});

// Compile PUG, English
gulp.task('viewEN', function() {
  gulp.src('./dev/pug/**/*.pug')
    .pipe(plumber())
    .pipe(data(function() {
      return JSON.parse(fs.readFileSync('./dev/lang/en.json'));
    }))
    .pipe(pug())
    .pipe(gulp.dest('./dist/en'));

  browserSync.reload();
});

// Compile PUG, Chinese
// gulp.task('viewCN', function() {
//   gulp.src('./dev/pug/**/*.pug')
//     .pipe(plumber())
//     .pipe(data(function() {
//       return JSON.parse(fs.readFileSync('./dev/lang/cn.json'));
//     }))
//     .pipe(pug())
//     .pipe(gulp.dest('./dist/cn'));
//   browserSync.reload();
// });

// Browser Sync Dev
gulp.task('browserSync', function() {
  browserSync.init({
    notify: false,
    port: 8080,
    ghostMode: false,
    server: {
      baseDir: 'dist',
      index: '/en/index.html'
    }
  });

  // gulp.watch(['./dev/pug/**/*.pug'], ['viewEN', 'viewCN']);
  gulp.watch(['./dev/pug/**/*.pug'], ['viewEN']);
  gulp.watch(['./dev/scss/**/*.scss'], ['scss']);
  gulp.watch(['./dev/js/**/*.js'], ['javascript']);
  // gulp.watch(['./dev/lang/*.json'], ['viewEN', 'viewCN']);
  gulp.watch(['./dev/lang/*.json'], ['viewEN']);

  gulp.watch(['./dist/js/**/*.js']).on('change', browserSync.reload);
  // gulp.watch(['./dist/**/*.html']).on('change', browserSync.reload);
});

// Defaullt, comple

gulp.task('default', function(done) {
  // runSequence('scss', 'viewEN', 'viewCN', 'javascript', 'images');
  runSequence('scss', 'viewEN', 'javascript', 'images');
});

// Serve Dev

gulp.task('serve', function(done) {
  // runSequence('scss', 'viewEN', 'viewCN', 'javascript', 'browserSync', function() {
  runSequence('scss', 'viewEN', 'javascript', 'browserSync', function() {
  });
});