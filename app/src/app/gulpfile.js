var gulp = require('gulp');

var libs = './wwwroot/vendor/';

gulp.task('default', ['copy-dependencies']);

gulp.task('copy-dependencies', [
    'copy-dependency:core-js',
    'copy-dependency:zone.js',
    'copy-dependency:reflect-metadata',
    'copy-dependency:systemjs',
    'copy-dependency:rxjs',
    'copy-dependency:angular-in-memory-web-api',
    'copy-dependency:angular',
    'copy-dependency:bootstrap',
    'copy-dependency:jquery',
    'copy-dependency:bootstrap-material-design'
]);

gulp.task('copy-dependency:core-js', function () {
    gulp.src([
        'node_modules/core-js/client/*.js'
    ]).pipe(gulp.dest(libs + 'core-js'));
});

gulp.task('copy-dependency:zone.js', function () {
    gulp.src([
        'node_modules/zone.js/dist/*.js'
    ]).pipe(gulp.dest(libs + 'zone.js'));
});

gulp.task('copy-dependency:reflect-metadata', function () {
    gulp.src([
        'node_modules/reflect-metadata/reflect.js'
    ]).pipe(gulp.dest(libs + 'reflect-metadata'));
});

gulp.task('copy-dependency:systemjs', function () {
    gulp.src([
        'node_modules/systemjs/dist/*.js'
    ]).pipe(gulp.dest(libs + 'systemjs'));
});

gulp.task('copy-dependency:rxjs', function () {
    gulp.src([
        'node_modules/rxjs/**/*.js'
    ]).pipe(gulp.dest(libs + 'rxjs'));
});

gulp.task('copy-dependency:angular-in-memory-web-api', function () {
    gulp.src([
        'node_modules/angular-in-memory-web-api/**/*.js'
    ]).pipe(gulp.dest(libs + 'angular-in-memory-web-api'));
});

gulp.task('copy-dependency:angular', function () {
    gulp.src([
        'node_modules/@angular/**/*.js'
    ]).pipe(gulp.dest(libs + '@angular'));
});

gulp.task('copy-dependency:bootstrap', function () {
    gulp.src([
        'node_modules/bootstrap/dist/**/*.*'
    ]).pipe(gulp.dest(libs + 'bootstrap'));
});

gulp.task('copy-dependency:jquery', function () {
    gulp.src([
        'node_modules/jquery/dist/jquery.min.js'
    ]).pipe(gulp.dest(libs + 'jquery'));
});

gulp.task('copy-dependency:bootstrap-material-design', function () {
    gulp.src([
          'node_modules/bootstrap-material-design/dist/**/*.*'
    ]).pipe(gulp.dest(libs + 'bootstrap-material-design'));
});
