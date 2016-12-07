'use strict'

const babel = require('gulp-babel')
const del = require('del')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const lazypipe = require('lazypipe')
const merge = require('merge-stream')
const plumber = require('gulp-plumber')
const runSequence = require('run-sequence')
const standard = require('gulp-standard')

const jsSource = ['src/generators/**/*.js']

const transpile = lazypipe()
  .pipe(babel)

var isWatching = false

gulp.task('clean', () => {
  return del(['generators'])
})

gulp.task('babel', () => {
  let generators = gulp.src(jsSource)
    .pipe(gulpIf(isWatching, plumber()))
    .pipe(transpile())
    .pipe(gulp.dest('generators'))

  let test = gulp.src(['src/test/**/*.js'])
    .pipe(gulpIf(isWatching, plumber()))
    .pipe(transpile())
    .pipe(gulp.dest('test'))

  return merge(generators, test)
})

gulp.task('standard', () => {
  return gulp.src(jsSource)
    .pipe(gulpIf(isWatching, plumber()))
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      breakOnWarning: true,
      quiet: true
    }))
})

gulp.task('build', cb => {
  return runSequence(
    'clean',
    'standard',
    'babel',
    cb
  )
})

gulp.task('default', () => {
  isWatching = true
  return gulp.watch('src/**/*.js', ['standard', 'babel'])
})
