import { ContentChild } from '@angular/core';
import { ExtendedComponent } from '@fino/ng2-common';

import template from './summaryCard.html';
import styles from './summaryCard.scss';

const IconMapping = {
  'communication': 'fa-comment-o',
  'insurance': 'fa-shield',
  'abonnements': 'fa-book',
  'energy': 'fa-lightbulb-o'
};

@ExtendedComponent({
  inputs: ['summary', 'plainName', 'hideIcon'],
  selector: 'summary-card',
  template,
  styles: [styles]
})
export class SummaryCardComponent {
  get icon() {
    return this.summary && IconMapping[this.summary.name];
  }

  constructor() {
  }

  ngOnInit() {
  }
};