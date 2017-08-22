import { ExtendedComponent } from '@fino/ng2-common';
import { ContentChild } from '@angular/core';

import  {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

import template from './emptyContainer.html';

@ExtendedComponent({
  inputs: ['key', 'isEmpty'],
  selector: 'empty-container',
  template,
  animations: [
    trigger('empty', [
      state('void', style({opacity: 0})),
      state('true', style({opacity: 1})),
      transition(':enter', [animate('0.3s')]),
    ])
  ],
  queries: {
    contentTemplate: new ContentChild('contentTemplate')
  }
})
export class EmptyContainerComponent {};