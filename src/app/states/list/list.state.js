import { AppPath } from '../../app.state'
import { ListComponent } from './list.component';
import { ListResolve } from './list.resolve';

export const ListPath = 'list';

export const listState = {
  path: ListPath,
  loadChildren: './list.lazy#ListLazyModule',
  resolve: {
    contracts: ListResolve
  }
};

export const listLazyState = {
  path: '',
  component: ListComponent
};