/*

    Before using make sure you have:
    npm install --save-dev gulp gulp-minify-css gulp-concat gulp-uglify gulp-autoprefixer gulp-sass

 */

 var gulp = require('gulp'),
 minifyCSS = require('gulp-minify-css'),
 concat = require('gulp-concat')
 uglify = require('gulp-uglify')
 prefix = require('gulp-autoprefixer')
 sass = require('gulp-sass');
 cssUrlToAbsolute = require('gulp-css-url-to-absolute')
 
// Minimizes JS
gulp.task('js', function(){
 return gulp.src([
     'node_modules/jquery/dist/jquery.js',
     'node_modules/leaflet/dist/leaflet.js',
     'node_modules/leaflet-groupedlayercontrol/dist/*.js',
     'static/js/fancybox/source/jquery.fancybox.js',
     'static/js/fancybox/source/helpers/jquery.fancybox-media.js',
     'static/js/map.js',
     'static/js/main.js'
    ])
 .pipe(uglify())
 .pipe(concat('build.min.js'))
 .pipe(gulp.dest('static/build/js'))
});

/*==========  Minify and concat different styles files  ==========*/

// SASS Version
/*
gulp.task('styles', function(){
 return gulp.src('src/sass/*.sass')
 .pipe(sass())
 .pipe(prefix('last 2 versions'))
 .pipe(concat('main.css'))
 .pipe(minifyCSS())
 .pipe(gulp.dest('public/css'))
});
*/

// Compress and minimize CSS
gulp.task('styles', function(){
 return gulp.src([
     'static/css/style.css',
     'static/bootstrap/css/bootstrap.css',
     'static/js/fancybox/source/*.css',
     'node_modules/leaflet/dist/*.css',
     'node_modules/leaflet-groupedlayercontrol/dist/*.css',
    ])
 .pipe(cssUrlToAbsolute({ root: './' }))
 .pipe(concat('style.min.css'))
 .pipe(minifyCSS())
 .pipe(prefix('last 2 versions'))
 .pipe(gulp.dest('static/build/css'))
});

gulp.task('default', function() {
 gulp.run('styles')
 gulp.run('js')
 gulp.watch('static/css/*.css', function(){
     gulp.run('styles')
 })
});