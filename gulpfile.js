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
const TYPESCRIPT_SHARED = 'src/shared/**/*.ts'
const STATIC_PUBLIC = 'static/public/**/*'
const STATIC_SERVER = 'static/server/**/*'
const STYLES = 'src/public/style/style.scss'

function compileClient() {
  var files = ['public/infantry.ts', 'public/mapGrid.ts']
  var tasks = files.map(function(entry) {
    return browserify({
        basedir: 'src',
        debug: true,
        entries: [entry],
        require: ['../typings/index.d.ts', '../types/index.d.ts'],
        cache: {},
        packageCache: {}
      }).plugin(tsify, {
        noImplicitAny: true,
        target: "es5"
      }).bundle()
      .pipe(source(entry))
      .pipe(rename({ extname: '.bundle.js' }))
      .pipe(gulp.dest("dist"));
  })
  return es.merge.apply(null, tasks);
}

function compileServer(fatal) {
  var tsProject = ts.createProject('tsconfig-server.json')
  return tsProject.src()
    .pipe(tsProject())
    .on('error', function() { if (fatal) { process.exit(1) } })
    .js.pipe(gulp.dest('dist'))
}

function compileStyles(fatal) {
  return gulp.src(STYLES)
    .pipe(sass().on('error', function(err) { sass.logError(err); if (fatal) { process.exit(1) } }))
    .pipe(gulp.dest('dist/public'))
}

gulp.task('compileClient', compileClient)
gulp.task('compileStyles', function() { return compileStyles(false) })
gulp.task('compileServer', function() { return compileServer(false) })
gulp.task('copyClient', function() { return gulp.src([STATIC_PUBLIC]).pipe(gulp.dest('dist/public')) })
gulp.task('copyServer', function() { return gulp.src([STATIC_SERVER]).pipe(gulp.dest('dist/server')) })

gulp.task('browser', ['compileClient', 'copyClient', 'compileStyles'])
gulp.task('server', ['compileServer', 'copyServer'])

gulp.task('verifyBrowser', ['compileClient'], function() { return compileStyles(true) })
gulp.task('verifyServer', function() { return compileServer(true) })
gulp.task('test', ['verifyBrowser', 'verifyServer'])

gulp.task('default', ['browser', 'server'])
gulp.task('watch', ['browser', 'server'], function() {
  // Run server to start with
  server.run(['dist/server/main.js'])

  // Run tasks on change (all output to dist/*)
  gulp.watch([TYPESCRIPT_PUBLIC, TYPESCRIPT_SHARED], ['compileClient'])
  gulp.watch([TYPESCRIPT_SERVER, TYPESCRIPT_SHARED], ['compileServer'])
  gulp.watch([STATIC_PUBLIC], ['copyClient'])
  gulp.watch([STATIC_SERVER], ['copyServer'])
  gulp.watch([STYLES], ['compileStyles'])

  // Update/restart server on client/server file change
  gulp.watch(['dist/public/**/*'], server.notify)
  gulp.watch(['dist/server/**/*'], server.run)
})

