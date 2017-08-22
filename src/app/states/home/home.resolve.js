import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { BaseResolve } from '@fino/ng2-common';
import { AppStateService } from '@fino/ng2-common';

import { AccountService } from '../../common/services/account.service';
import { StateKeys } from '../../common/services/appState.service';

@Injectable()
export class HomeResolve extends BaseResolve {
  constructor(
    @Inject(AccountService) accountService, 
    @Inject(AppStateService) appState, 
    @Inject(Router) router) {
    super(router, null, appState);

    this.accountService = accountService;
  }

  resolve(route) {
    return super.resolve(() => this.accountService.fetchSummary(), StateKeys.Summary);
  }
}