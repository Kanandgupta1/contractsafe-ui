import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { homeLazyState } from './home.state';

// Import sub modules
import { FeedModule } from './feed/feed';
import { BookingsModule } from './bookings/bookings';

@NgModule({
  imports: [
    FeedModule,
    BookingsModule,
    RouterModule.forChild(homeLazyState)
  ],
  declarations: [HomeComponent]
})
export class HomeLazyModule {};