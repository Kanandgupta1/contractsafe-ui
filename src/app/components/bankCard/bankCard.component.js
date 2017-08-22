import { ExtendedComponent } from '@fino/ng2-common';

import template from './bankCard.html';
import style from './bankCard.scss';

@ExtendedComponent({
  inputs: ['bank'],
  selector: 'bank-card',
  template,
  styles: [style]
})
export class BankCardComponent {};