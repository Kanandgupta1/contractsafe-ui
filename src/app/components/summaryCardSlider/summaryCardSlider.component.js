import { ViewEncapsulation } from '@angular/core';
import { ExtendedComponent } from '@fino/ng2-common';

import template from './summaryCardSlider.html';
import styles from './summaryCardSlider.scss';

@ExtendedComponent({
  inputs: ['summaries'],
  selector: 'summary-card-slider',
  template,
  styles: [styles],
  encapsulation: ViewEncapsulation.None
})
export class SummaryCardSliderComponent {
  constructor() {
    this.swipeOptions = {
      slidesPerView: 1.2,
      loop: false,
      pagination: '.slider-bullets'
    };
  }

  ngOnInit() {
  }
};