import _ from 'lodash';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppStateService } from '@fino/ng2-common';

import { StateKeys } from '../../common/services/appState.service';

@Injectable()
export class DetailGuard extends InjectableClass {
  constructor(
    @Inject(Http) http, 
    @Inject(AppStateService) appState) {
    super({ http, appState });
  }

  canActivate(route, state) {
    return !!(route.params.id && this.validContract(route.params.id));
  }

  validContract(id) {
    return _.some(this.appState.get(StateKeys.Contracts), cp => cp.id == id);
  }
}