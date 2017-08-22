import { ExtendedComponent } from '@fino/ng2-common';

import template from './routerTab.html';
import styles from './routerTab.scss';

@ExtendedComponent({
  inputs: ['routes'],
  selector: 'router-tab',
  template,
  styles: [styles]
})
export class RouterTabComponent {
  constructor() {
  }

  ngOnInit() {
  }
};