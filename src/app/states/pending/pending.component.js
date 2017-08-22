import { Inject } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';

import { ExtendedComponent } from '@fino/ng2-common';
import { AppStateService } from '@fino/ng2-common';

import template from './pending.html';

export const PendingSelector = 'pending';

@ExtendedComponent({
  selector: PendingSelector,
  template
})
export class PendingComponent extends InjectableClass {
  constructor(
    @Inject(AppStateService) appState) {
    super({ appState });
  }

  ngOnInit() {
  }
};