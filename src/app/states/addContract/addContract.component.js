import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { InjectableClass } from '@fino/lib-injection';
import { AppStateService, LanguageService } from '@fino/ng2-common';

import { ExtendedComponent } from '@fino/ng2-common';
import { AccountService } from '../../common/services/account.service';
import { ContractModel } from '../../common/models/contract.model';

import template from './addContract.html';

export const AddContractSelector = 'add-contract';

@ExtendedComponent({
  selector: AddContractSelector,
  template
})
export class AddContractComponent extends InjectableClass {
  constructor(
    @Inject(Router) router,
    @Inject(AccountService) accountService,
    @Inject(LanguageService) languageService) {
    super({ router, accountService, languageService });
  }

  ngOnInit() {
  }

  addContract(contract) {
    this.saveBusy = true;
    contract.product.amount = contract.product.amount.toString().replace(',','.');
    this.accountService.addContract(ContractModel.createNew(contract)).subscribe(() => this.contractAdded());
  }

  contractAdded() {
    this.saveBusy = false;
    this.router.navigate(['app/list']);
  }
};