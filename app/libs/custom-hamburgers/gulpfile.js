const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// STYLES

function buildStyles() {
	return src('src/hamburgers.scss')
		.pipe(sass())
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
		.pipe(cleanCSS(({ level: { 1: { specialComments: 0 } }/*, format: 'beautify'*/ })))
		.pipe(dest('dist'));
}

function startWatching() {
	watch('src/**/*.scss', buildStyles);
}


exports.default = series(buildStyles, startWatching);
exports.styles = buildStyles;