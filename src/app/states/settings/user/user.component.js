import { Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InjectableClass } from '@fino/lib-injection';
import { LanguageService } from '@fino/ng2-common';

import { ExtendedComponent } from '@fino/ng2-common';
import { AccountService } from '../../../common/services/account.service';
import { FormularService } from '../../../common/services/formular.service';

import template from './user.html';

export const UserSelector = 'user';

@ExtendedComponent({
  selector: UserSelector,
  template
})
export class UserComponent extends InjectableClass {
  get formGroups() {
    return this.formularService.DefaultFields.User;
  }

  constructor(
    @Inject(ActivatedRoute) route,
    @Inject(AccountService) accountService,
    @Inject(LanguageService) languageService,
    @Inject(FormularService) formularService
  ) {
    super({ route, accountService, languageService, formularService });
  }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
  }

  saveUser(user) {
    this.saveBusy = true;
    this.accountService.putPersonalInformation(user)
      .subscribe(() => {
        this.saveBusy = false;
      });
  }
};