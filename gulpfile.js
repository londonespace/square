const { src, dest, parallel, series, watch } = require('gulp');

const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

const pug = require('gulp-pug');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const modifyCssUrls = require('gulp-modify-css-urls');

const imageMin = require('gulp-imagemin');
const newer = require('gulp-newer');

const del = require('del');

//BROWSER 'SYNC'

function initBrowserSync() {
	browserSync.init({
		server: { baseDir: 'app' },
		notify: false,
		open: false,
		startPath: '/html/index.html'
	});
}

// MARKUP

function compilateToHTML() {
	return src('app/pug/**/*.pug')
		.pipe(pug())
		.pipe(dest('app/html/'))
		.pipe(browserSync.stream());
}

// STYLES

const styles = series(concatSass, compilateToCSS, modifyUrls);

let sassModules = [
	'app/sass/config.sass',
	'app/sass/common/*.sass',
	'app/sass/elements/*.sass',
	'app/sass/structure-sections/**/*.sass'];

function concatSass() {
	return src(sassModules)
		.pipe(concat('app.min.sass'))
		.pipe(dest('app/sass/'));
}

function compilateToCSS() {
	return src('app/sass/app.min.sass')
		.pipe(sass())
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
		.pipe(cleanCSS(({ level: { 1: { specialComments: 0 } }/*, format: 'beautify'*/ })))
		.pipe(dest('app/css/'))
		.pipe(browserSync.stream());
}

function modifyUrls() {
	return src('app/css/app.min.css')
		.pipe(modifyCssUrls({
			modify: (url, filePath) => {
				let newUrl = url;
				let reverseCwd = '../';

				if (url.includes('/img/')) newUrl = url.slice(reverseCwd.length);

				return newUrl;
			},

			prepend: '',
			append: ''
		}))
		.pipe(dest('app/css/'));
}

// SCRIPTS

let jsModules = [
	'app/libs/jquery/jquery.min.js',
	'app/libs/mmenu-js/mmenu.js',
	'app/libs/owl-carousel/owl.carousel.min.js',
	'app/js/custom/*.js',
];

function buildScripts() {
	return src(jsModules)
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js/'))
		.pipe(browserSync.stream());
}

//IMAGES

function minimazeImages() {
	return src('app/img/**/*')
		.pipe(newer('dist/img/*'))
		.pipe(imageMin())
		.pipe(dest('dist/img/'));
}

function cleanMinImages() {
	return del('dist/img/**/*', { force: true });
}

// BUILD

function buildCopy() {
	return src([
		'app/css/*.min.css',
		'app/js/*.min.js',
		'app/img/dest/*',
		'app/*.html',
		'app/fonts/**/*'
	], { base: 'app' })
		.pipe(dest('dist'));
}

function cleanDist() {
	return del('dist/**/*', { force: true });
}

// WATCH

function startWatching() {
	watch('app/pug/*.pug', compilateToHTML);
	watch(['app/sass/**/*.sass', '!app/sass/app.min.sass'], styles);
	watch(['app/js/*.js', '!app/js/app.min.js'], buildScripts);
	watch('app/img/*', minimazeImages);
}


exports.initBrowserSync = initBrowserSync;

exports.markup = compilateToHTML;
exports.styles = styles;
exports.scripts = buildScripts;

const transformCode = series(compilateToHTML, styles, buildScripts);

exports.minimazeImages = minimazeImages;
exports.cleanMinImages = cleanMinImages;

exports.build = series(cleanDist, transformCode, buildCopy, minimazeImages);

exports.default = parallel(transformCode,
	series(initBrowserSync, browserSync.reload), startWatching);