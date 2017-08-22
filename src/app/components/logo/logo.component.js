import { Component, Inject } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';
import { AssetsService } from '@fino/ng2-common';

import template from './logo.html';

const Replacables = ['http://', 'https://'];
const ReplaceRegex = new RegExp(_.join(Replacables, '|'), 'g');

@Component({
  inputs: ['partner', 'type'],
  selector: 'logo',
  template
})
export class LogoComponent extends InjectableClass {
  constructor(@Inject(AssetsService) assetsService) {
    super({ assetsService });
  }

  get defaultIcon() {
    return `${this.assetsService.iconsPath}${this.type}.png`;
  }

  ngOnInit() {
    if (!this.type) {
      this.type = 'partner';
    }

    const homepage = this.partner && this.partner.contact && this.partner.contact.portal || false;
    if (!homepage) {
      return this.noLogo();
    }

    let source = this.removeProtocoll(homepage);
    source = this.useFirstPartOfUrl(source);
    this.source = `//logo.clearbit.com/${source}`;
  }

  removeProtocoll(url) {
    return url.replace(ReplaceRegex, '');
  }

  useFirstPartOfUrl(url) {
    return url.split('/')[0];
  }

  noLogo() {
    this.source = this.defaultIcon;
  }
};