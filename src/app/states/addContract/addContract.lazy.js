import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AddContractComponentsModule } from '../../components/components';

import { AddContractComponent } from './addContract.component';
import { addContractLazyState } from './addContract.state';

@NgModule({
  imports: [
    AddContractComponentsModule,
    RouterModule.forChild(addContractLazyState)
  ],
  declarations: [AddContractComponent]
})
export class AddContractLazyModule {};