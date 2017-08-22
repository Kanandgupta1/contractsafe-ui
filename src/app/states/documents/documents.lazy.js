import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DocumentsComponentsModule } from '../../components/components';

import { DocumentsComponent } from './documents.component';
import { documentsLazyState } from './documents.state';

@NgModule({
  imports: [
    DocumentsComponentsModule,
    RouterModule.forChild(documentsLazyState)
  ],
  declarations: [DocumentsComponent]
})
export class DocumentsLazyModule {};