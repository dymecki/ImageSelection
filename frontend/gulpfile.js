var gulp   = require('gulp');

var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var rename = require('gulp-rename');

gulp.task('lint', function() {
    gulp.src('public/js/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .on('error', notify.onError({
            message: 'JS hint fail'
        }));
});

// Compile Our Sass
gulp.task('scss', function() {
    return gulp.src('frontend/scss/*.scss')
        .pipe(sass({
            indentWidth: 4,
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest('public/css'));
});

// Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src('js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('dist'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('public/js/*.js', ['lint'/*, 'scripts'*/]);
    gulp.watch('frontend/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'scss', /*'scripts',*/ 'watch']);