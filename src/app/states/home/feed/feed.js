import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponentsModule } from '../../../components/components';

import { FeedComponent } from './feed.component';
import { FeedResolve } from './feed.resolve';
import { feedState } from './feed.state';

@NgModule({
  imports: [
    HomeComponentsModule,
    RouterModule.forChild(feedState)
  ],
  declarations: [FeedComponent],
  providers: [
    FeedResolve
  ]
})
export class FeedModule {};