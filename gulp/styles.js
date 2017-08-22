import gulp from 'gulp';
import inject from 'gulp-inject';
import injectString from 'gulp-inject-string';
import multiDest from 'gulp-multi-dest';
import folders from 'gulp-folders';
import rename from 'gulp-rename';
import foreach from 'gulp-foreach';
import file from 'gulp-file';
import clean from 'gulp-clean';
import path from 'path';
import conf from './conf';

gulp.task('styles', ['styles:map']);

gulp.task('styles:clean', () => {
  return gulp.src([
    conf.pathToCustom(`**/themes/*.scss`)
  ], {read: false}).pipe(clean())
});

gulp.task('styles:inject', ['styles:clean'], () => {
  // Fetch all style files inside the app folder
  // except those from the app/modules and app/styles folder.
  const files = gulp.src([
    conf.pathToApp('**/common/styles/*.scss'),
    conf.pathToApp('**/common/styles/**/*.scss')
  ], { cwd: conf.pathToApp('styles'), read: false });

  return gulp.src(conf.pathToApp('styles/app.scss'))
    .pipe(inject(files, {
      starttag: '// inject:app.{{ext}}',
      endtag: '// endinject:app.{{ext}}',
      transform: (filepath) => {
        filepath = filepath.replace(/\/node_modules\//, '~');
        if (filepath.charAt(0) === '/') {
          filepath = filepath.substr(1);
        }
        return `@import '${filepath}';`;
      }
    }))
    .pipe(rename('app.scss'))
    .pipe(gulp.dest(conf.pathToApp('styles')));
});

// Copy theme files to all custom folders and inject theme variables
gulp.task('styles:theming', ['styles:inject'], () => {
  const destinations = conf.customizations.map(c => {
    return conf.pathToCustom(`${c}/themes`);
  });

  return gulp.src([
    conf.pathToNodeModules('@fino/**/src/**/*.theme.scss'),
    conf.pathToApp('styles/*.theme.scss'),
    conf.pathToApp('states/**/*.theme.scss'),
    conf.pathToApp('components/**/*.theme.scss')
  ])
  .pipe(foreach((stream, sourceFile) => {
    const completePath = sourceFile.history[0];
    const themePath = conf.pathToCustom('default/themes');
    const relativePath = path.relative(themePath, completePath);
    const filename = getFilename(relativePath, '.theme');
    return file(
        filename, 
        `@import '../styles/variables';\n\n@import '${relativePath}';`,
        { src: true }
      )
      .pipe(multiDest(destinations));
  }));
});

// Create a map to later pass it via reflection to the theme component decorator
gulp.task('styles:map', ['styles:theming'], folders(conf.pathToCustom(''), (folder) => {
  const files = gulp.src([
    conf.pathToCustom(`${folder}/themes/*.scss`)
  ]);

  return gulp.src(conf.pathToCustom(`${folder}/theme.js`))
    .pipe(inject(files, {
      starttag: '// inject:import',
      endtag: '// endinject:import',
      transform: (filepath) => {
        const filename = getFilename(filepath);
        const relativePath = `./themes/${filename}.scss`;
        return `import ${filename} from '${relativePath}';`;
      }
    }))
    .pipe(inject(files, {
      starttag: '// inject:export',
      endtag: '// endinject:export',
      transform: (filepath, file, i, length) => {
        const filename = getFilename(filepath);
        const suffix = i === length - 1 ? '' : ',';
        return `${filename}${suffix}`;
      }
    }))
    .pipe(gulp.dest(conf.pathToCustom(folder)));
}));

const getFilename = (filepath, replace='.scss') => {
  const filepathArray = filepath.split('/');
  return filepathArray[filepathArray.length - 1].replace(replace, '');
}
