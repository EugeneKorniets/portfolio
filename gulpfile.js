var gulp         = require('gulp');
var scss         = require('gulp-sass');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync');
var del          = require('del');
var minify       = require('gulp-csso');
var rename       = require('gulp-rename');
var run          = require('run-sequence');
var uglify       = require('gulp-uglify');


gulp.task('clean', function() {
	return del('build');
});


gulp.task('copy', function() {
	return gulp.src([
		'src/fonts/**/*.{woff,woff2}',
		'src/img/**'
		], {
			base: 'src'
	})
	.pipe(gulp.dest('build'));
});


gulp.task('html', function() {
	return gulp.src('src/*.html')
	.pipe(gulp.dest('build'));
});


gulp.task('style', function() {
	return gulp.src('src/sass/style.scss')
	.pipe(plumber())
	.pipe(scss())
	.pipe(postcss([
		autoprefixer({
			browsers:['ie >= 11', 'last 4 version']
		})
		]))
	.pipe(gulp.dest('build/css'))
	.pipe(minify())
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest('src/css'))
	.pipe(gulp.dest('build/css'));
});


gulp.task('js', function() {
	return gulp.src('src/js/script.js')
	.pipe(plumber())
	.pipe(gulp.dest('build/js'))
	.pipe(uglify())
	.pipe(rename('script.min.js'))
	.pipe(gulp.dest('src/js'))
	.pipe(gulp.dest('build/js'));
});


gulp.task('build', function(done) {
	run (
		'clean',
		'copy',
		'html',
		'style',
		'js',
		done
		);
});


gulp.task('default', ['build'], function() {
	browserSync({
		server: {
			baseDir: 'build'
		},
		notify: false
	});
	gulp.watch('src/sass/**/*.scss', ['style', browserSync.reload]);
	gulp.watch('src/*.html', ['html', browserSync.reload]);
	gulp.watch('src/js/**/*.js', ['js', browserSync.reload]);
	gulp.watch('src/img/**/*', ['copy', browserSync.reload]);
});