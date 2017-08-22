import { provideRoutes } from '@angular/router';
import { WaitForTranslationResolve } from '@fino/ng2-common';

// Lazy loaded routes
import { listState } from './states/list/list.state';
import { onboardingState } from './states/onboarding/onboarding.state';
import { errorState } from './states/error/error.state';
import { homeState } from './states/home/home.state';
import { documentsState } from './states/documents/documents.state';
import { settingsState } from './states/settings/settings.state';
import { detailState } from './states/detail/detail.state';
import { deletedState } from './states/deleted/deleted.state';
import { contractDetailCompletionState } from './states/contractDetailCompletion/contractDetailCompletion.state';
import { addContractState } from './states/addContract/addContract.state';

// Eager loaded routes 
import { loginState } from './states/login/login.state';
import { pendingState } from './states/pending/pending.state';

import { AppComponent } from './app.component';
import { AppGuard } from './app.guard';

export const AppPath = 'app';

// TODO I have to inject states here and also modules in app.js
// This does not seem right
export const rootRoutes = [{
  path: AppPath,
  component: AppComponent,
  canActivateChild: [AppGuard],
  children: [
    listState, 
    detailState,
    settingsState,
    onboardingState,
    deletedState,
    errorState,
    homeState,
    documentsState,
    contractDetailCompletionState,
    addContractState,
    loginState,
    pendingState
  ],
  resolve: {
    translation: WaitForTranslationResolve
  }
}, {
  // Refactor: Generalize this as generic redirect component
  path: '',
  component: AppComponent,
  canActivate: [AppGuard],
  data: {
    redirectTo: 'app/list'
  }
}, { 
  path: '**', 
  redirectTo: '/app/error', 
  pathMatch: 'full' 
}]