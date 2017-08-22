import _ from 'lodash';

import { ViewEncapsulation } from '@angular/core';
import { ExtendedComponent } from '@fino/ng2-common';

import template from './settings.html';

export const SettingsSelector = 'settings';

@ExtendedComponent({
  selector: SettingsSelector,
  template,
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent {};