/**
 *
 * gulp less
 * gulp watch
 * https://css-tricks.com/gulp-for-beginners/
 *
 */

const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify-es').default;
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');

var path = require('path');
 
gulp.task('less', function () {
  return gulp.src('css/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  })
})

gulp.task('fonts', function() {
  return gulp.src('font/**/*')
  .pipe(gulp.dest('dist/font'))
})

gulp.task('useref', ['fonts'], function(){
    return gulp.src('*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['browserSync', 'less'], function (){
	gulp.watch('css/*.less', ['less']); 
	gulp.watch('*.html', browserSync.reload); 
	gulp.watch('*.js', browserSync.reload); 
});
