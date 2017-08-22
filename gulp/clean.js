import gulp from 'gulp';
import del from 'del';
import conf from './conf';

gulp.task('clean', () => {
  return del([conf.paths.dest]);
});

gulp.task('clean:modules', () => {
  return del([conf.pathToApp('modules/modules.+(js|scss)')]);
});
