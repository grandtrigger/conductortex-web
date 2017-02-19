var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var gulpLoadPlugins = require('gulp-load-plugins');
var pkg = require('./package.json');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var cordova = require('cordova');

var $ = gulpLoadPlugins();
var reload = browserSync.reload;

// Set the project name for some configurations
var projectName = 'ProjectName';


// Copy all files at the root level (www)
gulp.task('copy', function() {
    gulp.src([
        'www/*',
        '!www/*.html',
        'node_modules/apache-server-configs/dist/.htaccess'
    ], {
        dot: true
    })
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}))
});

// Scan your HTML for assets & optimize them
gulp.task('html', function() {
    return gulp.src('www/**/*.html')
    .pipe($.useref({
        searchPath: '{.tmp,www}',
        noAssets: true
    }))

    // Minify any HTML
    .pipe($.if('*.html', $.htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeOptionalTags: true
    })))
    // Output files
    .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest('dist'));
});

// Clean output directory
gulp.task('clean', function() {
    del(['.tmp', 'dist/*', '!dist/.git'], {dot: true})
});

// Import bower dependencies
gulp.task('wiredep', function() {
    gulp.src('./www/index.html')
    .pipe(wiredep({
        devDependencies: true,
        ignorePath : /^(\/|\.+(?!\/[^\.]))+\.+/
    }))
    .pipe(gulp.dest('./www'))
});

// Import local js files
gulp.task('inject', function() {
    gulp.src('./www/index.html')
    .pipe(inject(gulp.src('./www/js/*.js', {read: false}), {relative: true}))
    // .pipe(inject(gulp.src('./www/css/*.css', {read : false}, {relative : true})))
    .pipe(gulp.dest('./www'));
});

// Watch files for changes & reload
gulp.task('serve', ['wiredep', 'inject'], function() {
    browserSync({
        notify: false,
        // Customize the Browsersync console logging prefix
        logPrefix: projectName,
        // Allow scroll syncing across breakpoints
        // scrollElementMapping: ['main', '.mdl-layout'],
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: ['www'],
        port: 3000
    });

    gulp.watch(['www/**/*.html'], reload);
    gulp.watch(['www/css/**/*.{scss,css}'], reload);
    gulp.watch(['www/js/**/*.js'], ['inject', reload]);
    gulp.watch(['www/images/**/*'], reload);
    // Add bower watch
    gulp.watch(['bower.json'], ['wiredep', reload]);
});

gulp.task('build', function(callback) {
    cordova.build({
        "platforms" : ["android"],
        "options" : ["--release", "gradleArg=--no-daemon"]
    }, callback);
});
