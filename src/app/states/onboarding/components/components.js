import { NgModule, ViewContainerRef, ComponentFactoryResolver, Host } from '@angular/core';
import { StartComponent } from './start';
import { BankComponent } from './bank';
import { LoginComponent } from './login';
import { LoadingComponent } from './loading';
import { SuccessComponent } from './success';
import { ListComponent } from './list';
import { OnboardingSteps } from '../onboarding.constants';

import { OnboardingComponentsModule } from '../../../components/components';

// Gather all possible dynamic modules as entry components for the dynamic component
const PossibleComponents = [StartComponent, BankComponent, LoginComponent, LoadingComponent, SuccessComponent, ListComponent];

// Create component to state mapping, to select the state specific component
export const ComponentMapping = {
  [OnboardingSteps.Start] : StartComponent,
  [OnboardingSteps.Bank] : BankComponent,
  [OnboardingSteps.Login] : LoginComponent,
  [OnboardingSteps.Loading] : LoadingComponent,
  [OnboardingSteps.Success] : SuccessComponent,
  [OnboardingSteps.List] : ListComponent,
  [OnboardingSteps.ListUntagged] : ListComponent,
  [OnboardingSteps.ListStandingOrders] : ListComponent
};

@NgModule({
  imports: [
    OnboardingComponentsModule
  ],
  entryComponents: PossibleComponents,
  declarations: PossibleComponents,
  exports: PossibleComponents
})
export class InternalOnboardingComponentsModule {}; 