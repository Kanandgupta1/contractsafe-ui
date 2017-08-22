import { ViewEncapsulation } from '@angular/core';
import { ExtendedComponent } from '@fino/ng2-common';

import template from './login.html';

@ExtendedComponent({
  selector: 'onboarding-login',
  template,
  inputs: ['config'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  get showCheckbox() {
    return this.options.parent.loginModel
      && this.options.parent.loginModel.credentials
      && this.options.parent.loginModel.credentials['0']
      && this.options.parent.loginModel.credentials['1'];
  }
};