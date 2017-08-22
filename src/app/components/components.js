import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  FdBaseComponentsModule,
  FdSwiperModule,
  FdFormsModule,
  FdDialogModule
} from '@fino/ng2-components';

// Import third party modules
import { SemiCircleProgressComponent } from 'angular2-progressbar';
import * as highcharts from 'highcharts';
import { ChartModule } from 'angular2-highcharts';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

// Import shared module to access core features like pipes, core services
// in components
import { SharedModule } from '../common/shared/shared';
import { LoadingModule } from '../common/loading/loading.module';

// Import all components
import { AppHeaderComponent } from './appHeader/appHeader.component';
import { SliderComponent } from './slider/slider.component';
import { BankSelectionComponent } from './bankSelection/bankSelection.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ContractingCardComponent } from './contractingCard/contractingCard.component';
import { StateHeaderComponent } from './stateHeader/stateHeader.component';
import { CompleteProgressComponent } from './completeProgress/completeProgress.component';
//import { RouterTabComponent } from './routerTab/routerTab.component';
import { NewsFeedCardComponent } from './newsFeedCard/newsFeedCard.component';
import { ContractSummaryComponent } from './contractSummary/contractSummary.component';
import { SummaryCardComponent } from './summaryCard/summaryCard.component';
import { ProgressCardComponent } from './progressCard/progressCard.component';
import { CompareViewComponent } from './compareView/compareView.component';
import { SimpleLineChartComponent } from './simpleLineChart/simpleLineChart.component';
import { BookingEntryComponent } from './bookingEntry/bookingEntry.component';
import { BookingHistoryComponent } from './bookingHistory/bookingHistory.component';
import { LogoComponent } from './logo/logo.component';
import { PullToRefreshComponent } from './pullToRefresh/pullToRefresh.component';
import { WebcamComponent } from './webcam/webcam.component';
import { DocumentsViewerComponent } from './documentsViewer/documentsViewer.component';
import { DocumentViewerComponent } from './documentsViewer/documentViewer/documentViewer.component';
import { ImageUrlViewerComponent } from './documentsViewer/imageViewer/imageViewer.component';
import { PdfUrlViewerComponent } from './documentsViewer/pdfViewer/pdfViewer.component';
import { AddContractViewComponent } from './addContractView/addContractView.component';
import { HeroBoardComponent } from './heroBoard/heroBoard.component';
import { DividerComponent } from './divider/divider.component';
import { LoginCardComponent } from './loginCard/loginCard.component';
import { BankCardComponent } from './bankCard/bankCard.component';
import { ContractDetailCardComponent } from './contractDetailCard/contractDetailCard.component';
import { ContractDetailCompletionViewComponent } from './contractDetailCompletionView/contractDetailCompletionView.component';
import { EmptyContainerComponent } from './emptyContainer/emptyContainer.component';
import { SummaryCardSliderComponent } from './summaryCardSlider/summaryCardSlider.component';
import { BookingDropdownComponent } from './bookingDropdown/bookingDropdown.component';

/**
 * Shared components module, imported in each component module
 */
const sharedComponents = [
  LogoComponent,
  StateHeaderComponent,
  HeroBoardComponent
];

@NgModule({
  imports: [
    SharedModule,
    FdBaseComponentsModule
  ],
  declarations: sharedComponents,
  exports: sharedComponents.concat([SharedModule, FdBaseComponentsModule])
})
export class SharedComponentsModule {};

/**
 * App component module
 */
const AppComponents = [
  PullToRefreshComponent
];

@NgModule({
  imports: [
    FdSwiperModule,
    SharedComponentsModule
  ],
  declarations: AppComponents,
  exports: AppComponents.concat([SharedComponentsModule])
})
export class AppComponentsModule {};

/**
 * List component module
 */
const ListComponents = [
  AddContractViewComponent,
  DividerComponent,
  ContractingCardComponent
];

@NgModule({
  imports: [
    FdSwiperModule,
    FdDialogModule,
    FdFormsModule,
    SharedComponentsModule
  ],
  declarations: ListComponents,
  exports: ListComponents.concat([
    SharedComponentsModule, 
    FdDialogModule,
    FdSwiperModule
  ])
})
export class ListComponentsModule {};

