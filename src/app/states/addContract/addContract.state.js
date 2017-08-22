import { TransitionResolve } from '@fino/ng2-common';
import { AddContractComponent } from './addContract.component';

export const AddContractPath = 'addContract';

export const addContractState = {
  path: AddContractPath,
  loadChildren: './addContract.lazy#AddContractLazyModule',
  resolve: {
    transition: TransitionResolve
  }
};

export const addContractLazyState = {
  path: '',
  component: AddContractComponent
};