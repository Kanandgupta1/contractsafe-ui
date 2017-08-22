import { AppPath } from '../../../app.state'
import { UserComponent } from './user.component';
import { UserResolve } from './user.resolve';

export const UserPath = 'user';

export const userState = {
  path: UserPath,
  component: UserComponent,
  resolve: {
    user: UserResolve
  }
};