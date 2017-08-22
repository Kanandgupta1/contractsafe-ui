import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { InjectableClass } from '@fino/lib-injection';

import { CustomAppStateService } from '../../common/services/appState.service';
import { AccountService } from '../../common/services/account.service';

import { LoginService } from './login.service';
import template from 'states/login/login.html';

export const LoginSelector = 'login';

@Component({
  selector: LoginSelector,
  template
})
export class LoginComponent extends InjectableClass {
  constructor(
    @Inject(LoginService) loginService, 
    @Inject(Router) router,
    @Inject(ActivatedRoute) route,
    @Inject(AccountService) accountService,
    @Inject(CustomAppStateService) appState
  ) {
    super({ loginService, router, route, accountService, appState });

    this.loginForm = new FormGroup({});
    this.loginModel = {};
  }

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      if (p.dialog) {
        this.dialogOpen = true;
        // remove dialog query param
        // to trigger the dialog again after incorrect login
        this.router.navigate(['/app/login']);
      }
    });
  }

  login($event) {
    $event.preventDefault();
    const data = {
      login: this.loginModel.credentials[0],
      password: this.loginModel.credentials[1]
    };
    this.loginBusy = true;
    this.loginService.login(data)
      .catch(() => {
        this.loginBusy = false;
      })
      .subscribe(
        (user) => {
          const { userid, hash, timestamp } = user;
          this.router.navigate(['/'], { queryParams: { userid, hash, timestamp }});
        }
      );
  }

  improvedRecognization(choice) {
    this.accountService
      .refresh()
      .subscribe(() => {
        this.dialogOpen = false;
        if (choice === 'onboarding') {
          return this.router.navigate(['/app/onboarding/list']);
        }
        this.router.navigate(['/']);
      });
  }
};