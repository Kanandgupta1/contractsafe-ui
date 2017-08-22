import _ from 'lodash';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InjectableClass } from '@fino/lib-injection';

import template from './documents.html';

import { CustomAppStateService } from '../../common/services/appState.service';
import { AccountService } from '../../common/services/account.service';

export const DocumentsSelector = 'documents';

@Component({
  selector: DocumentsSelector,
  template
})
export class DocumentsComponent extends InjectableClass {
  constructor(
    @Inject(CustomAppStateService) state,
    @Inject(ActivatedRoute) route,
    @Inject(AccountService) accountService) {
    super({ state, route, accountService });
  }

  ngOnInit() {
    this.id = this.route.params.value.id;
    this.contract = this.state.findContractById(this.id);
    this.documentIds = this.contract.documentids || [];
  }

  documentsChanged(documents) {
    this.documentIds = _.map(documents, d => {
      return d.id || d;
    });
    // TODO Clean up naming chaos (extract naming to models, for better maintainability)
    this.state.updateContract(this.id, {
      documentids: this.documentIds
    });
  }
};