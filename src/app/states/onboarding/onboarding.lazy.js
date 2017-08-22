import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnboardingComponent } from './onboarding.component';
import { onboardingLazyState } from './onboarding.state';

// TODO Does not make any sense, maybe put components in state where they are used?
// Or look for a way to globally provide them
import { OnboardingComponentsModule } from '../../components/components';

import { InternalOnboardingComponentsModule } from './components/components';

@NgModule({
  imports: [
    OnboardingComponentsModule,
    InternalOnboardingComponentsModule,
    RouterModule.forChild(onboardingLazyState)
  ],
  // Tried to provide constants
  // providers: [{ provide: OnboardingSteps, useValue: OnboardingSteps}, { provide: OnboardingConfiguration, useValue: OnboardingConfiguration}],
  declarations: [OnboardingComponent]
})
export class OnboardingLazyModule {};