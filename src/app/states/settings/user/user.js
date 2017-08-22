import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponentsModule } from '../../../components/components';

import { UserComponent } from './user.component';
import { UserResolve } from './user.resolve';
import { userState } from './user.state';

@NgModule({
  imports: [
    SettingsComponentsModule,
    RouterModule.forChild(userState)
  ],
  declarations: [UserComponent],
  providers: [
    UserResolve
  ]
})
export class UserModule {};