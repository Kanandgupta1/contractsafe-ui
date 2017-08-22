import fs from 'fs';
import path from 'path';

const camelCased = exports.camelCased = (val) => {
  return val.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

const upperCamel = exports.upperCamel = (val) => {
  val = camelCased(val);
  return val.charAt(0).toUpperCase() + val.slice(1);
};

const lowerCamel = exports.lowerCamel = (val) => {
  val = camelCased(val);
  return val.charAt(0).toLowerCase() + val.slice(1);
};

const splice = exports.splice = (val, start, delCount, newSubStr) => {
  return val.slice(0, start) + newSubStr + val.slice(start + Math.abs(delCount));
};

/**
 *  Syncronously read and return the content of a json file.
 *  `fs` is used instead of `require` to prevent caching in watch (require caches).
 */
const readJson = exports.readJson = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

/**
 *  Read and return the package.json configuration (sync).
 */
const getPackageJson = exports.getPackageJson = (filePath = './package.json') => {
  return readJson(filePath);
};

/**
 *  Collect the main sass file of all dependencies
 *  defined in the given package which defaults to
 *  the roots package.json.
 */
const getDependencies = exports.getDependencies = (pkg = null, prefix = '@fino', result = {}) => {
  pkg = pkg || getPackageJson();

  // Detect main style file of each dependency
  pkg.dependencies && Object.keys(pkg.dependencies).filter(p => p.indexOf(prefix) > -1).forEach(key => {
    const depPath = path.join(__dirname, '../node_modules/' + key);
    const depPkg = getPackageJson(path.join(depPath, 'package.json'));
    const depName = depPkg.name;

    // Add new dependency package to the resulting dependencies
    result[depName] = {
      depName,
      name: depName.replace(new RegExp(`^${prefix}\/`), ''),
      prefix: prefix
    };

    // Detect - or define, if missing - the main style file of the dependency package
    // Defaults to `index.css`
    if (!depPkg.style || !depPkg.style.match(/\.s?[c|a]ss$/g)) {
      depPkg.style = depPkg['main.scss'] || depPkg['main.sass'] || 'index.css';
    }
    try {
      let mainStylePath = path.join(depPath, depPkg.style);
      if (fs.statSync(mainStylePath).isFile()) {
        // Set the main style file to the dependency package
        result[depName].style = mainStylePath;
      }
    } catch (ex) { /* no main style available for this package */ }

    // Detect - or define, if missing - the main script file of the dependency package
    // Defaults to `index.js`
    if (!depPkg.main || !depPkg.main.match(/\.js$/g)) {
      depPkg.main = 'index.js';
    }
    try {
      let mainScriptPath = path.join(depPath, depPkg.main);
      if (fs.statSync(mainScriptPath).isFile()) {
        // Set the main script file to the dependency package
        result[depName].script = mainScriptPath;
      }
    } catch (ex) { /* no main script available for this package */ }

    // Add all dependencies of the fetched package recursively.
    // Note: This method mutates the result object.
    getDependencies(depPkg, prefix, result);
  });

  return result;
};
