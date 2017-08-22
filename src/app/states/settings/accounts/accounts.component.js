import _ from 'lodash';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InjectableClass } from '@fino/lib-injection';

import { AccountService } from '../../../common/services/account.service';

import template from './accounts.html';

export const AccountsSelector = 'accounts';

@Component({
  selector: AccountsSelector,
  template
})
export class AccountsComponent extends InjectableClass {
  get closeChoices() {
    return {
      removeContracts: 'removeContracts',
      keepContracts: 'keepContracts'
    };
  }

  get closeChoiceValues() {
    return _.values(this.closeChoices);
  }

  constructor(
    @Inject(ActivatedRoute) route,
    @Inject(AccountService) accountService) {
    super({ route, accountService });
  }

  ngOnInit() {
    this.accounts = this.route.snapshot.data.accounts;
  }

  triggerDeleteAccountDialog(account) {
    this.dialogOpen = true;
    this.triggeredAccount = account;
  }

  deleteAccount(confirmChoice) {
    const { triggeredAccount, accountService } = this;

    triggeredAccount.deleteBusy = true;
    accountService.deleteAccount(triggeredAccount.account_id)
      .finally(() => {
        triggeredAccount.deleteBusy = false;
        this.dialogOpen = false;
      })
      .subscribe(() => {
        const index = _.indexOf(this.accounts, triggeredAccount);
        this.accounts.splice(index, 1);
      });
  }
};