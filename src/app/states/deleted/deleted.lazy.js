import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeletedComponentsModule } from '../../components/components';

import { DeletedComponent } from './deleted.component';
import { deletedLazyState } from './deleted.state';

@NgModule({
  imports: [
    DeletedComponentsModule,
    RouterModule.forChild(deletedLazyState)
  ],
  declarations: [DeletedComponent]
})
export class DeletedLazyModule {};