import { ExtendedComponent } from '@fino/ng2-common';

import  {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

import template from './bank.html';
import desktop from './bank.desktop.html';
import { PreferredBanks } from './bank.constants';

@ExtendedComponent({
  selector: 'onboarding-bank',
  template,
  inputs: ['config'],
  animations: [
    trigger('slideState', [
      state('slideout', style({top: '-170px'})),
      transition('* => slideout', [
        animate('0.4s')
      ])
    ]),
    trigger('opacityState', [
      state('slideout', style({opacity: 0})),
      transition('* => slideout', [
        animate('0.2s')
      ])
    ])
  ]
})
export class BankComponent {
  get preferredBanks() {
    return PreferredBanks;
  }

  constructor() {

  }

  search($event) {
    if ($event) {
      this.slideState = 'slideout';
    }
  }

  enableSelection($event) {
    this.bankSelectionEnabled = true;
  }
};