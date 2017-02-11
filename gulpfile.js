var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');

gulp.task('react', function () {
    browserify({
        entries: './src/app.js',
        debug: true
    })
    .transform("babelify", { presets: ["es2015", "react"], compact: false })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.js'], ['react']);
});
