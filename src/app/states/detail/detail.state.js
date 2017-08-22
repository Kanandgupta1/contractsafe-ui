import { AppPath } from '../../app.state'
import { DetailComponent } from './detail.component';
import { DetailGuard } from './detail.guard';
import { DetailResolve } from './detail.resolve';

export const detailPath = 'detail/:id';

export const detailState = {
  path: detailPath,
  loadChildren: './detail.lazy#DetailLazyModule',
  canActivate: [DetailGuard],
  resolve: {
    details: DetailResolve
  }
};

export const detailLazyState = {
  path: '',
  component: DetailComponent
};