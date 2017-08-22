import _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpService } from '@fino/ng2-common';

import { CustomAppStateService } from './common/services/appState.service';
import { NavigationService } from './common/services/navigation.service';

import Environment from '../shared/environment';

@Injectable()
export class AppGuard extends InjectableClass {
  constructor(
    @Inject(HttpService) http, 
    @Inject(Router) router, 
    @Inject(CustomAppStateService) appState, 
    @Inject(NavigationService) navigation,
    @Inject(Window) window) {
    super({ http, router, appState, navigation });
  }

  canActivate(route, state) {
    if (this.isAppPending(state)) {
      return false;
    }
    const { url } = state;
    return this.registerSession(route, url);
  }

  canActivateChild(route, state) {
    if (this.isAppPending(state)) {
      return false;
    }
    return this.isNavigateable(route, state);
  }

  isAppPending(state) {
    // Avoid state checking for pending state itself, otherwise circular calls
    const pendingIsTarget = state.url.includes('/app/pending');

    // Navigate to pending state when the app is in pending mode
    if (Environment.pending && !pendingIsTarget) {
      this.navigation.navigateToPending();
      return true;
    }

    // Redirect away from pending to root for non-pending app (vice versa check)
    if (!Environment.pending && pendingIsTarget) {
      this.navigation.navigateTo('/');
      return false;
    }

    return false;
  }

  isNavigateable(route, state) {
    const { url } = state;
    // If the route to navigate is open, do not check anything
    if (this.navigation.urlIsOpen(url)) {
      return true;
    }

    // If it is protected, redirect to the error page 
    // when headers and or user information is missing
    const { hasAppHeaders, user } = this.appState;
    if (!hasAppHeaders || !user) {
      this.navigateWhenFailing();
      return false;
    }

    // Check the user if he is already onboarded
    // Return false if a redirect must be performed
    return this.checkUser(route, url, user);
  }

  validParams(params) {
    if (params && params.userid && params.hash) {
      return params;
    }
    return false;
  }

  registerSession(route, url) {
    return new Observable(observer => {
      const params = this.validParams(route.queryParams) || this.validParams(route.params);
      // If there are no parameters (hash, userid, timestamp)
      // the session cant be registered. Redirect to error page.
      if (params) {
        this.appState.setAppHeaders(params);
      }

      // If there are no app headers at this point, something is wrong
      const { hasAppHeaders } = this.appState;
      if (!hasAppHeaders) {
        return this.sessionRegisterFailed(observer);
      }

      // Create the session using the app headers (http service does that internally)
      return this.http.post('/api/v0/user/registersession', null, { silent : true })
        .execute()
        .subscribe(
          this.sessionRegistered(route, observer, url),
          this.sessionRegisterFailedResponse(observer)
        );
    });
  }

  sessionRegistered(route, observer, url) {
    return (resp) => {
      const canContinue = this.checkUser(route, url, resp);
      return observer.next(canContinue);
    }
  }

  sessionRegisterFailedResponse(observer) {
    return (error) => {
      this.sessionRegisterFailed(observer)
    }
  }

  sessionRegisterFailed(observer) {
    observer.next(false);
    this.navigateWhenFailing();
  }

  navigateWhenFailing() {
    if (!this.appState.hasAppHeaders) {
      return this.navigation.navigateToLogin();
    }
    this.navigation.navigateToError();
  }

  checkUser(route, url, user) {
    this.appState.user = user;
    // If the user exists, check if a redirect should be performed
    // Return false if so
    if (user && user.userexist) {
      return this.checkForRedirect(route);
    }
    // If the user does not exists, redirect to onboarding
    return this.userDoesNotExist(route, url);
  }

  userDoesNotExist(route, url) {
    // If the user already is in onboarding process, let him continue
    if (this.navigation.urlIsInOnboarding(url)) {
      return true;
    }

    // Otherwise redirect to the onboarding start
    this.navigation.navigateToOnboarding();
    return false;
  }

  checkForRedirect(route) {
    if (!route.data || !route.data.redirectTo) {
      return true;
    }
    this.router.navigate([route.data.redirectTo]);
    return false;
  }
}