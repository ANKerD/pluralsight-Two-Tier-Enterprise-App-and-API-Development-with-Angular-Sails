var gulp = require('gulp');
var webserver = require('gulp-webserver');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');

var paths = {
	temp: 'temp',
	tempVendor: 'temp/vendor',
	tempindex: 'temp/index,html',

	index: 'app/index.html',
	app: 'app/**/*.js',
	bower: 'bower_components'
}


gulp.task('default', ['scripts', 'vendor', 'serve', 'watch']);

gulp.task('scripts', function () {

	var tempIndex = gulp.src(paths.index).pipe(gulp.dest(paths.temp));

	var appFiles = gulp.src(paths.app)
		.pipe(gulp.dest(paths.temp));

	tempIndex
		.pipe(inject(appFiles, { relative: true}))
		.pipe(gulp.dest(paths.temp))
});

gulp.task('vendor', function () {

	var tempIndex = gulp.src('temp/index.html');

	var tempVendors = gulp.src(mainBowerFiles())
		.pipe(gulp.dest(paths.tempVendor));

	tempIndex
		.pipe(inject(tempVendors, {relative: true, name: 'vendorInject'}))
});

gulp.task('watch', function () {
	gulp.watch(paths.app, ['scripts']);
	gulp.watch(paths.bower + '/**/*.js', ['vendor']);
});

gulp.task('serve', function () {
	gulp.src(paths.temp)
		.pipe(webserver({
			// open: true
			livereload: true
		}));
});
