import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CoreModule } from './core';
import Environment from '../../shared/environment';

if (Environment.stage !== Environment.stages.localhost) {
  enableProdMode();
}

if (document.readyState != 'loading') {
  platformBrowserDynamic().bootstrapModule(CoreModule);
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(CoreModule);
});