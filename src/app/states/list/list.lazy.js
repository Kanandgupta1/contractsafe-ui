import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ListComponentsModule } from '../../components/components';
import { ListResolve } from './list.resolve';
import { ListComponent } from './list.component';
import { listLazyState } from './list.state';

@NgModule({
  imports: [
    ListComponentsModule,
    RouterModule.forChild(listLazyState)
  ],
  declarations: [ListComponent]
})
export class ListLazyModule {};
