import { Inject } from '@angular/core';
import { LocalizationPipe, PipeTypes } from '@fino/ng2-common';

import { ExtendedComponent } from '@fino/ng2-common';

import template from './compareView.html';
import styles from './compareView.scss';

const CompareResults = {
  Less: 'less',
  More: 'more',
  Equal: 'equal'
};

@ExtendedComponent({
  inputs: ['value', 'compareValue', 'valueText', 'compareText', 'unit'],
  selector: 'compare-view',
  template,
  styles: [styles],
  providers: [LocalizationPipe]
})
export class CompareViewComponent {
  get compareResult() {
    if (this.value < this.compareValue) {
      return CompareResults.Less;
    }
    if (this.value > this.compareValue) {
      return CompareResults.More;
    }
    return CompareResults.Equal;
  }

  get compareResultValue() {
    const value = this.compareResult === CompareResults.Less ? 
      this.calcCompareValue(this.value, this.compareValue) : this.calcCompareValue(this.compareValue,this.value);
    return this.resultTransform.transform(value, PipeTypes.Currency);
  }

  constructor(@Inject(LocalizationPipe) localizationPipe) {
    this.resultTransform = localizationPipe;
  }

  ngOnInit() {
    this.value *= -1;
  }

  calcCompareValue(fromVal, toValue) {
    return toValue - fromVal;
  }

  calcPercentage(fromVal, toVal) {
    const diff = toVal - fromVal;
    return diff/this.compareValue;
  }
};