var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var paths = {
    reactAppEntry: './src/app.js',
    jsDest: './dist/js/',
    cssDest: './dist/css/',
    fontDest: './dist/fonts/'
};
var vendorJsSrc = [
    './bower_components/jquery/dist/jquery.min.js', 
    './bower_components/bootstrap/dist/js/bootstrap.min.js',
    './bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
    './bower_components/moment/min/moment.min.js'
];
var vendorCssSrc = [
    './bower_components/bootstrap/dist/css/bootstrap.min.css',
    './bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css'
];
var vendorFontSrc = [
    './bower_components/bootstrap/fonts/*'
];

//Compile react components
gulp.task('react', function () {
    browserify({
        entries: paths.reactAppEntry,
        debug: true
    })
    .transform('babelify', { presets: ['es2015', 'react'], compact: false })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('react-components.js'))
    .pipe(gulp.dest(paths.jsDest));
});

//Bundling and minification for thrid party JS
gulp.task('min:js', function () {
    return gulp.src(vendorJsSrc)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jsDest));
});

//Bundling and minification for thrid party CSS
gulp.task('min:css', function () {
    return gulp.src(vendorCssSrc)
        .pipe(concat('vendor.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.cssDest));
});

//Copy font files to dist folder
gulp.task('copy:font', function () {
    return gulp.src(vendorFontSrc)
        .pipe(gulp.dest(paths.fontDest));
});

//Deploy task
gulp.task('deploy', ['react', 'min:js', 'min:css', 'copy:font']);

//Watch Development
gulp.task('watch', function () {
    gulp.watch(['./src/**/*.js'], ['deploy']);
});