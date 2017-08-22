import { BookingsComponent } from './bookings.component';
import { BookingsResolve } from './bookings.resolve';

export const BookingsPath = 'bookings';

export const bookingsState = {
  path: BookingsPath,
  component: BookingsComponent,
  resolve: {
    bookings: BookingsResolve
  }
};