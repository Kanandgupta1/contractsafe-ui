import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { settingsLazyState } from './settings.state';

// Import sub modules
import { OverviewModule } from './overview/overview';
import { AccountsModule } from './accounts/accounts';
import { PublicModule } from './public/public';
import { UserModule } from './user/user';

@NgModule({
  imports: [
    OverviewModule,
    AccountsModule,
    PublicModule,
    UserModule,
    RouterModule.forChild(settingsLazyState)
  ],
  declarations: [SettingsComponent]
})
export class SettingsLazyModule {};