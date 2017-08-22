import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroComponent } from './hero/hero.component';

const figures = [
  HeroComponent
];

@NgModule({
  imports: [CommonModule],
  declarations: figures,
  exports: figures
})
export class FiguresModule {};