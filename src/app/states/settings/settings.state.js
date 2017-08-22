import { AppPath } from '../../app.state'
import { SettingsComponent } from './settings.component';
import { TransitionResolve } from '@fino/ng2-common';

// Import sub routes
import { overviewState } from './overview/overview.state';
import { accountsState } from './accounts/accounts.state';
import { publicState } from './public/public.state';
import { userState } from './user/user.state';

export const SettingsPath = 'settings';

export const settingsState = {
  path: SettingsPath,
  loadChildren: './settings.lazy#SettingsLazyModule',
  resolve: {
    transition: TransitionResolve
  }
};

export const settingsLazyState = {
  path: '',
  component: SettingsComponent,
  children: [
    {
      path: '',
      redirectTo: overviewState.path,
      pathMatch: 'full'
    },
    overviewState,
    accountsState,
    publicState,
    userState
  ]
};