var gulp = require('gulp');
var jshint = require('gulp-jshint');
var bower = require('gulp-bower');

var paths = {
    src: "./wwwroot/js/*js",
}

gulp.task('default', function () {
    // place code for your default task here
    return gulp.src(paths.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))
});

gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest('wwwroot/lib/'));
});