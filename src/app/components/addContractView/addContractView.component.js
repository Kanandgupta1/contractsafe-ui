import { Observable } from 'rxjs';
import { Inject, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { InjectableClass } from '@fino/lib-injection';

import { ExtendedComponent } from '@fino/ng2-common';
import { ContractService } from '../../common/services/contract.service';
import { FormularService } from '../../common/services/formular.service';

import template from './addContractView.html';
import style from './addContractView.scss';

@ExtendedComponent({
  inputs: ['addBusy'],
  selector: 'add-contract-view',
  template,
  styles: [style]
})
export class AddContractViewComponent extends InjectableClass {
  @Output() contractSubmit = new EventEmitter();

  get formGroups() {
    return this.formularService.DefaultFields.AddContract;
  }
  
  constructor(
    @Inject(ContractService) contractService,
    @Inject(FormularService) formularService,
    @Inject(FormBuilder) formBuilder
  ) {
    super({ contractService, formularService });

    this.form = formBuilder.group({
      'search': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.filteredOptions = this.form.controls.search.valueChanges
      .flatMap(search => {
        if (this.selectedPartner || !search) {
          return Observable.of([]);
        }
        
        return this.contractService.searchCreditors(search);
      });
  }

  select(partner) {
    this.selectedPartner = partner;
  }

  submitContract(contract) {
    this.contractSubmit.emit(contract);
  }
};