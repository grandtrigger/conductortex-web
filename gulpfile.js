var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var gulpLoadPlugins = require('gulp-load-plugins');
var pkg = require('./package.json');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');

var $ = gulpLoadPlugins();
var reload = browserSync.reload;

// Set the project name for some configurations
var projectName = 'ProjectName';


// Copy all files at the root level (app)
gulp.task('copy', function() {
    gulp.src([
        'app/*',
        '!app/*.html',
        'node_modules/apache-server-configs/dist/.htaccess'
    ], {
        dot: true
    })
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}))
});

// Scan your HTML for assets & optimize them
gulp.task('html', function() {
    return gulp.src('app/**/*.html')
    .pipe($.useref({
        searchPath: '{.tmp,app}',
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
    gulp.src('./app/index.html')
    .pipe(wiredep({
        devDependencies: true,
        ignorePath : /^(\/|\.+(?!\/[^\.]))+\.+/
    }))
    .pipe(gulp.dest('./app'))
});

// Import local js files
gulp.task('inject', function() {
    gulp.src('./app/index.html')
    .pipe(inject(gulp.src('./app/js/*.js', {read: false}), {relative: true}))
    .pipe(inject(gulp.src('./app/css/*.css', {read : false}, {relative : true})))
    .pipe(gulp.dest('./app'));
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
        server: ['app'],
        port: 3000
    });

    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/css/**/*.{scss,css}'], reload);
    gulp.watch(['app/js/**/*.js'], ['inject', reload]);
    gulp.watch(['app/images/**/*'], reload);
    // Add bower watch
    gulp.watch(['bower.json'], ['wiredep', reload]);
});
