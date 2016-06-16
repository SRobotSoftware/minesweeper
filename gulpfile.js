var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass')

gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	})
})

gulp.task('sass', function () {
	return gulp.src('app/assets/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('app/assets/css/'))
		.pipe(browserSync.stream())
})

gulp.task('watch', ['browserSync', 'sass'], function () {
	gulp.watch('app/assets/scss/**/*.scss', ['sass'])
	gulp.watch('app/**/*.html', browserSync.reload)
	gulp.watch('app/scripts/**/*.js', browserSync.reload)
})

gulp.task('default', ['watch'], function () {
	console.log('////  Starting project...  ////')
})