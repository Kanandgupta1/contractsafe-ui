import { AppPath } from '../../app.state'
import { OnboardingComponent } from './onboarding.component';

export const OnboardingPath = 'onboarding/:onboardingState';

export const onboardingState = {
  path: OnboardingPath,
  loadChildren: './onboarding.lazy#OnboardingLazyModule',
};

export const onboardingLazyState = {
  path: '',
  component: OnboardingComponent
};