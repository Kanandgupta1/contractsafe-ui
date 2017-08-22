import { Component, ViewEncapsulation } from '@angular/core';
import template from './filter.html';

@Component({
  selector: 'list-filter',
  template,
  inputs: ['options']
})
export class FilterComponent {};