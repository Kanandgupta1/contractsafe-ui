import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContractDetailCompletionComponentsModule } from '../../components/components';

import { ContractDetailCompletionComponent } from './contractDetailCompletion.component';
import { ContractDetailCompletionResolve } from './contractDetailCompletion.resolve';
import { contractDetailCompletionLazyState } from './contractDetailCompletion.state';

@NgModule({
  imports: [
    ContractDetailCompletionComponentsModule,
    RouterModule.forChild(contractDetailCompletionLazyState)
  ],
  declarations: [ContractDetailCompletionComponent]
})
export class ContractDetailCompletionLazyModule {};