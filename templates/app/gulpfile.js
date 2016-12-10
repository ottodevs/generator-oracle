'use strict'

const gulp = require('gulp')
const chalk = require('chalk')
const env = require('gulp-env')
const nodemon = require('gulp-nodemon')
const plumber = require('gulp-plumber')
const standard = require('gulp-standard')

const jsSources = ['app/**/*.js', 'gulpfile.js']
const localEnvFile = './app/config/dev.env.js'

gulp.task('standard', () => {
  return gulp.src(jsSources)
    .pipe(plumber())
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      breakOnWarning: true,
      quiet: true
    }))
})

gulp.task('setEnv', () => {
  try {
    env({file: localEnvFile})
  } catch (err) {
    console.warn(chalk.black.bgYellow('No local environment file was found'))
  }
})

gulp.task('develop', () => {
  nodemon({
    script: 'index.js',
    stdout: true,
    stderr: true
  })
})

gulp.task('watch', () => {
  return gulp.watch(jsSources, ['standard'])
})

gulp.task('default', [
  'setEnv',
  'develop'
])
