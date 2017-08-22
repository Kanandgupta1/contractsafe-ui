import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  BaseResolve,
  AppStateService,
  TransitionService
} from '@fino/ng2-common';

import { AccountService } from '../../common/services/account.service';

@Injectable()
export class DetailResolve extends BaseResolve {
  constructor(
  @Inject(AccountService) accountService, 
  @Inject(AppStateService) appStateService, 
  @Inject(Router) router,
  @Inject(TransitionService) transitionService) {
    super(router, transitionService, appStateService);

    this.accountService = accountService;
  }

  resolve(route) {
    return super.resolve(() => this.accountService.fetchDetailsFor(route.params.id));
  }
}