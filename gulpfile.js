var gulp        = require('gulp');
var runSequence = require('run-sequence');
var sass        = require('gulp-sass');

var distFolder = './styles';

gulp.task('build:sass', function () {
    return gulp.src('./styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(distFolder));
});

gulp.task('watch:sass', function () {
    return gulp.watch('./styles/**/*.scss', ['build:sass']);
});

/* MAIN GULP TASKS */
gulp.task('default', function(cb) {
    runSequence('build:sass', cb);
});
gulp.task('watch', function(cb) {
    runSequence('build:sass', 'watch:sass', cb);
});
