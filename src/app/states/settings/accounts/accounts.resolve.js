import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { BaseResolve } from '@fino/ng2-common';
import { AppStateService } from '@fino/ng2-common';
import { TransitionService } from '@fino/ng2-common';

import { AccountService } from '../../../common/services/account.service';
import { StateKeys } from '../../../common/services/appState.service';

@Injectable()
export class AccountsResolve extends BaseResolve {
  constructor(
  @Inject(AccountService) accountService, 
  @Inject(AppStateService) appStateService, 
  @Inject(Router) router,
  @Inject(TransitionService) transitionService) {
    super(router, transitionService, appStateService);

    this.accountService = accountService;
  }

  resolve(route) {
    return super.resolve(() => this.accountService.fetchAccounts(), StateKeys.Accounts);
  }
}