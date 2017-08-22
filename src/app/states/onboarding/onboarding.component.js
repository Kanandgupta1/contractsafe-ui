import _ from 'lodash';
import { Observable } from 'rxjs';
import { ViewEncapsulation, OnInit, ComponentFactoryResolver, ViewChildComponent, ViewContainerRef, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { InjectableClass } from '@fino/lib-injection';
import { ExtendedComponent } from '@fino/ng2-common';

import template from './onboarding.html';
import styles from './onboarding.scss';

// Dynamic component directive
import { ComponentMapping } from './components/components';

// TODO Inject constants
import { OnboardingSteps, OnboardingConfiguration } from './onboarding.constants';

// Import service where state gets persisted
import { CustomAppStateService } from '../../common/services/appState.service';
import { AccountService } from '../../common/services/account.service';
import { NavigationService } from '../../common/services/navigation.service';
import { BankService } from '../../common/services/bank.service';
import { BankModel } from '../../common/models/bank.model';

export const OnboardingSelector = 'onboarding';

// TODO Refactor Onboarding, create states for each onboarding step
@ExtendedComponent({
  selector: OnboardingSelector,
  template,
  styles: [styles],
  encapsulation: ViewEncapsulation.None
})
export class OnboardingComponent extends InjectableClass {
  get centerState(){
    return _.includes(['start', 'login', 'success', 'loading'], this.state);
  }

  get onboardingContracts() {
    return this.storage.onboardingContracts;
  }

  get hasStandingOrders() {
    return !!this.onboardingContracts.standingOrderContracts;
  }

  get states() {
    return _.values(OnboardingSteps);
  }

  get stateIndex() {
    return _.indexOf(this.states, this.state);
  }

  get cannotCta() {
    return this.config.canCta && !this.config.canCta(this);
  }

  get visibleContracts() {
    return _.filter(this.contracts, cp => !cp.hide);
  }

  get isLastSlide() {
    return this.swiper.activeIndex === this.config.options.swipes.length - 1;
  }

  get ctaText() {
    return this.config.ctaText && this.config.ctaText(this) || this.state;
  }

  constructor(
    @Inject(ActivatedRoute) route, 
    @Inject(CustomAppStateService) storage, 
    @Inject(AccountService) accountService,
    @Inject(NavigationService) navigationService,
    @Inject(BankService) bankService
  ) {
    super({ route, storage, accountService, navigationService, bankService });
    this.onboardingForm = new FormGroup({});
    this.loginModel = {};
    this.checkAgb = false;
    this.swiper = {};
  }

  activate() {
    this.route.params.subscribe(params => {
      this.userExists = !this.hideHeader && this.storage.user && this.storage.user.userexist;
      this.state = params.onboardingState;
      const config = OnboardingConfiguration[this.state];

      // Really dirty way to make the parent accessable in dynamic component 
      // TODO Move to seperate routes
      config.options = _.merge({}, config.options || {}, {parent: this});
      this.config = config;
      this.component = ComponentMapping[this.state];
      this.contracts = this.storage.contracts;
    });
  }

  ngOnInit() {
    this.activate();
    if (this.storage.bank) {
      this.selectedBank = new BankModel(this.storage.bank);
    }
  }

  next() {
    // Onboarding finished
    if (this.stateIndex === this.states.length) {
      return;
    }
    const onboardingState = this.states[this.stateIndex + 1];
    return this.navigationService.navigateToOnboarding(onboardingState);
      //.then(() => this.activate());
  }

  prev() {
    const onboardingState = this.states[this.stateIndex - 1];
    return this.navigationService.navigateToOnboarding(onboardingState)
      .then(() => this.activate());
  }

  hideCta() {
    return this.config && this.config.hideCta && this.config.hideCta(this);
  }

  cta($event) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    if (this.cannotCta) {
      return;
    }
    if (this.config.cta) {
      return this.config.cta(this);
    }
    this.next();
  }

  returnFromOnboarding() {
    this.storage.updateUser({ userexist: true });
    this.navigationService.navigateToList();
  }

  /**
   * Slider section
   */
  nextSlide() {
    if (this.isLastSlide) {
      return this.next();
    }

    this.swiper.slideNext();
  }

  /**
   * Bank selection section
   */
  selectBank(bank) {
    this.bankService
      .getBank(bank)
      .subscribe(data => {
        this.selectedBank = this.storage.bank = data;
        this.next();
      });
  }

  /**
   * Login section
   */
  login() {
    if (this.onboardingForm.valid) {
      this.loginError = false;
      this.loginSuccessful = false;
      this.contractsFetched = false;
      this.next()
        .then(() => {
          this.fakeLoginSuccess();
          this.accountService
            .addAccount(this.loginModel, this.selectedBank)
            .map(() => {
              this.loginSuccessful = true;
              return this.searchSuccessful = true;
            })
            .flatMap(() => this.accountService.refresh(true))
            .flatMap(() => this.accountService.fetchContractsForOnboarding())
            .subscribe(
            () => this.contractsFetchSuccess(),
            () => this.requestFail()
          );
        });
    }
  }

  fakeLoginSuccess() {
    setTimeout(() => this.loginSuccessful = true, 2500);
    setTimeout(() =>  this.searchSuccessful = true, 4500);
  }

  contractsFetchSuccess() {
    this.hideHeader = !this.userExists;
    this.contractsFetched = true;
    setTimeout(() => {
      this.next();
    }, 4000);
  }

  requestFail() {
    this.loginError = true;
    this.prev();
  }

  getContractIds() {
    return _.reduce(this.visibleContracts, (acc, cp) => {
      if (!cp.selected) {
        acc.push(cp.id);
      }
      return acc;
    }, []);
  }

  /**
   * Contract list section
   */
  addContracts() {
    const contractsIds = this.getContractIds();

    this.ctaBusy = true;
    this.accountService.deleteContracts(contractsIds)
      .finally(() => {
        this.ctaBusy = false;
      })
      .flatMap(() => {
        return this.accountService.fetchUntaggedContracts();
      })
      .subscribe((user) => {
        this.next();
      });
  }

  /**
   * Untagged list section
   */
  addUntagged() {
    const contractsIds = this.getContractIds();
    this.accountService.putUntaggedContracts(contractsIds)
      .finally(() => {
        this.ctaBusy = false;
      })
      .flatMap(() => {
        if (!this.hasStandingOrders) {
          return Observable.of(false)
        }

        return this.accountService.fetchStandingOrders();
      })
      .subscribe((so) => {
        if (!so || !so.length) {
          return this.returnFromOnboarding();
        }

        this.next();
      });
  }

  /**
   * Standing orders section
   */
  finishOnboarding() {
    const contractsIds = this.getContractIds();
    this.accountService.putStandingOrders(contractsIds)
      .subscribe(() => {
        this.returnFromOnboarding();
      });
  }
};