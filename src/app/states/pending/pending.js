import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PendingComponentsModule } from '../../components/components';

import { PendingComponent } from './pending.component';
import { pendingState } from './pending.state';

@NgModule({
  imports: [
    PendingComponentsModule
  ],
  declarations: [PendingComponent]
})
export class PendingModule {};