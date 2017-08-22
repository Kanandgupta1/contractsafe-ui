import { AppPath } from '../../app.state'
import { HomeComponent } from './home.component';

// Import sub routes
import { feedState } from './feed/feed.state';
import { HomeResolve } from './home.resolve';
import { bookingsState } from './bookings/bookings.state';

export const HomePath = 'home';

export const homeState = {
  path: HomePath,
  loadChildren: './home.lazy#HomeLazyModule',
  resolve: {
    summary: HomeResolve
  }
};

export const homeLazyState = {
  path: '',
  component: HomeComponent,
  children: [
    {
      path: '',
      redirectTo: feedState.path,
      pathMatch: 'full'
    },
    feedState,
    bookingsState
  ]
};