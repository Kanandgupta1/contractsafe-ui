import { ExtendedComponent } from '@fino/ng2-common';

import template from './bookingHistory.html';
import styles from './bookingHistory.scss';

@ExtendedComponent({
  inputs: ['bookings'],
  selector: 'booking-history',
  template,
  styles: [styles]
})
export class BookingHistoryComponent {
  constructor() {
  }

  getMonth(booking) {
    return new Date(booking.bookingDate).getMonth();
  }
};