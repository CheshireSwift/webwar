var gulp = require('gulp')
var ts = require('gulp-typescript')
var sass = require('gulp-sass')

gulp.task('compileClient', function() {
  var tsProject = ts.createProject('tsconfig-browser.json')
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'))
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
