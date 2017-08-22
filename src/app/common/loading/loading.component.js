import _ from 'lodash';
import { Component, Inject } from '@angular/core';
import  {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { InjectableClass } from '@fino/lib-injection';
import { LoadingService } from '@fino/ng2-common';

import template from './loading.html';
import styles from './loading.scss';

@Component({
  inputs: [],
  selector: 'loading',
  template,
  styles: [styles],
  animations: [
    trigger('loadingState', [
      state('*', style({top: '-110%', opacity: 0})),
      state('loading', style({top: '0'})),
      transition('* <=> loading', [
        animate('0.2s')
      ])
    ])
  ]
})
export class LoadingComponent extends InjectableClass {
  get loadingState() {
    return this.isLoading ? 'loading' : '*';
  }

  constructor(@Inject(LoadingService) loadingService) {
    super({ loadingService });
    
    this.loadingService.onLoading.subscribe(this.loading.bind(this));
  }

  loading(isLoading) {
    if (this.isLoading == isLoading) {
      return;
    }

    this.isLoading = isLoading;
    //_.debounce(() => this.show = isLoading, isLoading ? 0 : 300)();
  }
};