import { Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InjectableClass } from '@fino/lib-injection';

import { 
  ExtendedComponent,
  AppStateService 
} from '@fino/ng2-common';

import template from './contractDetailCompletion.html';

export const ContractDetailCompletionSelector = 'contract-detail-completion';

@ExtendedComponent({
  selector: ContractDetailCompletionSelector,
  template
})
export class ContractDetailCompletionComponent extends InjectableClass {
  constructor(
    @Inject(ActivatedRoute) route,
    @Inject(AppStateService) appState) {
    super({ route, appState });
  }

  ngOnInit() {
    this.contracts = this.route.snapshot.data.contracts;
  }

  updateContract(updates) {
    if (updates) {
      let contract = _.find(this.contracts, c => c.id === updates.id);
      _.merge(contract, updates);
      this.contracts = this.contracts.slice();
    }
  }
};