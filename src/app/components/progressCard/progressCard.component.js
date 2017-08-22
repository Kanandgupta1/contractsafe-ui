import { Component, ViewEncapsulation } from '@angular/core';

import template from './progressCard.html';
import styles from './progressCard.scss';

@Component({
  inputs: ['progress', 'header', 'subheader', 'icon'],
  selector: 'progress-card',
  template,
  styles: [styles],
  encapsulation: ViewEncapsulation.None
})
export class ProgressCardComponent {
  constructor() {
  }

  ngOnInit() {
  }
};