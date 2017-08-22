import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponentsModule } from '../../../components/components';

import { OverviewComponent } from './overview.component';
import { overviewState } from './overview.state';

@NgModule({
  imports: [
    SettingsComponentsModule,
    RouterModule.forChild(overviewState)
  ],
  declarations: [OverviewComponent]
})
export class OverviewModule {};