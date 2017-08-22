import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { 
  BaseResolve,
  AppStateService,
  TransitionService
} from '@fino/ng2-common';

import { AccountService } from '../../../common/services/account.service';

@Injectable()
export class FeedResolve extends BaseResolve {
  constructor(
    @Inject(AccountService) accountService, 
    @Inject(AppStateService) appStateService, 
    @Inject(Router) router,
    @Inject(TransitionService) transitionService) {
    super(router, transitionService, appStateService);

    this.accountService = accountService;
    this.transitionService = transitionService;
  }

  resolve(route) {
    return super.resolve(() => this.accountService.fetchNewsFeed());
  }
}