import { Component } from '@angular/core';

import template from './bookings.html';

import { ActivatedRoute } from '@angular/router';

export const BookingsSelector = 'bookings';

const Bookings = [{
  month: 'december',
  bookings: [{
    name: 'HUK Coburg',
    date: 1483621305996,
    amount: -29,
    homepage: 'huk.de'
  },{
    name: 'Städt. Werke',
    date: 1481568304452,
    amount: -15.99,
    homepage: 'sw-kassel.de'
  },{
    name: 'Unitymedia',
    date: 1480963504452,
    amount: -11.99,
    homepage: 'unitymedia.de'
  },{
    name: 'Telekom',
    date: 1478976304452,
    amount: -15,
    homepage: 'telekom.de'
  },{
    name: 'Amazon Prime',
    date: 1476294304452,
    amount: -9.99,
    homepage: 'amazon.com'
  }]
},{
  month: 'november',
  bookings: [{
    name: 'HUK Coburg',
    date: 1483621305996,
    amount: -29,
    homepage: 'huk.de'
  },{
    name: 'Städt. Werke',
    date: 1481568304452,
    amount: -15.99,
    homepage: 'sw-kassel.de'
  },{
    name: 'Unitymedia',
    date: 1480963504452,
    amount: -11.99,
    homepage: 'unitymedia.de'
  },{
    name: 'Telekom',
    date: 1478976304452,
    amount: -15,
    homepage: 'telekom.de'
  }]
},{
  month: 'october',
  bookings: [{
    name: 'HUK Coburg',
    date: 1483621305996,
    amount: -29,
    homepage: 'huk.de'
  },{
    name: 'Städt. Werke',
    date: 1481568304452,
    amount: -15.99,
    homepage: 'sw-kassel.de'
  },{
    name: 'Unitymedia',
    date: 1480963504452,
    amount: -11.99,
    homepage: 'unitymedia.de'
  },{
    name: 'Telekom',
    date: 1478976304452,
    amount: -15,
    homepage: 'telekom.de'
  }]
}];

@Component({
  selector: BookingsSelector,
  template
})
export class BookingsComponent {
  static get parameters() {
    return [[ActivatedRoute]];
  }

  constructor(ActivatedRoute) {
    this.route = ActivatedRoute;
  }

  ngOnInit() {
    this.bookings = this.route.snapshot.data.bookings;
  }
};