import _ from 'lodash';

import { Injectable, Inject } from '@angular/core';
import { AppStateService } from '@fino/ng2-common';

const HeaderMatching = {
   'userid' : 'X-Fino-UserID',
   'hash' : 'X-Fino-Hash',
   'timestamp' : 'X-Fino-Timestamp'
};

export const StateKeys = {
  Contracts: 'contracts',
  Bookings: 'bookings',
  Summary: 'summary',
  Accounts: 'accounts',
  OnboardingContracts: 'onboardingContracts'
};

const RefreshDataClearKeys = [
  StateKeys.OnboardingContracts,
  StateKeys.Contracts,
  StateKeys.Bookings,
  StateKeys.Summary,
  StateKeys.Accounts
];

const AllClearKeys = [
  'user', 
  'bank', 
  'requestHeaders', 
  StateKeys.Contracts,
  StateKeys.Bookings,
  StateKeys.Summary,
  StateKeys.Accounts,
  StateKeys.OnboardingContracts
];

@Injectable()
export class CustomAppStateService {
  set user(value) {
    this.appState.user = value;
  }

  get user() {
    return this.appState.user;
  }

  set bank(value) {
    this.appState.set('bank', value);
  }

  get bank() {
    return this.appState.get('bank');
  }

  get contracts() {
    return this.appState.get(StateKeys.Contracts);
  }

  get onboardingContracts() {
    return this.appState.get(StateKeys.OnboardingContracts);
  }

  get bookings() {
    return this.appState.get(StateKeys.Bookings);
  }

  get accounts() {
    return this.appState.get(StateKeys.Accounts);
  }

  get summary() {
    return this.appState.get(StateKeys.Summary);
  }

  get contractKeys() {
    return this.contracts && this.contracts.length && _.keys(this.contracts[0]) || [];
  }

  set requestHeaders(value) {
    this.appState.requestHeaders = value;
  }

  get requestHeaders() {
    return this.appState.requestHeaders;
  }

  get hasAppHeaders() {
    return this.appState.hasAppHeaders;
  }

  constructor(@Inject(AppStateService) appState) {
    this.appState = appState;
  }

  setAppHeaders(params) {
    this.appState.setAppHeaders(params, HeaderMatching);
  }

  clear() {
    this.appState.clear(AllClearKeys);
  }

  clearforRefresh() {
    this.appState.clear(RefreshDataClearKeys);
  }

  findContractById(id) {
    return _.find(this.contracts, cp => cp.id == id);
  }

  updateContract(id, data) {
    let cp = this.findContractById(id);
    _.assign(cp, data);
    this.appState.set(StateKeys.Contracts, this.contracts);
  }

  deleteContracts(ids) {
    _.remove(this.contracts, cp => _.includes(ids, cp.id));
    this.appState.set(StateKeys.Contracts, this.contracts);
  }

  updateUser(values) {
    this.user = _.merge({}, this.user, values);
  }
}