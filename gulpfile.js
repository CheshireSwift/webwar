<<<<<<< HEAD
var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  browserify = require("browserify"),
  source = require('vinyl-source-stream'),
  tsify = require("tsify"),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  es = require('event-stream'),
  server = require('gulp-express');

const TYPESCRIPT_PUBLIC = 'src/public/**/*.ts'
const TYPESCRIPT_SERVER = 'src/server/**/*.ts'
const STATIC_PUBLIC = 'static/public/**/*'
const STATIC_SERVER = 'static/server/**/*'
const STYLES = 'src/public/style/style.scss'

gulp.task('compileClient', function() {
  var files = ['public/infantry.ts', 'public/mapGrid.ts'];
  var tasks = files.map(function(entry) {
    return browserify({
        basedir: 'src',
        debug: true,
        entries: [entry],
        require: ['../typings/index.d.ts'],
        cache: {},
        packageCache: {}
      }).plugin(tsify, {
        noImplicitAny: true,
        target: "es5"
      }).bundle()
      .pipe(source(entry))
      .pipe(rename({
                extname: '.bundle.js'
            }))
      .pipe(gulp.dest("dist"));
    });
    return es.merge.apply(null, tasks);
})

gulp.task('copyClient', function() {
  return gulp.src([STATIC_PUBLIC])
    .pipe(gulp.dest('dist/public'))
})

gulp.task('compileStyles', function() {
  return gulp.src(STYLES)
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
  return gulp.src([STATIC_SERVER])
    .pipe(gulp.dest('dist/server'))
})

gulp.task('server', ['compileServer', 'copyServer'])

gulp.task('default', ['browser', 'server'])

gulp.task('watch', ['browser', 'server'], function() {
  // Run server to start with
  server.run(['dist/server/main.js'])

  // Run tasks on change (all output to dist/*)
  gulp.watch([TYPESCRIPT_PUBLIC], ['compileClient'])
  gulp.watch([TYPESCRIPT_SERVER], ['compileServer'])
  gulp.watch([STATIC_PUBLIC], ['copyClient'])
  gulp.watch([STATIC_SERVER], ['copyServer'])
  gulp.watch([STYLES], ['compileStyles'])

  // Update/restart server on client/server file change
  gulp.watch(['dist/public/**/*'], server.notify)
  gulp.watch(['dist/server/**/*'], server.run)
})
