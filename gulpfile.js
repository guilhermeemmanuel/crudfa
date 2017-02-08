var gulp = require('gulp'),
	bower  = require('gulp-bower'),
	mkdirp = require('mkdirp'),
    del    = require('del'),
	http   = require('http'),
	ecstatic    = require('ecstatic');
	
	
var paths = {
	distFolder:   'dist/',
    sourceFolder: 'src/',
	imagesFolder: 'images/',
	cssFolder: 'css/',
	jsFolder: 'js/',
	libs: 'bower_components/'
	
	
};

var distPort = 8080;



//Run 
gulp.task('run-dist', function () {
    http.createServer(
        ecstatic({ root: __dirname + '/' + paths.distFolder })
    ).listen(distPort);

    console.log('Listening on http://localhost:' + distPort);
});


//Bower
gulp.task('bower', function() {
    return bower();
});


//Clean the dist Folder
gulp.task('clean', function () {
    mkdirp(paths.distFolder);
    return del([
        paths.distFolder + '/**'
    ], { force: true });
});

//Move the Views to Dist
gulp.task('views', function () {
    return gulp
        .src('*.html')
        .pipe(gulp.dest(paths.distFolder));
    
});

// Move the libs
gulp.task('libs', function () {
    return gulp
        .src(paths.libs + '**/*')
        .pipe(gulp.dest(paths.distFolder + paths.libs));
});


// Move the Js
gulp.task('js', function () {
    return gulp
        .src(paths.jsFolder + '**/*')
        .pipe(gulp.dest(paths.distFolder + paths.jsFolder));
});

// Move the Css
gulp.task('css', function () {
    return gulp
        .src(paths.cssFolder + '**/*')
        .pipe(gulp.dest(paths.distFolder + paths.cssFolder));
});

// Move the Images to Dist
gulp.task('images', function () {
    return gulp
        .src(paths.imagesFolder + '**/*')
        .pipe(gulp.dest(paths.distFolder + paths.imagesFolder));
});

//Build Project in Dist
gulp.task('build', ['clean'], function () { 
    var result = gulp.start('images');
    result = result && gulp.start('js');
    result = result && gulp.start('views');
    result = result && gulp.start('css');
	result = result && gulp.start('libs');	
    return result;
});


// Default gulp task
gulp.task('default', function () {
    
});