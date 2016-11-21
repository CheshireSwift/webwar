var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  browserify = require("browserify"),
  source = require('vinyl-source-stream'),
  tsify = require("tsify"),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  es = require('event-stream');

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
      .pipe(source(entry))//qqtas whats this one
      .pipe(rename({
                extname: '.bundle.js'
            }))
      .pipe(gulp.dest("dist"));
    });
    return es.merge.apply(null, tasks);
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
