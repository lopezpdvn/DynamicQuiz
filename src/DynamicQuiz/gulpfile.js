/// <binding BeforeBuild='default' />
var gulp = require('gulp');
var jshint = require('gulp-jshint');

var paths = {
    appSrcJS: "./wwwroot/js/*js",
}

gulp.task('default', ['jshint'], function () {
    
});

gulp.task('jshint', function () {
    return gulp.src(paths.appSrcJS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))
});