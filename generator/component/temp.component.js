import { ExtendedComponent } from '@fino/ng2-common';

import template from './<%= lowerCaseName %>.html';
import style from './<%= lowerCaseName %>.scss';

@ExtendedComponent({
  inputs: [],
  selector: '<%= kebabName %>',
  template,
  styles: [style]
})
export class <%= upperCaseName %>Component {};