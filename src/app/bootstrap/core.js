import 'zone.js/dist/zone';
import 'font-awesome-sass-loader';
import 'hammerjs';

import { Observable } from 'rxjs';

import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// Import and configure the router module
import { RouterModule, RouterOutlet } from '@angular/router';
import { rootRoutes } from '../app.state';
const RouterModuleConfigured = RouterModule.forRoot(rootRoutes, {useHash: true});

// App module contains route definitions and states
import { AppModule } from '../app';

// Router outlet container
import { BootstrapComponent } from './bootstrap.component';

// Import and configure angular material modules
import { MaterialModule, MdDialogModule } from '@angular/material';

// Import and configure local storage
import { CachedStorageModule } from '@fino/ng2-common';
const CachedStorageConfigured = CachedStorageModule.withConfig({
    prefix: 'contractsafe',
    storageType: 'localStorage'
});

// Import and configure language module
import { LanguageModule } from '@fino/ng2-common';
const LanguageModuleConfigured = LanguageModule.withConfig({
    translationRoot: 'i18n/',
    languages: {
      'de': {
        country: 'DE',
        currency: 'EUR'
      }
    }
});

// Import and configure fd common modules
import Environment from '../../shared/environment';
import { AssetsModule, ErrorHandlingModule } from '@fino/ng2-common';
const AssetsModuleConfigured = AssetsModule.withConfig({
    url: '//cdn.contractsafe.fino.digital'
});

// Configure error handling module
const ErrorHandlingModuleConfigured = ErrorHandlingModule.forRoot({
  ravenUrl: 'https://2a554063277f45cda4a4868852ca4ef3@sentry.io/193808',
  noLog: Environment.stage === Environment.stages.localhost
});

import { LoadingModule } from '../common/loading/loading.module';

// Import notification module
import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';
const NotificationsModuleConfigured = SimpleNotificationsModule.forRoot();

// Import hammer config
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerConfig } from './hammer.config';

// Import fino digital shared common services
import { FdCommonModule } from '@fino/ng2-common';
const FdCommonModuleConfigured = FdCommonModule.forRoot();

// Import ng2 device detector module
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
const Ng2DeviceDetectorModuleConfigured = Ng2DeviceDetectorModule.forRoot();

@NgModule({
  imports: [
    FdCommonModuleConfigured,
    ErrorHandlingModuleConfigured,
    NotificationsModuleConfigured,
    PushNotificationsModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModuleConfigured,
    LanguageModuleConfigured,
    AssetsModuleConfigured,
    MaterialModule,
    MdDialogModule,
    CachedStorageConfigured,
    AppModule,
    LoadingModule,
    Ng2DeviceDetectorModuleConfigured
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
  ],
  declarations: [BootstrapComponent],
  bootstrap: [BootstrapComponent]
})
export class CoreModule {};