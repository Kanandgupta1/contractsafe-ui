import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponentsModule } from '../../../components/components';

import { PublicComponent } from './public.component';
import { publicState } from './public.state';

@NgModule({
  imports: [
    SettingsComponentsModule,
    RouterModule.forChild(publicState)
  ],
  declarations: [PublicComponent]
})
export class PublicModule {};