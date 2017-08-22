import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BaseResolve } from '@fino/ng2-common';
import { AppStateService } from '@fino/ng2-common';

import { AccountService } from '../../../common/services/account.service';
import { StateKeys } from '../../../common/services/appState.service';

@Injectable()
export class BookingsResolve extends BaseResolve {
  static get parameters() {
    return [[AccountService], [AppStateService], [Router]];
  }

  constructor(AccountService, AppStateService, Router) {
    super(Router, null, AppStateService);

    this.accountService = AccountService;
  }

  resolve(route) {
    return super.resolve(() => this.accountService.fetchBookings(), StateKeys.Bookings);
  }
}
