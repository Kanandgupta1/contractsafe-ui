import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FdCommonModule } from '@fino/ng2-common';
import { MarkdownToHtmlPipe } from 'markdown-to-html-pipe';

// Import shared services
import { CustomAppStateService } from '../services/appState.service';
import { AccountService } from '../services/account.service';
import { BankService } from '../services/bank.service';
import { ContractService } from '../services/contract.service';
import { DocumentService } from '../services/document.service';
import { FormularService } from '../services/formular.service';
import { NavigationService } from '../services/navigation.service';

// Import provider
import { MimetypeProvider, LoadImageProvider } from './provider';

// Import modules
import { LoadingModule } from '../loading/loading.module';
import { FiguresModule } from '../figures/figures.module';

@NgModule({
  declarations: [
    MarkdownToHtmlPipe
  ],
  providers: [
    ContractService,
    AccountService,
    BankService,
    MimetypeProvider,
    LoadImageProvider,
    DocumentService,
    FormularService,
    CustomAppStateService,
    NavigationService
  ],
  exports: [
    FdCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownToHtmlPipe,
    FiguresModule,
    LoadingModule
  ]
})
export class SharedModule { };