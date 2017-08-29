var gulp = require('gulp'),
    gp_clean = require('gulp-clean'),
    gp_concat = require('gulp-concat'),
    gp_less = require('gulp-less'),
    gp_sourcemaps = require('gulp-sourcemaps'),
    gp_typescript = require('gulp-typescript'),
    gp_uglify = require('gulp-uglify');
    gp_util = require('gulp-util')

/// Define paths
var srcPaths = {
    app_ts: ['source/app/main.ts', 'source/app/**/*.ts'],
    app_templates: ['source/app/**/*.html', 'source/app/**.*.css'], 
    js: [
        'source/js/**/*.js',
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/typescript/lib/typescript.js',
        'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.min.js',
        'node_modules/moment/moment.js',
        'node_modules/scrollreveal/dist/scrollreveal.min.js',
        'node_modules/ng-scrollreveal/bundles/ng-scrollreveal.umd.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/froala-editor/js/froala_editor.pkgd.min.js',
        'node_modules/angular-froala-wysiwyg/bundles/angular-froala-wysiwyg.umd.js',
        'node_modules/angular2-jwt/angular2-jwt.js'
    ],
    js_angular: [
        'node_modules/@angular/**'
    ],
    js_rxjs: [
        'node_modules/rxjs/**'
    ],
    less: [
        'source/less/**/*.less'
    ],
    css: [
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/froala-editor/css/froala_editor.pkgd.min.css',
        'node_modules/froala-editor/css/froala_style.min.css'
    ],
    fonts: ['node_modules/font-awesome/fonts/**']
};

var destPaths = {
    app: 'wwwroot/app/',
    css: 'wwwroot/css/',
    js: 'wwwroot/js/',
    js_angular: 'wwwroot/js/@angular/',
    js_rxjs: 'wwwroot/js/rxjs/',
    fonts: 'wwwroot/fonts/'
};

// Compile, minify and create sourcemaps all TypeScript files and place them to wwwroot/app, together with their js.map files.
gulp.task('app', ['app_clean'], function () {


    gulp.src(srcPaths.app_templates)
        .pipe(gulp.dest(destPaths.app));

    gulp.src(srcPaths.app_ts)
        .pipe(gp_sourcemaps.init())
        .pipe(gp_typescript(require('./tsconfig.json').compilerOptions))
        //.pipe(gp_uglify({ mangle: false }))
		.pipe(gp_sourcemaps.write('/'))
        .pipe(gulp.dest(destPaths.app));

    gulp.src(srcPaths.app_ts)
        .pipe(gulp.dest(destPaths.app))
    
});

// Delete wwwroot/app contents
gulp.task('app_clean', function () {
    return gulp.src(destPaths.app + "**/*.*", { read: false })
    .pipe(gp_clean({ force: true }));
});

// Copy all JS files from external libraries to wwwroot/js
gulp.task('js', function () {
    gulp.src(srcPaths.js_angular)
        .pipe(gulp.dest(destPaths.js_angular));
    gulp.src(srcPaths.js_rxjs)
        .pipe(gulp.dest(destPaths.js_rxjs));
    return gulp.src(srcPaths.js)
        .pipe(gulp.dest(destPaths.js));
});

// Delete wwwroot/js contents
gulp.task('js_clean', function () {
    return gulp.src(destPaths.js + "*.*", { read: false })
    .pipe(gp_clean({ force: true }));
});

// Process all LESS files and output the resulting CSS in wwwroot/css
gulp.task('less', ['css_clean'], function () {
    return gulp.src(srcPaths.less)
        .pipe(gp_less().on('error', function(err){
        gp_util.log(err);
        this.emit('end');
    }))
        .pipe(gulp.dest(destPaths.css).on('error', function(err){
        gp_util.log(err);
        this.emit('end');
    }));
});

// Copy all JS files from external libraries to wwwroot/js
gulp.task('css', function () {
    return gulp.src(srcPaths.css)
        .pipe(gulp.dest(destPaths.css));
});

// Delete wwwroot/js contents
gulp.task('css_clean', function () {
    return gulp.src(destPaths.css + "*.*", { read: false })
    .pipe(gp_clean({ force: true }));
});

// Copy all JS files from external libraries to wwwroot/js
gulp.task('fonts', ['fonts_clean'], function () {
    return gulp.src(srcPaths.fonts)
        .pipe(gulp.dest(destPaths.fonts));
});

// Delete wwwroot/js contents
gulp.task('fonts_clean', function () {
    return gulp.src(destPaths.fonts + "*.*", { read: false })
    .pipe(gp_clean({ force: true }));
});

// Watch specified files and define what to do upon file changes
gulp.task('watch', function () {
    gulp.watch([
        srcPaths.app_ts,
        srcPaths.app_templates,
        srcPaths.js,
        srcPaths.less],
        ['app', 'js', 'less']);
});

// Global cleanup task
gulp.task('cleanup', ['app_clean', 'js_clean', 'css_clean', 'fonts_clean']);

// Define the default task so it will launch all other tasks
// gulp.task('default', ['app', 'js', 'less', 'watch']);
 gulp.task('default', ['app', 'js', 'less', 'css', 'fonts']);
