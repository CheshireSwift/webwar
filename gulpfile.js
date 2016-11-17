var gulp = require('gulp')
var ts = require('gulp-typescript')

gulp.task('browser', function() {
  var tsProject = ts.createProject('tsconfig-browser.json')
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'))
})

gulp.task('server', ['browser'], function() {
  var tsProject = ts.createProject('tsconfig-server.json')
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'))
})

gulp.task('default', ['browser', 'server'])
