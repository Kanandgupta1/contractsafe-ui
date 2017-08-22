import { Inject } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';

import { ExtendedComponent } from '@fino/ng2-common';
import { AppStateService } from '@fino/ng2-common';

import template from './<%= lowerCaseName %>.html';

export const <%= upperCaseName %>Selector = '<%= kebabName %>';

@ExtendedComponent({
  selector: <%= upperCaseName %>Selector,
  template
})
export class <%= upperCaseName %>Component extends InjectableClass {
  constructor(
    @Inject(AppStateService) appState) {
    super({ appState });
  }

  ngOnInit() {
  }
};