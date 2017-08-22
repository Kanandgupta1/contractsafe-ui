import { Component, ViewEncapsulation } from '@angular/core';
import template from './loading.html';

@Component({
  selector: 'onboarding-loading',
  template,
  inputs: ['config'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingComponent {
  constructor() {

  }
};