import _ from 'lodash';
import { Inject, Component, ViewEncapsulation } from '@angular/core';

import { AccountService } from '../../../common/services/account.service';

import template from './list.html';

@Component({
  selector: 'onboarding-list',
  template,
  inputs: ['config'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent {
  get translationKey() {
    return this.options && this.options.translationKey || '';
  }

  get contractGroups() {
    return _.groupBy(this.options.parent.visibleContracts, 'name');
  }

  getContracts() {
    return _.reduce(this.contractGroups, (acc, val, key) => {
      // If there are more contracts with the same name
      // list them under a header without logo
      if (val.length > 1) {
        const { contact, name } = val[0];
        acc.push({ contact, name, header: true });
        _.each(val, c => c.multiple = true)
      }
      _.last(val).last = true;
      acc = acc.concat(val);
      return acc;
    }, []);
  }

  constructor(@Inject(AccountService) accountService) {
    this.accountService = accountService;
  }

  ngOnInit() {
    this.contracts = this.getContracts();
  }

  contractHasTransactions(contract) {
    return contract.transactions && contract.transactions.length;
  }

  fetchLastBookingDate(contract) {
    const sorted = _.sortBy(contract.transactions, b => new Date(b.bookingdate));
    const last = _.last(sorted);
    return last && new Date(last.bookingdate);
  }
};