import { Observable } from 'rxjs';
import { ViewEncapsulation, Inject, Component } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Ng2DeviceService } from 'ng2-device-detector';

import { InjectableClass } from '@fino/lib-injection'
import { Window } from '@fino/ng2-common';
import { ExtendedComponent, NotifyService, LoadingService } from '@fino/ng2-common';

import { AccountService } from './common/services/account.service';
import { CustomAppStateService } from './common/services/appState.service';

import template from './app.html';

export const AppSelector = 'app';

@ExtendedComponent({
  selector: AppSelector,
  template,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends InjectableClass {
  constructor(
    @Inject(AccountService) accountService,
    @Inject(CustomAppStateService) appState,
    @Inject(NotifyService) notifyService,
    @Inject(LoadingService) loadingService,
    @Inject(NotificationsService) notifier,
    @Inject(Ng2DeviceService) device,
    @Inject(Window) window
  ) {
    super({ accountService, device, appState, window, loadingService });

    notifyService.onNotify.subscribe(notification => {
      const { type, title, content } = notification;
      if (type && notifier[type]) {
        notifier[type](title, content);
      }
    });
  }

  ngOnInit() {
    this.loadingService.activate();
  }

  pull(reset) {
    this.accountService.refresh()
    .catch((err) => {
      reset();
      return Observable.throw(err);
    })
    .subscribe(() => {
      this.appState.clearforRefresh();
      this.window.location.reload();
    });
  }
};