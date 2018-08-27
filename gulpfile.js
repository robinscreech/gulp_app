const gulp = require('gulp');
const less = require('gulp-less');

var path = require('path');
 
gulp.task('less', function () {
  return gulp.src('./css/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('css' function () {
	return gulp.src('./css/*.css')
	.pipe(gulp.dest('./dist/css'))
})