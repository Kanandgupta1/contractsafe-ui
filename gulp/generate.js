import gulp from 'gulp';
import template from 'gulp-template';
import rename from 'gulp-rename';
import { argv } from 'yargs';
import path from 'path';
import _ from 'lodash';
import conf from './conf';
import { upperCamel, lowerCamel } from './helper';

export const createTemplate = (name, values = {}) => {
  return template(_.assign({
    name: name,
    upperCaseName: upperCamel(name),
    lowerCaseName: lowerCamel(name),
    kebabName: _.kebabCase(name)
  }, values));
}

export const generate = (src, dest, values) => {
  const name = argv.name;
  const parentPath = argv.parent || '';
  const destPath = path.join(dest, parentPath, name);

  return gulp.src(src)
    .pipe(createTemplate(name, values))
    .pipe(rename((file) => {
      file.basename = file.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
}

gulp.task('custom', () => {
  const src = conf.paths.generatorTemplates.customization;
  const dest = conf.pathToCustom();
  generate(src, dest);
});

gulp.task('component', () => {
  const src = conf.paths.generatorTemplates.component;
  const dest = conf.pathToComponents();
  generate(src, dest);
});

gulp.task('state', () => {
  const src = conf.paths.generatorTemplates.state;
  const dest = conf.pathToStates();
  generate(src, dest);
});
