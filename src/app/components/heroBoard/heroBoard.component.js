import { ExtendedComponent } from '@fino/ng2-common';

import template from './heroBoard.html';
import style from './heroBoard.scss';

@ExtendedComponent({
  inputs: ['text', 'heroEmotion'],
  selector: 'hero-board',
  template,
  styles: [style]
})
export class HeroBoardComponent {
  constructor() {
  }

  ngOnInit() {
  }
};