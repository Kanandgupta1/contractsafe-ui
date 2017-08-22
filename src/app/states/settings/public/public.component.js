import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetsService } from '@fino/ng2-common';

import template from './public.html';

export const PublicSelector = 'public';

@Component({
  inputs: ['type'],
  selector: PublicSelector,
  template
})
export class PublicComponent {
  static get parameters() {
    return [[ActivatedRoute], [AssetsService]];
  }

  get backAddress() {
    return this.from || '../..';
  }

  constructor(ActivatedRoute, AssetsService) {
    this.assets = AssetsService;
    this.type = ActivatedRoute.snapshot.params.type;
    this.from = ActivatedRoute.snapshot.queryParams.from;
    //this.markdownPath = this.assets.getMarkdownPath(this.type);
    this.assets.loadMarkdown(this.type).subscribe((markdown) => {
      this.markdown = markdown;
    });
  }
};