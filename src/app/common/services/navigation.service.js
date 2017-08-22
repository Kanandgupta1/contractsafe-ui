import _ from 'lodash';
import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { InjectableClass } from '@fino/lib-injection';

export class NavigationService extends InjectableClass {
  get OpenRoutes() {
    return [
      this.LoginRoute,
      this.ErrorRoute,
      this.PublicRoute,
      this.PendingRoute,
      this.DeletedRoute,
      this.OnboardingPrefix
    ];
  }

  get OnboardingPrefix() {
    return '/app/onboarding';
  }

  get LoginRoute() {
    return '/app/login';
  }

  get ListRoute() {
    return '/app/list';
  }

  get ErrorRoute() {
    return '/app/error';
  }

  get PendingRoute() {
    return '/app/pending';
  }

  get PublicRoute() {
    return '/app/settings/public';
  }

  get DeletedRoute() {
    return '/app/deleted';
  }

  constructor(@Inject(Router) router) {
    super({ router });
  }

  navigateTo(route) {
    return this.router.navigate([this[route] || route]);
  }

  navigateToStart() {
    return this.router.navigate(['/']);
  }

  navigateToList() {
    return this.router.navigate([this.ListRoute]);
  }

  navigateToLogin() {
    return this.router.navigate([this.LoginRoute]);
  }

  navigateToError() {
    return this.router.navigate([this.ErrorRoute]);
  }

  navigateToPending() {
    return this.router.navigate([this.PendingRoute]);
  }

  navigateToOnboarding(state = 'start') {
    return this.router.navigate([`${this.OnboardingPrefix}/${state}`]);
  }

  urlIsInOnboarding(url) {
    return _.includes(url, this.OnboardingPrefix);
  }

  urlMatchesRoute(url, route) {
    return _.startsWith(url, route);
  }

  urlIsOpen(url) {
    return _.some(this.OpenRoutes, route => this.urlMatchesRoute(url, route));
  }
}