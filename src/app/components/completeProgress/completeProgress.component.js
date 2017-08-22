import _ from 'lodash';

import { OnInit, Inject, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { ExtendedComponent } from '@fino/ng2-common';

import { SemiCircleProgressComponent } from 'angular2-progressbar';

import template from './completeProgress.html';
import styles from './completeProgress.scss';

@ExtendedComponent({
  inputs: ['options', 'value', 'simple'],
  selector: 'complete-progress',
  template,
  styles: [styles],
  queries: {
    semiCircleComp: new ViewChild(SemiCircleProgressComponent)
  },
  encapsulation: ViewEncapsulation.None
})
export class CompleteProgressComponent {
  get progressClass() {
    const progress = Math.ceil(this.value/10) * 10;
    return `progress-${progress}`;
  }

  constructor() {
    this.defaultOptions = {
      strokeWidth: 4,
      trailColor: '#eee',
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        value: '',
        alignToBottom: false
      },
      from: { color: '#FFEA82' },
      to: { color: '#ED6A5A' },
      // Set default step function for all animate calls
      step: (state, bar) => {
        let value = `${Math.round(bar.value() * 100)}&nbsp;%`;
        if (!this.simple) {
          value += '<br><span class="text-decent">Vollständig</span>';
        }

        bar.setText(value);
        bar.text.style.color = 'currentColor';
      }
    };
  }

  ngOnInit() {
    this.circleOptions = _.merge({}, this.defaultOptions, this.options || {});
  }

  ngAfterViewInit() {
    this.drawCircle();
  }

  ngOnChanges(changes) {
    if (changes.value) {
      this.drawCircle();
    }
  }

  drawCircle() {
    if (this.semiCircleComp && this.semiCircleComp.shape) {
      this.semiCircleComp.animate(this.value/100);
    }
  }
};