"use strict"

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat');

// сервер
gulp.task('server', function () {
    browserSync({
        port:9000,
        server: {
            baseDir: 'app'
        }
    });
});
//обьединение в один css из scss
gulp.task('sass', function(){
  gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError)) // Using gulp-sass
    .pipe(concat('style.css')) 
    .pipe(gulp.dest('app/css/'));
});

// слежка
 gulp.task('watch', function () {
    gulp.watch([
        'app/*.html',
        'app/js/**/*.js',
        'app/css/**/*.css'
    ]).on('change', browserSync.reload);
    gulp.watch('app/scss/**/*.scss', ['sass']);
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['server', 'sass', 'watch']);