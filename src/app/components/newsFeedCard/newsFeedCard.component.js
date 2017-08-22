import { Component, Output, EventEmitter } from '@angular/core';

import template from './newsFeedCard.html';
import styles from './newsFeedCard.scss';

@Component({
  inputs: ['feedItem'],
  selector: 'news-feed-card',
  template,
  styles: [styles]
})
export class NewsFeedCardComponent {
  @Output() read = new EventEmitter();
  @Output() action = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }
};