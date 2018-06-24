var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var minify = require('gulp-minify');

gulp.task('default', function() {
    // place code for your default task here
});

gulp.task('serve', ['pug', 'sass'], function() {

    browserSync.init({
        server: './dist'
    });
    // PUG
    gulp.watch('src/pug/**/*', function() {
        gulp.run('pug');
    });
    // STYLES
    gulp.watch('src/sass/**/*', function() {
        gulp.run('sass');
    });
    // JS
    gulp.watch('src/js/**/*.js', function() {
        gulp.run('js');
    });
    gulp.watch("dist/*.html'").on('change', browserSync.reload);
    gulp.watch("dist/css/*.css'").on('change', browserSync.reload);
    gulp.watch("dist/js/*.js'").on('change', browserSync.reload);
});

gulp.task('pug', function () {
    "use strict";
    return gulp.src('./src/pug/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src('./src/sass/style.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: []
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('assets', function() {
    return gulp.src('./src/assets/*')
        .pipe(gulp.dest('./dist/assets'))
        .pipe(browserSync.stream());
});