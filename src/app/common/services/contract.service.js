import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';

import { HttpService } from '@fino/ng2-common';

export class ContractService extends InjectableClass {
  constructor(@Inject(HttpService) http) {
    super({ http });
  }

  searchCreditors(term) {
    return this.http
      .get(`/api/v0/creditors?q=${term}`, { silent: true })
      .execute();
  }
}