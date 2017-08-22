import { Theming } from '@fino/ng2-common';
import loadBundle from '../shared/loadBundle';

export default (theme) => {
  Reflect.defineMetadata('theming:styles', theme, Theming.constructor);

  loadBundle('app');
};