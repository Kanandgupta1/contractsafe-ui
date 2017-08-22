import _ from 'lodash';

import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InjectableClass } from '@fino/lib-injection';
import { ExtendedComponent, LanguageService } from '@fino/ng2-common';

import { CustomAppStateService } from '../../common/services/appState.service';
import { AccountService } from '../../common/services/account.service';
import { ContractService } from '../../common/services/contract.service';
import { FormularService } from '../../common/services/formular.service';
import { NavigationService } from '../../common/services/navigation.service';
import PeerGroupAnalysis from '../../common/constants/peerGroup.constants';

import template from 'states/detail/detail.html';
import style from './detail.scss';

export const DetailSelector = 'detail';

@ExtendedComponent({
  selector: DetailSelector,
  template,
  styles: [style],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent extends InjectableClass {
  expanded = false;

  get incomplete() {
    return this.contract.completed < 100;
  }

  get category() {
    return this.contract.general && this.contract.general.category;
  }

  get subcategory() {
    return this.contract.general && this.contract.general.subcategory;
  }

  get amount() {
    return this.contract.product && this.contract.product.amount;
  }

  get peerGroupValue() {
    return PeerGroupAnalysis[this.subcategory];
  }

  get bookingHistoryChart() {
    return _.reverse(_.take(this.summedBookings, 6));
  }

  get bookingHistory() {
    return this.details.bookingHistory;
  }

  get summedBookings() {
    return this.details.summedBookings;
  }

  get formGroups() {
    return this.formularService.DefaultFields.ContractDetails;
  }

  get canCompare() {
    return this.peerGroupValue > -1 && this.amount;
  }

  constructor(
    @Inject(CustomAppStateService) state, 
    @Inject(ActivatedRoute) route,
    @Inject(LanguageService) languageService,
    @Inject(AccountService) accountService,
    @Inject(FormularService) formularService,
    @Inject(NavigationService) navigation) {
      super({ state, route, languageService, accountService, formularService, navigation });
  }

  ngOnInit() {
    this.id = this.route.params.value.id;
    this.contract = this.state.findContractById(this.id);
    this.details = this.route.snapshot.data.details;

    if (this.contract.categories && !_.includes(this.contract.categories, this.category)) {
      const category = this.contract.categories[0];
      let general = {category};
      if (this.category) {
        general.subcategory = this.category;
      }
      this.contract.general = this.contract.general ? _.merge({}, this.contract.general, general) : general;
    }
  }

  saveDetails(contract) {
    this.saveBusy = true;
    this.accountService.putDetails(contract.id, contract)
      .finally(() => this.afterSave())
      .subscribe();
  }

  afterSave() {
    this.contract.completed = this.formularService.calculateContractDetailsCompleted(this.contract);
    _.debounce(() => this.saveBusy = false, 300)();
  }

  deleteContract() {
    this.dialogOpen = false;
    this.accountService
      .deleteContracts([this.id])
      .subscribe(() => this.deleted());
  }

  deleted() {
    this.navigation.navigateToList();
  }
};