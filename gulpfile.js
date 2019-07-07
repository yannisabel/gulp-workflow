var gulp = require('gulp'),
    /*You can see dependancies in the package.json */
    plugins = require('gulp-load-plugins')({
        pattern: '*'
    }),
    browserSync = require('browser-sync');

/* Paths to Dev and web environnement for path flexibility*/
var devPaths = {
    base: 'src',
    tmpl: 'src/templates',
    styles: 'src/sass',
    script: 'src/js',
    img: 'src/images',
    fonts: 'src/fonts'
};

var webPaths = {
    tmpl: 'web',
    styles: 'web/css',
    script: 'web/js',
    img: 'web/images',
    fonts: 'web/fonts'
};

// Compile pug templates to html pages
function pug(cb) {
    gulp
        .src(devPaths.tmpl + '/**/*.pug')
        .pipe(plugins.pug({
        }))
        .pipe(plugins.prettify({indent_size: 4, preserve_newlines: true }))
        .pipe(gulp.dest(webPaths.tmpl))
        .pipe(browserSync.stream())
        cb()
}

function sass(cb) {
    gulp
        .src(devPaths.styles + '/main.scss')
        .pipe(plugins.sass({
            outputStyle: 'compressed',
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe(gulp.dest(webPaths.styles))
        .pipe(browserSync.stream())
        cb()
}

// Duplicate css files to the webPath
function css(cb) {
    gulp
        .src(devPaths.styles + '/**/*.css')
        .pipe(gulp.dest(webPaths.styles))
        .pipe(browserSync.stream())
        cb()
}

// Duplicate main.js file and minify it in the webPath
function js(cb) {
    gulp
        .src(devPaths.script + '/**/*.js')
        .pipe(plugins.uglify())
        .pipe(gulp.dest(webPaths.script))
        .pipe(browserSync.stream())
        cb()
}

// Duplicate fonts folder in webPath
function fonts(cb) {
    gulp
        .src(devPaths.fonts + '/**/*')
        .pipe(gulp.dest(webPaths.fonts))
        .pipe(browserSync.stream())
        cb()
}

// Duplicate images folder in webPath and minify them
function imagemin(cb) {
    gulp
        .src(devPaths.img + '/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(plugins.cache(plugins.imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest(webPaths.img))
        .pipe(browserSync.stream())
        cb()
}

function reload() {
    browserSync.reload();
}

// Add browsersync initialization at the start of the watch task
function watch(cb) {
    browserSync.init({
        server: {
            baseDir: webPaths.tmpl
        }
    });
    gulp.watch(devPaths.styles + '/**/*.scss', sass);
    gulp.watch(devPaths.styles + '/**/*.css', css);
    gulp.watch(devPaths.base + '/*.pug', pug);
    gulp.watch(devPaths.fonts + '**/*', fonts);
    gulp.watch(devPaths.img + '/**/*.+(png|jpg|jpeg|gif|svg)', imagemin);
    gulp.watch(devPaths.script + '/**/*.js', js);
    cb()
}

exports.pug = pug;
exports.sass = sass;
exports.css = css;
exports.js = js;
exports.fonts = fonts;
exports.imagemin = imagemin;
exports.watch = watch

exports.default = gulp.series(pug, sass, css, js, fonts, imagemin, watch);
