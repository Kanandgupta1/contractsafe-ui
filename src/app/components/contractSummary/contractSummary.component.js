import { Component } from '@angular/core';
import { PipeTypes } from '@fino/ng2-common';

import template from './contractSummary.html';

const SummaryTypeToPipeMapping = {
  'addedAt': PipeTypes.Date,
  'lastMonth': PipeTypes.Percentage,
  'costs': PipeTypes.Currency,
  'totalCosts': PipeTypes.Currency
};

@Component({
  inputs: ['summaryItems'],
  selector: 'contract-summary',
  template
})
export class ContractSummaryComponent {
  constructor() {
  }

  ngOnInit() {
  }

  getPipeType(item) {
    return SummaryTypeToPipeMapping[item.type];
  }
};