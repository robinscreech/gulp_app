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

var path = require('path');
 
gulp.task('less', function () {
  return gulp.src('./css/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'gulp_weather_app'
    },
  })
})

//gulp.watch('files to watch', ['tasks', 'to', 'run'])

gulp.task('watch', ['browserSync', 'less'], function (){
  gulp.watch('./css/*.scss', ['less']); 
  // Other watchers
});

/**

	TODO:
	- Fix the browser sync not serving file
	- Continue through tutorial
	- Make sure its serving up the Dist folder

 */
