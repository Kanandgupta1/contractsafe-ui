import { AppPath } from '../../app.state'
import { ContractDetailCompletionComponent } from './contractDetailCompletion.component';
import { ContractDetailCompletionResolve } from './contractDetailCompletion.resolve';

export const ContractDetailCompletionPath = 'contractDetailCompletion';

export const contractDetailCompletionState = {
  path: ContractDetailCompletionPath,
  loadChildren: './contractDetailCompletion.lazy#ContractDetailCompletionLazyModule',
  resolve: {
    contracts: ContractDetailCompletionResolve
  }
};

export const contractDetailCompletionLazyState = {
  path: '',
  component: ContractDetailCompletionComponent
};