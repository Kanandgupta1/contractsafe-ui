import { NgModule, forwardRef } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ng2DeviceDetectorModule, Ng2DeviceService } from 'ng2-device-detector';

import { AppComponent } from './app.component';
import { AppGuard } from './app.guard';

// Modules which are required for its lazy loaded route
import { ListModule } from './states/list/list.module';
import { HomeModule } from './states/home/home.module';
import { DetailModule } from './states/detail/detail.module';
import { ContractDetailCompletionModule } from './states/contractDetailCompletion/contractDetailCompletion.module';

// Completely loaded modules
import { LoginModule } from './states/login/login';
import { PendingModule } from './states/pending/pending';

// All components used in app component
import { AppComponentsModule } from './components/components';

@NgModule({
  imports: [
    AppComponentsModule,
    DetailModule,
    ListModule,
    HomeModule,
    ContractDetailCompletionModule,
    LoginModule,
    PendingModule,
    Ng2DeviceDetectorModule
  ],
  declarations: [AppComponent],
  exports: [
    RouterModule
  ],
  providers: [
    Ng2DeviceService,
    AppGuard,
    {provide: Window, useValue: window}
  ]
})
export class AppModule {};