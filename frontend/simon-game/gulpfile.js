var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var postcss      = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var lazypipe = require('lazypipe');
var sourcemaps   = require('gulp-sourcemaps');
var babel = require("gulp-babel");
var plumber = require('gulp-plumber');
var concat = require("gulp-concat");

//Broswer sync root folder
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('minify-css',() => {
  return gulp.src('app/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', () => {
  return gulp.src('app/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({ presets: ['es2015', 'es2017'] }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('html', () => {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
});

//concat and minify js/css files
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref({}, lazypipe().pipe(sourcemaps.init, { loadMaps: true })))
    //.pipe(gulpIf('app/*.js', uglify()))
    // Minifies only if it's a CSS file
    //.pipe('app/css/*.css', cssnano())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist'))
});

// Optimize images
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

// Move fonts to dist
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

//clean extra files
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

// clear local cache
gulp.task('cache:clear', function (callback) {
return cache.clearAll(callback)
})

// Gulp watch syntax to run after browserSync and sass
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/**/*.js', ['js']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.css', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

/*
  Build when fonts are linked
 */
gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'js', 'minify-css', 'useref', 'images'],
    callback
  )
})

// set defaul task to complie sass, start the browser, then watch for any changes
gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  )
})


