var gulp      = require('gulp');

var jshint    = require('gulp-jshint');
var scss      = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var concat    = require('gulp-concat');
var uglify    = require('gulp-uglify');
var notify    = require('gulp-notify');
var rename    = require('gulp-rename');

gulp.task('lint', function() {
    gulp.src('js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .on('error', notify.onError({
            message: 'JS hint fail'
        }));
});

// Compile Our Sass
gulp.task('scss', function() {
    return gulp.src([
            'scss/lib/normalize.css',
            'scss/lib/main.css',
            'scss/*.scss'
        ])
        .pipe(scss({
            indentWidth: 4,
            outputStyle: 'expanded'
        }))
        .pipe(minifyCSS())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('../public/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/**/*.js')
        // .pipe(concat('App.min.js'))

        // .pipe(rename(function(path) {
        //     path.extname = '.min.js';
        // }))
        .pipe(uglify())
        .pipe(gulp.dest('../public/js/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/**/*.js', ['lint', 'scripts']);
    gulp.watch('scss/**/*.*', ['scss']);
});

// Default Task
gulp.task('default', ['lint', 'scss', 'scripts', 'watch']);