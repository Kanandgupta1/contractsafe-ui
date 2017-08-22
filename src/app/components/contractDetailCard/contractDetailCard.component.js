import { Inject, Output, EventEmitter } from '@angular/core';
import { ExtendedComponent } from '@fino/ng2-common';
import { InjectableClass } from '@fino/lib-injection';

import { AccountService } from '../../common/services/account.service';
import { FormularService } from '../../common/services/formular.service';

import template from './contractDetailCard.html';
import styles from './contractDetailCard.scss';

@ExtendedComponent({
  inputs: ['detail', 'contract'],
  selector: 'contract-detail-card',
  template,
  styles: [styles]
})
export class ContractDetailCardComponent extends InjectableClass {
  @Output() detailChange = new EventEmitter();
  @Output() detailSave = new EventEmitter();
  
  get detailAppendix() {
    return this.confirmField ? '.confirm' : '.new';
  }

  constructor(
    @Inject(AccountService) accountService,
    @Inject(FormularService ) formularService
  ) {
    super({ accountService, formularService });
    this.formValue = {};
  }

  ngOnInit() {
    this.submitContract = {};
    this.contractDetailField = this.formularService.getContractDetailField(this.detail);
    this.confirmField = !!_.get(this.contract, this.detail);
  }

  skipDetails() {
    this.next(false);
  }

  submitDetails() {
    this.submitBusy = true;
    return this.next();
  }

  swipeLeft() {
    this.skipDetails();
  }

  swipeRight(revert) {
    this.revert = revert;
    this.submitDetails();
  }

  next(save = true) {
    let { contract, detail, formValue } = this;
    const { id } = contract;

    const details = contract.details ? contract.details.concat([detail]) : [detail];
    if (!save) {
      return this.detailChange.emit({ id, details });
    }
    
    const data = _.merge(formValue, { id, details });
    this.accountService.putDetails(contract.id, _.merge({}, contract, data), false)
      .finally(() => this.afterSave())
      .catch(() => this.failedSave())
      .subscribe(() => this.detailSave.emit(data));
  }

  failedSave() {
    if (this.revert) {
      this.revert();
      this.revert = null;
    }
  }

  afterSave() {
    this.submitBusy = false;
  }
};