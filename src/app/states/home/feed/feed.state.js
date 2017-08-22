import { FeedComponent } from './feed.component';
import { FeedResolve } from './feed.resolve';

export const FeedPath = 'feed';

export const feedState = {
  path: FeedPath,
  component: FeedComponent,
  resolve: {
    feed: FeedResolve
  }
};