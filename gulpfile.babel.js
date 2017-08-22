/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

import wrench from 'wrench';

/**
 *  This will load all js files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench
  .readdirSyncRecursive('./gulp')
  .filter(file => (/\.(js)$/i).test(file))
  .map(file => require('./gulp/' + file));
