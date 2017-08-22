import { HammerGestureConfig } from '@angular/platform-browser';

export class HammerConfig extends HammerGestureConfig  {
  buildHammer(element) {
    const mc = new Hammer(element, {
      domEvents: false,
      touchAction: 'auto'
    });
    mc.get('pinch').set({enable: true});
    return mc;
  }
};