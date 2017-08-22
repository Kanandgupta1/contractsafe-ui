import { Component } from '@angular/core';

import template from './bookingEntry.html';

@Component({
  inputs: ['booking'],
  selector: 'booking-entry',
  template
})
export class BookingEntryComponent {
  constructor() {
  }

  ngOnInit() {
  }
};