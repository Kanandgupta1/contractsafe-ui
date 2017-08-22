import { AccountsComponent } from './accounts.component';
import { AccountsResolve } from './accounts.resolve';

export const AccountsPath = 'accounts';

export const accountsState = {
  path: AccountsPath,
  component: AccountsComponent,
  resolve: {
    accounts: AccountsResolve
  }
};