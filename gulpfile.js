const gulp = require('gulp'),
    gulpUtility = require('gulp-util'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

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