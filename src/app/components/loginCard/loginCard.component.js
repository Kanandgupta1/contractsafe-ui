import { ExtendedComponent } from '@fino/ng2-common';
import { Output, EventEmitter } from '@angular/core';

import template from './loginCard.html';
import style from './loginCard.scss';

@ExtendedComponent({
  inputs: ['form', 'hideCta', 'cannotCta', 'ctaBusy', 'model'],
  selector: 'login-card',
  template,
  styles: [style]
})
export class LoginCardComponent {
  @Output() formChange = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.formChange.emit(this.form);
    })
  }
};