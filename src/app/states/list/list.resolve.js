import { Observable } from 'rxjs';

import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { 
  BaseResolve, 
  AppStateService,
  TransitionService 
} from '@fino/ng2-common';

import { StateKeys } from '../../common/services/appState.service';
import { AccountService } from '../../common/services/account.service';

@Injectable()
export class ListResolve extends BaseResolve {
  constructor(
  @Inject(AccountService) accountService, 
  @Inject(AppStateService) appStateService, 
  @Inject(Router) router,
  @Inject(TransitionService) transitionService) {
    super(router, transitionService, appStateService);

    this.accountService = accountService;
  }

  resolve(route) {
    return super.resolve(
      () => this.accountService.fetchContracts(true, true),
      null,
      resp => {
        if (resp.status === 520) {
          this.router.navigate(['/app/login'], { queryParams: { dialog: true }});
          return true;
        }
      }
    );
  }
}