var gulp = require('gulp')
var ts = require('gulp-typescript')
var sass = require('gulp-sass')
var server = require('gulp-express')

const TYPESCRIPT_PUBLIC = 'src/public/**/*.ts'
const TYPESCRIPT_SERVER = 'src/server/**/*.ts'
const STATIC_PUBLIC = 'static/public/**/*'
const STATIC_SERVER = 'static/server/**/*'
const STYLES = 'src/public/style/style.scss'

gulp.task('compileClient', function() {
  var tsProject = ts.createProject('tsconfig-browser.json')
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'))
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

