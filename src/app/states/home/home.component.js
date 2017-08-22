import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InjectableClass } from '@fino/lib-injection';

import template from './home.html';

export const HomeSelector = 'home';

// TODO Use localization
const Categories = [{
  name: 'communication',
  summary: [{
    value: 13,
    type: 'contracts'
  },{
    value: 80.00,
    type: 'costs'
  },{
    value: .07,
    type: 'lastMonth'
  }]
},{
  name: 'insurance',
  summary: [{
    value: 13,
    type: 'contracts'
  },{
    value: 49.00,
    type: 'costs'
  },{
    value: .05,
    type: 'lastMonth'
  }]
},{
  name: 'abonnements',
  summary: [{
    value: 13,
    type: 'contracts'
  },{
    value: 4.00,
    type: 'costs'
  },{
    value: .05,
    type: 'lastMonth'
  }]
},{
  name: 'energy',
  summary: [{
    value: 13,
    type: 'contracts'
  },{
    value: 91.00,
    type: 'costs'
  },{
    value: .05,
    type: 'lastMonth'
  }]
}];

const SummaryItems = [{
  value: 13,
  type: 'contracts'
},{
  value: 449.00,
  type: 'totalCosts'
},{
  value: .05,
  type: 'lastMonth'
}];

const TabRoutes = [{
  route: ['feed'],
  name: 'feed'
}, {
  route: ['bookings'],
  name: 'bookings'
}];

@Component({
  selector: HomeSelector,
  template
})
export class HomeComponent extends InjectableClass {
  constructor(
    @Inject(ActivatedRoute) route) {
    super({ route });
  }

  get summaryItems() {
    return this.summary.total;
  }

  get tabRoutes() {
    return TabRoutes;
  }

  get categories() {
    return this.summary.categories;
  }

  ngOnInit() {
    this.summary = this.route.snapshot.data.summary;
  }
};