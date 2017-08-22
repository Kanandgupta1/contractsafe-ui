import _ from 'lodash';

import { Component, Input, HostBinding, Output, OnInit, EventEmitter } from '@angular/core';

import template from './hero.html';
import style from './hero.scss';

@Component({
  inputs: ['emotion', 'small'],
  selector: 'hero',
  template,
  styles: [style]
})
export class HeroComponent {
  @HostBinding('class.fast')
  @Input()
  fast;

  get hasEmotion() {
    return !!this.emotion;
  }
};