import fs from 'fs';
import path from 'path';
import { getPackageJson, getDependencies, readJson } from './helper';

/**
 *  This variables defines the root path of the application.
 */
const root = exports.root = '../src';

/**
 *  This variable contains the name of your application's deployment environment.
 *  Common values include 'dev', 'testing', 'production'
 */
exports.env = process.env.NODE_ENV;

/**
 *  Read the used port from the current process environment.
 *  Defaults to 3000.
 */
exports.port = process.env.PORT || 3000;

/**
 *  Contains all dependencies defined inside the package.json file
 *  as `dependencies` (NOT `devDependencies`!).
 *  This list will only be created once and on demand.
 *  Each dependency is represented by an object that contains the name,
 *  the main style and main script file, if available.
 *  For example:
 *  ```
 *    {
 *      name: 'dependencyName',
 *      script: 'index.js',
 *      style: 'src/index.scss'
 *    }
 *  ```
 */
exports.dependencies = getDependencies();

/**
 *  Read the current build number from the current process environment.
 */
exports.build = process.env.BUILD || 'localhost';

/**
 *  Helper method for creating absolute path from the root directory
 *  `__dirname/{root}/{glob}`
 */
const pathToRoot = exports.pathToRoot = (glob = '') => {
  return path.join(__dirname, root, glob);
};

/**
 *  Helper method for resolving paths to the app
 *  `app/{glob}`
 */
const pathToApp = exports.pathToApp = (glob = '') => {
  return path.join(__dirname, root, 'app', glob);
};

/**
 *  Helper method for resolving paths to the customizations
 *  `custom/{glob}`
 */
const pathToCustom = exports.pathToCustom = (glob = '') => {
  return path.join(__dirname, root, 'custom', glob);
};

/**
 *  Helper method for resolving paths to the apps components
 *  `app/components/{glob}`
 */
const pathToComponents = exports.pathToComponents = (glob = '') => {
  return path.join(__dirname, root, 'app/components', glob);
};

/**
 *  Helper method for resolving paths to the node modules
 *  `node_modules/{glob}`
 */
const pathToNodeModules = exports.pathToNodeModules = (glob = '') => {
  return path.join(__dirname, '../node_modules', glob);
};

/**
 *  Helper method for resolving paths to the apps components
 *  `app/components/{glob}`
 */
const pathToStates = exports.pathToStates = (glob = '') => {
  return path.join(__dirname, root, 'app/states', glob);
};

/**
 *  List of available customizations and their entries
 */
const customizations = {
  default: 'default',
  professional: 'professional'
};

exports.customizations = Object.keys(customizations);

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  js: pathToApp('**/*!(.spec.js).js'), // exclude spec files
  scss: pathToApp('**/*.scss'), // stylesheets
  html: [
    pathToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: {
    app: [
      'babel-polyfill',
      pathToRoot('app/bootstrap/bootstrap.js')
    ],
    startup: pathToRoot('startup/startup.js')
  },
  output: root,
  custom: pathToRoot('custom'),
  tmp: pathToRoot('.tmp'),
  dest: pathToRoot('dist'),
  mock: 'mock',
  generatorTemplates: {
    component: 'generator/component/**/*.**',
    state: 'generator/state/**/*.**',
    customization: 'generator/customization/**/*.**'
  }
};

/**
 *  List of available staging environments.
 */
exports.stages = {
  dev: 'dev',
  testing: 'testing'
};
