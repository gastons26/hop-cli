const TS_MODULE = 'H2O.--ProjectName--';
const ANGULAR_MODULE = TS_MODULE.toLowerCase() + '.controllers';
var gulp = require('gulp');
var gettext = require('gulp-angular-gettext');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
gulp.task('default', ['pot']);
gulp.task('pot', function () {
    return gulp.src(['Angular/**/*.html'])
        .pipe(gettext.extract('template.pot', {

        }))
        .pipe(gulp.dest('Angular/po/'));
});
gulp.task('translations', function () {
    return gulp.src('Angular/po/**/*.po')
        .pipe(gettext.compile({ module: ANGULAR_MODULE }))
        .pipe(insert.wrap('// AUTO-GENERATED file, your changes will be deleted!\nmodule ' + TS_MODULE + ' {\n', '\n}\n'))
        .pipe(rename(function (path) { path.extname = '.ts'; }))
        .pipe(gulp.dest('Angular/translations/'));
});