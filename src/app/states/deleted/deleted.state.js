import { DeletedComponent } from './deleted.component';

export const DeletedPath = 'deleted';

export const deletedState = {
  path: DeletedPath,
  loadChildren: './deleted.lazy#DeletedLazyModule'
};

export const deletedLazyState = {
  path: '',
  component: DeletedComponent
};