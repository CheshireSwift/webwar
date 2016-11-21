var gulp = require('gulp')
var ts = require('gulp-typescript')
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var sass = require('gulp-sass')

gulp.task('compileClient', function() {
  return browserify({
      basedir: 'src/public',
      debug: true,
      entries: ['main.ts'],
      require: ['../../typings/index.d.ts'],
      cache: {},
      packageCache: {}
    }).plugin(tsify, {
      noImplicitAny: true,
      target: "es5"
    }).bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist/public"));
})

gulp.task('copyClient', function() {
  return gulp.src(['static/public/**/*', ])
    .pipe(gulp.dest('dist/public'))
})

gulp.task('compileStyles', function() {
  return gulp.src('src/public/style/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/public'))
})

gulp.task('browser', ['compileClient', 'copyClient', 'compileStyles'])

gulp.task('compileServer', function() {
  var tsProject = ts.createProject('tsconfig-server.json')
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'))
})

gulp.task('copyServer', function() {
  return gulp.src(['static/server/**/*'])
    .pipe(gulp.dest('dist/server'))
})

gulp.task('server', ['compileServer', 'copyServer'])

gulp.task('default', ['browser', 'server'])
