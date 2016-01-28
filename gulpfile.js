/**
 * @Author Jamie Peloquin <jamie@jamiepeloquin.com>
 */

'use strict';

/* Plug-Ins */
var gulp        = require('gulp'),
    htmlExtract = require('gulp-html-extract'),
    htmlReplace = require('gulp-html-replace' ),
    inlineCss   = require('gulp-inline-css'),
    rename      = require('gulp-rename' ),
    runSequence = require('run-sequence'),
    sass        = require('gulp-sass'),
    rimraf      = require('rimraf')
    ;

/* Paths */
var dirOutput   = './output',
    dirSrc      = './src',
    dirStyles   = dirSrc + '/scss',
    dirImg      = dirSrc + '/img';

/* Tasks */

/* Default */
gulp.task( 'default', function( syncCallback ) {
    runSequence(
        'cleanOutput',
        'compileSass',
        'cssInliner',
        'copyToTemplate',
        'extractTitle',
        syncCallback);
});

/* Destroy Output Directory */
gulp.task( 'cleanOutput', function( cb ){
    return rimraf( dirOutput, cb );
} );

/* Compile SCSS > CSS */
gulp.task( 'compileSass', function(){
    return gulp.src( dirStyles + '/**/*.scss' )
        .pipe( sass().on('error', sass.logError) )
        .pipe( gulp.dest( dirStyles ) );
});

/* Convert linked/embedded Styles to inline Styles */
gulp.task( 'cssInliner', function(){
    return gulp.src( dirSrc + '/*.html' )
        .pipe( inlineCss( {
            applyStyleTags:         true,
            applyLinkTags:          true,
            removeStyleTags:        true,
            removeLinkTags:         false,
            preserveMediaQueries:   true
        } ) )
        .pipe( htmlReplace({
            'msoStart': '<!--[if mso]>',
            'msoEnd':   '<![endif]-->'
        }) )
        .pipe( rename( function( path ) {
            path.extname = '.html';
        } ))
        .pipe( gulp.dest( dirOutput ) );
});

/* Copy to Template .txt File */
gulp.task( 'copyToTemplate', function(){
    return gulp.src( dirOutput + '/*.body.*.html' )
        .pipe( rename( function( path ){
            path.extname = '.txt';
        }))
        .pipe( gulp.dest( dirOutput ) );
} );

/* Extract the HTML Title content, to generate the Email Subject Line Template */
gulp.task( 'extractTitle', function(){
    return gulp.src( dirOutput + '/*.body.*.txt' )
        .pipe( htmlExtract( {
            sel:    'title'
        }) )
        .pipe( rename( function( path ){
            path.basename = path.basename.replace('.body', '.title');
            path.extname = '.txt';
        } ) )
        .pipe( gulp.dest( './' ) );
});





