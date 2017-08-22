import { Input, Output, EventEmitter } from '@angular/core';
import { ExtendedComponent } from '@fino/ng2-common';

import template from './checkbox.html';
import styles from './checkbox.scss';

@ExtendedComponent({
  selector: 'checkbox',
  template,
  styles: [styles]
})
export class CheckboxComponent {
  @Output() checkedChange = new EventEmitter();

  @Input()
  get checked() {
    return this.checkedValue;
  }

  set checked(val) {
    this.checkedValue = val;
    this.checkedChange.emit(this.checked);
  }

  constructor() {
  }
};