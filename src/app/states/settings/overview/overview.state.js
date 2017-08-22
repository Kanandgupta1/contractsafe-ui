import { OverviewComponent } from './overview.component';
import { TransitionResolve } from '@fino/ng2-common';

export const OverviewPath = 'overview';

export const overviewState = {
  path: OverviewPath,
  component: OverviewComponent,
  resolve: {
    transition: TransitionResolve
  }
};