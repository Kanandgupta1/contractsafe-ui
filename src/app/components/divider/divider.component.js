import { HostBinding } from '@angular/core';
import { ExtendedComponent } from '@fino/ng2-common';

import template from './divider.html';
import style from './divider.scss';

@ExtendedComponent({
  inputs: ['text', 'breakOut'],
  selector: 'divider',
  template,
  styles: [style]
})
export class DividerComponent {
  @HostBinding('class.break-out')
  breakOut;
};