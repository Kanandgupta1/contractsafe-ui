import _ from 'lodash';

import { Inject, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ExtendedComponent } from '@fino/ng2-common';
import { InjectableClass } from '@fino/lib-injection';

import { BankService } from '../../common/services/bank.service';
import template from './bankSelection.html';
import styles from './bankSelection.scss';

@ExtendedComponent({
  inputs: ['type'],
  selector: 'bank-selection',
  template,
  styles: [styles],
  encapsulation: ViewEncapsulation.None
})
export class BankSelectionComponent extends InjectableClass {
  @Output() onSearch = new EventEmitter();
  @Output() onSelect = new EventEmitter();

  get banksFound() {
    return !!(this.banks && this.banks.length);
  }

  constructor(
    @Inject(BankService) service
  ) {
    super({ service });
  }

  ngOnInit() {
    this.searchTerm = '';
    this.debouncedSearch = _.debounce(this.search.bind(this), 300);
  }

  // TODO Warp in form and do form.valid call
  enter() {
    if (this.searchTerm.length === 8) {
      this.onSelect.emit({ legacyBankIdentifier : this.searchTerm});
    }
  }

  search() {
    if (this.searchTerm) {
      return this.service.search(this.searchTerm)
        .subscribe((banks) => {
          this.setBanks(banks);
        });
    }
    this.setBanks([]);
  }

  setBanks(banks) {
    this.banks = banks;

    if (this.onSearch) {
      this.onSearch.emit(this.banksFound);
    }
  }

  selectBank(bank){
    if (this.onSelect) {
      this.onSelect.emit(bank);
    }
  } 
};