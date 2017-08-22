import _ from 'lodash';

import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InjectableClass } from '@fino/lib-injection';
import { LocalizationPipe, PipeTypes } from '@fino/ng2-common';

// TODO Inject constants, did not find a way without TS
import { MenuDetailTypes } from './list.constants';
import { ComponentMapping } from './components/components';

import { AccountService } from '../../common/services/account.service';
import { ContractModel } from '../../common/models/contract.model';

import template from 'states/list/list.html';
import styles from './list.scss';

export const ListSelector = 'list';

@Component({
  selector: ListSelector,
  template,
  styles: [styles],
  providers: [LocalizationPipe]
})
export class ListComponent extends InjectableClass {
  get contracts() {
    return _.filter(this.allContracts, c => !c.deleted);
  }

  get heroEmotion() {
    const markedToDelete = _.some(this.contracts, cp => cp.markedToDelete);
    return markedToDelete ? 'shocked' : null;
  }

  get menuDetails() {
    return ComponentMapping;
  }

  get summedCosts() {
    return this.localizationPipe.transform(_.sumBy(this.contracts, cp => cp.amount) * -1, PipeTypes.Currency);
  }

  get contractGroups() {
    return [{
      title: 'active',
      contracts: _.filter(this.contracts, c => c.active && !c.ended)
    }, {
      title: 'ended',
      contracts: _.filter(this.contracts, c => !c.active || c.ended)
    }];
  }

  get detailsIncompleteCount() {
    return this.allContracts &&  _.filter(this.allContracts, c => c.detailsIncomplete.length).length;
  }

  constructor(
    @Inject(ActivatedRoute) route,
    @Inject(AccountService) accountService,
    @Inject(LocalizationPipe) localizationPipe) {
    super({ route, accountService, localizationPipe });
  }

  ngOnInit() {
    // Get resolved data
    // TODO Write base data resolver
    this.allContracts = this.route.snapshot.data.contracts;
    this.detailContext = {
      search: '',
      sort: ''
    };
  }

  filterDetail() {
    this.detail(MenuDetailTypes.Filter);
  }

  sortDetail(event) {
    this.detail(MenuDetailTypes.Sort);
  }

  detail(detail) {
    if (this.currentDetail === detail) {
      return this.currentDetail = null;
    }
    this.currentDetail = detail;
  }

  // TODO Generalize busy handling
  delete(contract) {
    this.deleteBusy = true;
    this.accountService
      .deleteContracts([contract.id], true)
      .finally(() => this.deleteCompleted())
      .subscribe(() => contract.deleted = true);
  }

  deleteCompleted() {
    _.debounce(() => this.deleteBusy = false, 300)();
  }

  addContract(contract) {
    const newContract = ContractModel.createNew(contract);
    this.saveBusy = true;
    this.accountService.addContract(newContract).subscribe((resp) => this.contractAdded(newContract, resp));
  }

  close() {
    this.addContractViewDialogRef.close();
  }

  contractAdded(contract, resp) {
    contract.id = resp.id;
    this.saveBusy = false;
    this.addContractViewDialogRef.close();
    this.allContracts.push(contract);
  }

  openAddContractDialog() {
    this.addContractViewDialogRef = this.addContractViewDialog.open();
  }

  trackByFn(index, item) {
    return item.id;
  }
};