/**
 * Detail component module
 */
const DetailComponents = [
  SemiCircleProgressComponent,
  CompleteProgressComponent,
  ProgressCardComponent,
  CompareViewComponent,
  SimpleLineChartComponent
];

@NgModule({
  imports: [
    ChartModule.forRoot(highcharts),
    FdDialogModule,
    FdFormsModule,
    SharedComponentsModule
  ],
  declarations: DetailComponents,
  exports: DetailComponents.concat([
    SharedComponentsModule, 
    FdDialogModule, 
    FdFormsModule
  ])
})
export class DetailComponentsModule {};

/**
 * Error component module
 */
@NgModule({
  imports: [
    SharedComponentsModule
  ],
  exports: [SharedComponentsModule]
})
export class ErrorComponentsModule {};

/**
 * Pending component module
 */
@NgModule({
  imports: [
    SharedComponentsModule
  ],
  exports: [SharedComponentsModule]
})
export class PendingComponentsModule {};

/**
 * Home component module
 */
const HomeComponents = [
  NewsFeedCardComponent,
  BookingDropdownComponent,
  BookingEntryComponent,
  BookingHistoryComponent
];

@NgModule({
  imports: [
    SharedComponentsModule
  ],
  declarations: HomeComponents,
  exports: HomeComponents.concat([SharedComponentsModule])
})
export class HomeComponentsModule {};

/**
 * Login component module
 */
@NgModule({
  imports: [
    FdSwiperModule,
    FdFormsModule,
    FdDialogModule,
    SharedComponentsModule
  ],
  exports: [FdFormsModule, FdDialogModule, SharedComponentsModule]
})
export class LoginComponentsModule {};

/**
 * Onboarding component module
 */
const OnboardingComponents = [
  SliderComponent,
  BankSelectionComponent,
  CheckboxComponent
];

@NgModule({
  imports: [
    FdFormsModule,
    FdSwiperModule,
    SharedComponentsModule
  ],
  declarations: OnboardingComponents,
  exports: OnboardingComponents.concat([
    FdFormsModule,
    FdSwiperModule,
    SharedComponentsModule
  ])
})
export class OnboardingComponentsModule {};

/**
 * Settings component module
 */
const SettingsComponents = [
  ContractSummaryComponent,
  SummaryCardComponent
];

@NgModule({
  imports: [
    SharedComponentsModule,
    FdFormsModule,
    FdDialogModule
  ],
  declarations: SettingsComponents,
  exports: SettingsComponents.concat([
    SharedComponentsModule,
    FdFormsModule,
    FdDialogModule
  ])
})
export class SettingsComponentsModule {};

/**
 * Documents component module
 */
const DocumentsModules = [
  WebcamComponent,
  DocumentsViewerComponent,
  DocumentViewerComponent,
  ImageUrlViewerComponent,
  PdfUrlViewerComponent,
  PdfViewerComponent
];

@NgModule({
  imports: [
    SharedComponentsModule,
    FdDialogModule
  ],
  declarations: DocumentsModules,
  exports: DocumentsModules.concat([SharedComponentsModule])
})
export class DocumentsComponentsModule {};

/**
 * Deleted component module
 */
@NgModule({
  imports: [
    SharedComponentsModule
  ],
  exports: [SharedComponentsModule]
})
export class DeletedComponentsModule {};

/**
 * ContractDetailCompletion component module
 */
const ContractDetailCompletionModules = [
  BankCardComponent,
  ContractDetailCardComponent,
  ContractDetailCompletionViewComponent,
  EmptyContainerComponent
];

@NgModule({
  imports: [
    SharedComponentsModule,
    FdFormsModule,
    FdSwiperModule
  ],
  declarations: ContractDetailCompletionModules,
  exports: ContractDetailCompletionModules.concat([SharedComponentsModule])
})
export class ContractDetailCompletionComponentsModule {};

/**
 * AddContractView component module
 */
const AddContractViewModules = [
  AddContractViewComponent
];

@NgModule({
  imports: [
    SharedComponentsModule
  ],
  declarations: AddContractViewModules,
  exports: AddContractViewModules.concat([SharedComponentsModule])
})
export class AddContractViewModule {};