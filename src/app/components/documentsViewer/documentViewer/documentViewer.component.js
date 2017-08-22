import { Inject, Output, EventEmitter } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';

import { ExtendedComponent } from '@fino/ng2-common';
import { AccountService } from '../../../common/services/account.service';
import { DocumentService } from '../../../common/services/document.service';

import template from './documentViewer.html';
import style from './documentViewer.scss';

// TODO Do not pass contractId

@ExtendedComponent({
  inputs: ['document', 'isThumbnail', 'delayLoading'],
  selector: 'document-viewer',
  template,
  styles: [style]
})
export class DocumentViewerComponent extends InjectableClass {
  @Output() removeDocument = new EventEmitter();

  get isImage() {
    return this.document && this.documentService.isImage(this.document);
  }

  get isPdf() {
    return this.document && this.documentService.isPdf(this.document);
  }

  constructor(
    @Inject(AccountService) accountService,
    @Inject(DocumentService) documentService) {
    super({ accountService, documentService });
  }

  ngOnInit() {
  }

  enterDeleteMode(event) {
    if (this.isThumbnail) {
      event.srcEvent.stopPropagation();
      event.srcEvent.preventDefault();
      this.deleteMode = true;
    }
  }

  exitDeleteMode(event) {
    event.stopPropagation();
    event.preventDefault();
    this.deleteMode = false;
  }

  delete(event) {
    event.stopPropagation();
    event.preventDefault();
    this.removeDocument.emit(this.document);
    return false;
  }
};