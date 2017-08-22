import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { InjectableClass } from '@fino/lib-injection';

import template from './overview.html';

import { AccountService } from '../../../common/services/account.service';

export const OverviewSelector = 'overview';

const SettingRoutes = {
  'user': '../user',
  'accounts': '../accounts',
  'faq': '../public/faq',
  'privacy': '../public/privacy',
  'agb': '../public/agb'
};

@Component({
  selector: OverviewSelector,
  template,
  encapsulation: ViewEncapsulation.None,
  queries: {
    dialogTemplate: new ViewChild('dialogTemplate')
  }
})
export class OverviewComponent extends InjectableClass {
  get routes() {
    return _.keys(SettingRoutes);
  }

  constructor(
    @Inject(AccountService) accountService,
    @Inject(Router) router,
    @Inject(MdDialog) dialog) {
    super({ accountService, router, dialog });
  }

  getLink(route) {
    return [SettingRoutes[route]];
  }

  openDialog() {
    this.dialogOpen = true;
  }

  deleteAccount() {
    this.dialogOpen = false;
    this.accountService.delete()
      .subscribe(() => {
        this.router.navigate(['app/deleted']);
      });
  }
};