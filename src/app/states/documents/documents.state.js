import { AppPath } from '../../app.state'
import { DocumentsComponent } from './documents.component';

export const DocumentsPath = 'documents/:id';

export const documentsState = {
  path: DocumentsPath,
  loadChildren: './documents.lazy#DocumentsLazyModule'
};

export const documentsLazyState = {
  path: '',
  component: DocumentsComponent
};