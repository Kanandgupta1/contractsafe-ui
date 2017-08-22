import { Component, Inject } from '@angular/core';
import { AppStateService } from '@fino/ng2-common';
import { InjectableClass } from '@fino/lib-injection';

import template from './error.html';

export const ErrorSelector = 'error';

@Component({
  selector: ErrorSelector,
  template
})
export class ErrorComponent extends InjectableClass {
  get returnTo() {
    if (this.appState.hasAppHeaders) {
      return ['/']
    }
    return ['/app/login'];
  }

  constructor(@Inject(AppStateService) appState) {
    super({appState});
  }
};