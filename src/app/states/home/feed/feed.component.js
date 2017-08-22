import _ from 'lodash';

import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InjectableClass } from '@fino/lib-injection';

import template from './feed.html';

export const FeedSelector = 'feed';

const Feed = [{
  homepage: 'telekom.de',
  name: 'Deutsche Telekom',
  type: 'cancellationReminder',
  value: 5
},{
  homepage: 'sparkasse.de',
  name: 'Sparkasse',
  type: 'completeReminder',
  value: 85
},{
  homepage: 'mcfit.de',
  name: 'McFit Deutschland',
  type: 'cancellationReminder',
  value: 8
},{
  homepage: 'unitymedia.de',
  name: 'Unitymedia',
  type: 'cancellationReminder',
  value: 15
}];

@Component({
  selector: FeedSelector,
  template
})
export class FeedComponent extends  InjectableClass {
  constructor(
    @Inject(Router) router,
    @Inject(ActivatedRoute) route) {
    super({ router, route });
  }

  get feed() {
    return _.filter(this.completeFeed, f => !f.remove);
  }

  ngOnInit() {
    this.completeFeed = this.route.snapshot.data.feed;
  }

  remove(item) {
    item.remove = true;
  }

  read(item) {
    item.read = true;
  }

  action(item) {
    const id = item && item.extra && item.extra.contractid;
    // TODO Navigate to detail view
    this.router.navigate([`app/detail/${id}`]);
  }
};