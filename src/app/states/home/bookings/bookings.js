import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponentsModule } from '../../../components/components';

import { BookingsComponent } from './bookings.component';
import { BookingsResolve } from './bookings.resolve';
import { bookingsState } from './bookings.state';

@NgModule({
  imports: [
    HomeComponentsModule,
    RouterModule.forChild(bookingsState)
  ],
  declarations: [BookingsComponent],
  providers: [
    BookingsResolve
  ]
})
export class BookingsModule {};