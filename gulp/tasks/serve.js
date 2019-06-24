'use strict';

module.exports = function() {
  $.gulp.task('serve', function() {
    $.browserSync.init({
      open: false,
      server: './build'
    });
    $.gulp.watch('./build/**/*.html').on('change', $.browserSync.reload);
    $.browserSync.watch('build', $.browserSync.reload);
  });
};