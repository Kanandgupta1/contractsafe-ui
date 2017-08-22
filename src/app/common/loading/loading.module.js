import { NgModule, Injectable, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModule, LoadingService } from '@fino/ng2-common';

import { LoadingComponent } from './loading.component';

import { FiguresModule } from '../figures/figures.module';

@NgModule({
  imports: [CommonModule, LanguageModule, FiguresModule],
  declarations:[LoadingComponent],
  providers: [LoadingService],
  exports: [LoadingComponent]
})
export class LoadingModule {};