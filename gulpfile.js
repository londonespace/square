const { src, dest, parallel, series, watch } = require('gulp');

const browserSync = require('browser-sync').create();
const browserify = require('gulp-browserify');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');

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
	return src('app/pug/*.pug')
		.pipe(pug())
		.pipe(dest('app/html/'))
		.pipe(browserSync.stream());
}

// STYLES

let cssLibs = [
	'app/libs/font-awesome/font-awesome.min.css',
	'app/libs/custom-mmenu-js/dist/mmenu.css',
	'app/libs/custom-hamburgers/dist/hamburgers.css',
	'app/libs/owl-carousel/assets/owl.carousel.min.css',
	'app/libs/owl-carousel/assets/owl.theme.default.min.css'
];

let customModules = [
	'app/sass/config.sass',
	'app/sass/common/*.sass',
	'app/sass/elements/*.sass',
	'app/sass/structure-sections/**/*.sass'
];

let styleModules = cssLibs.concat(customModules);

let modifyCssUrlsOptions = {
	modify: (url, filePath) => {
		let newUrl = url;
		let reverseCwd = '../';
		if (url.includes('/img/')) newUrl = url.slice(reverseCwd.length);
		return newUrl;
	},
	prepend: '',
	append: ''
};

function buildAppStyles() {
	return src(customModules)
		.pipe(sourcemaps.init())
		.pipe(concat('app.min.sass'))
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(dest('app/css/'))
		.pipe(browserSync.stream());
}

function buildDistStyles() {
	return src(customModules)
		.pipe(concat('app.min.sass'))
		.pipe(sass())
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
		.pipe(cleanCSS(({ level: { 1: { specialComments: 0 } }/*, format: 'beautify'*/ })))
		.pipe(modifyCssUrls(modifyCssUrlsOptions))
		.pipe(dest('app/css/'));
}

// SCRIPTS

let jsModules = [
	'app/libs/jquery/jquery.min.js',
	'app/libs/custom-mmenu-js/dist/mmenu.js',
	'app/libs/owl-carousel/owl.carousel.min.js',
	'app/js/include/*.js',
	'app/js/custom/*.js',
];

function buildAppScripts() {
	return src(jsModules)
		.pipe(sourcemaps.init())
		// .pipe(browserify({
		// 	insertGlobals: true
		// }))
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(dest('app/js/'))
		.pipe(browserSync.stream());
}

function buildDistScripts() {
	return src(jsModules)
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js/'))
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
	watch('app/pug/**/*.pug', compilateToHTML);
	watch(styleModules, buildAppStyles);
	watch(['app/js/**/*.js', '!app/js/app.min.js'], buildAppScripts);
	watch('app/img/*', minimazeImages);
}


exports.initBrowserSync = initBrowserSync;

exports.markup = compilateToHTML;
exports.styles = buildAppStyles;
exports.scripts = buildAppScripts;

const transformCode = series(compilateToHTML, buildAppStyles, buildAppScripts);

exports.minimazeImages = minimazeImages;
exports.cleanMinImages = cleanMinImages;

exports.build = series(cleanDist, transformCode, buildCopy, minimazeImages);

exports.default = parallel(transformCode,
	series(initBrowserSync, browserSync.reload), startWatching);