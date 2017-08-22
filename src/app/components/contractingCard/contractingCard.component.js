import { 
  Inject, 
  Output, 
  EventEmitter
} from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';

import { ExtendedComponent } from '@fino/ng2-common';

import template from './contractingCard.html';
import styles from './contractingCard.scss';

@ExtendedComponent({
  inputs: ['contract'],
  selector: 'contracting-card',
  template,
  styles: [styles]
})
export class ContractingCardComponent {
  @Output() swipeChange = new EventEmitter();
  state = {};

  get routerLink() {
    const id = this.contract.id;
    return [`/app/detail/${id}`];
  }
};
