import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DetailComponentsModule } from '../../components/components';

import { DetailComponent } from './detail.component';
import { DetailResolve } from './detail.resolve';
import { DetailGuard } from './detail.guard';
import { detailLazyState } from './detail.state';

@NgModule({
  providers: [
    DetailResolve,
    DetailGuard
  ]
})
export class DetailModule {};