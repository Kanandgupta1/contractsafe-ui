import { ErrorComponent } from './error.component';

export const ErrorPath = 'error';

export const errorState = {
  path: ErrorPath,
  loadChildren: './error.lazy#ErrorLazyModule'
};

export const errorLazyState = {
  path: '',
  component: ErrorComponent
};