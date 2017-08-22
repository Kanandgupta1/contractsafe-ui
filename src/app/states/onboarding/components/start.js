import { Component } from '@angular/core';
import template from './start.html';

@Component({
  selector: 'onboarding-start',
  template,
  inputs: ['config']
})
export class StartComponent {};