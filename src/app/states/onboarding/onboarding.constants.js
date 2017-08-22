export const OnboardingSteps = {
  Start: 'start',
  Bank: 'bank',
  Login: 'login',
  Loading: 'loading',
  Success: 'success',
  List: 'list',
  ListUntagged: 'listUntagged',
  ListStandingOrders: 'listStandingOrders'
};

export const OnboardingConfiguration = {
  [OnboardingSteps.Start] : {
    options: {
      swipes: ['start', 'bank', 'tuv']
    },
    cta: (component) => {
      component.nextSlide();
    },
    ctaText: (component) => {
      return component.isLastSlide ? 'startOnboarding' : 'start';
    }
  },
  [OnboardingSteps.Bank] : {
    canCta: () => {
      return false;
    },
    hideCta: (component) => {
      return true;
    }
  },
  [OnboardingSteps.Login] : {
    canCta: (component) => {
      return component.onboardingForm.valid && component.checkAgb;
    },
    cta: (component) => {
      component.login();
    }
  },
  [OnboardingSteps.Loading] : {
    options: {
      steps: ['login', 'search', 'contracts', 'overview']
    },
    hideCta: (component) => true
  },
  [OnboardingSteps.Success] : {},
  [OnboardingSteps.List] : {
    options: {
      contractsKey: 'contracts'
    },
    cta: (component) => {
      component.addContracts();
    }
  },
  [OnboardingSteps.ListUntagged] : {
    options: {
      translationKey: '.untagged',
      contractsKey: 'untagged'
    },
    cta: (component) => {
      component.addUntagged();
    }
  },
  [OnboardingSteps.ListStandingOrders] : {
    options: {
      translationKey: '.standingOrders',
      contractsKey: 'standingOrderContracts'
    },
    cta: (component) => {
      component.finishOnboarding();
    }
  }
};