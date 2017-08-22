import _ from 'lodash';

import { Component } from '@angular/core';

import template from './bookingDropdown.html';
import styles from './bookingDropdown.scss';

@Component({
  inputs: ['booking', 'expanded'],
  selector: 'booking-dropdown',
  template,
  styles: [styles]
})
export class BookingDropdownComponent {
  constructor() {
  }

  ngOnInit() {
  }

  get totalAmount() {
    return this.booking.bookings && _.sum(_.map(this.booking.bookings, b => b.amount)) || 0;
  }
};