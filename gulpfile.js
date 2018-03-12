const gulp = require('gulp'),
    gulpUtility = require('gulp-util'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', () => {
    gulp.src('./public/styles/src/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/styles/'));
});

// Uglify JS files
gulp.task("uglify", () => {
    gulp.src('./public/scripts/src/*.js')
    .pipe(concat('bundle.min.js'))
    .pipe(rename('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/scripts/'));
});

// Process less files into CSS and reload
gulp.task('less', () => {
    gulp.src('./public/styles/less/*.less')
    .pipe(less().on('error', gulpUtility.log))
    .pipe(gulp.dest('./public/styles'));
});

// Use JShint to check for good JS
gulp.task('lint', () => {
    gulp.src('./public/scripts/*.js').pipe(jshint()).pipe(jshint.reporter('default'));
});

// Watch for file changes
gulp.task('build', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./public/styles/less/*.less', ['less']).on('change', browserSync.reload);;
    gulp.watch('./public/scripts/*.js', ['lint']).on('change', browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['build']);