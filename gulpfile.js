var gulp = require('gulp')
  , rename = require('gulp-rename')
  , handlebars = require('gulp-compile-handlebars')
  , browserify = require('gulp-browserify')
  , browserSync = require('browser-sync').create()
  , sass = require('gulp-sass')

gulp.task('javascript', function () {
  return gulp.src(['./lib/**/*.js'])
    .pipe(browserify({
      transform: ['babelify']
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('handlebars', function () {
  var options = {
    ignorePartials: true,
    batch : ['./lib/components/templates'],
  }

  return gulp.src('index.hbs')
    .pipe(handlebars({}, options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('.'))
})

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })

  gulp.watch(['index.hbs', 'lib/components/**/*.hbs'], ['handlebars'])
  gulp.watch(['./lib/**/*.js'], ['javascript'])
  gulp.watch(['./assets/scss/**/*.scss'], ['sass'])

  gulp.watch('index.html').on('change', browserSync.reload)
  gulp.watch('dist/index.js').on('change', browserSync.reload)
  gulp.watch('assets/styles/main.css').on('change', browserSync.reload)
})

gulp.task('sass', function () {
  return gulp.src(['./assets/scss/main.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./assets/styles'))
})

gulp.task('build', function () {
  gulp.start('javascript', 'sass', 'handlebars', 'browser-sync')
})
