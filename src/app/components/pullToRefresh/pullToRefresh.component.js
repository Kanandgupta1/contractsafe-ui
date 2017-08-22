import { Component, Inject, ElementRef, Output, HostListener, EventEmitter, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { InjectableClass } from '@fino/lib-injection';
import { ExtendedComponent } from '@fino/ng2-common';

import template from './pullToRefresh.html';

@ExtendedComponent({
  inputs: [],
  selector: 'pull-to-refresh',
  template,
  queries: {
    scrollContainer: new ViewChild('scrollContainer')
  }
})
export class PullToRefreshComponent extends InjectableClass {
    @Output() pull = new EventEmitter();

    constructor(
      @Inject(ElementRef) element,
      @Inject(Router) router) {
      super({ element, router });

      router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd) || !this.scrollContainer.nativeElement) {
          return;
        }
        this.scrollContainer.nativeElement.scrollTop = 0;
      });
    }
};