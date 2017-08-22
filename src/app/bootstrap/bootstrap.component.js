import { Component, Inject } from '@angular/core';
import { TransitionService } from '@fino/ng2-common';

@Component({
  selector: 'bootstrap',
  template: `
    <loading></loading>
    <simple-notifications [options]="notificationOptions"></simple-notifications>
    <div *ngIf="!initialized">
      <div class="app-loading">
        <div class="messaging">
          <div class="loading-content">
            <div class="hero"></div>
          </div>
          <div class="loading-bottom">
              <span class="bottom-text">powered by</span>
              <div class="logo-fino"></div>
          </div>
        </div>
      </div>
    </div>
    <router-outlet></router-outlet>
    `
})
export class BootstrapComponent {
  constructor(
    @Inject(TransitionService) transitionService
  ) {
    this.notificationOptions = {
        timeOut: 5000,
        lastOnBottom: false,
        clickToClose: true,
        maxLength: 0,
        maxStack: 7,
        showProgressBar: false,
        pauseOnHover: true,
        preventDuplicates: false,
        preventLastDuplicates: 'visible',
        rtl: false,
        animate: 'fromRight',
        position: ['right', 'top']
    };

    transitionService
      .listenForStateInitialization()
      .subscribe((r) => {
        this.initialized = true;
      })
  }
};