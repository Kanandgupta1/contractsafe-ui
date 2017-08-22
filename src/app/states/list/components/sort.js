import _ from 'lodash';
import { Component, Inject } from '@angular/core';
import template from './sort.html';
import { CustomAppStateService } from '../../../common/services/appState.service';

const SortKeys = ['name', 'amount', 'interval', 'completed'];

@Component({
  selector: 'list-sort',
  template,
  inputs: ['options']
})
export class SortComponent {
  constructor(
    @Inject(CustomAppStateService) appState
  ) {
    this.sortKeys = _.intersection(appState.contractKeys, SortKeys);
  }
};