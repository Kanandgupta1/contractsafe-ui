import { OnInit, Inject, Output, EventEmitter, ViewEncapsulation, ContentChild, ElementRef, ViewChild } from '@angular/core';
import { ExtendedComponent } from '@fino/ng2-common';

import template from './slider.html';
import styles from './slider.scss';

@ExtendedComponent({
  inputs: ['swipes', 'swiper'],
  selector: 'slider',
  template,
  styles: [styles],
  queries: {
    swipeTemplate: new ContentChild('swipeTemplate'),
    swiperElement: new ViewChild('swiperElement')
  }
})
export class SliderComponent {
  @Output() swiperChange = new EventEmitter();

  constructor() {
    this.swipeOptions = {
      slidesPerView: 1,
      loop: false,
      pagination: '.slider-bullets'
    };
  }

  ngAfterViewInit() {
    this.swiperChange.emit(this.swiperElement.Swiper);
  }
};