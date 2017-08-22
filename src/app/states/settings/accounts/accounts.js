import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponentsModule } from '../../../components/components';

import { AccountsComponent } from './accounts.component';
import { AccountsResolve } from './accounts.resolve';
import { accountsState } from './accounts.state';

@NgModule({
  imports: [
    SettingsComponentsModule,
    RouterModule.forChild(accountsState)
  ],
  declarations: [AccountsComponent],
  providers: [
    AccountsResolve
  ]
})
export class AccountsModule {};