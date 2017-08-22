import { Inject, ViewChild } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';

import { ExtendedComponent } from '@fino/ng2-common';
import { DocumentService } from '../../../common/services/document.service';

import template from './pdfViewer.html';
import style from './pdfViewer.scss';

@ExtendedComponent({
  inputs: ['document', 'isThumbnail'],
  selector: 'pdf-url-viewer',
  template,
  styles: [style]
})
export class PdfUrlViewerComponent extends InjectableClass {
  zoom = 1;

  constructor(
    @Inject(DocumentService) documentService) {
    super({ documentService });
  }

  ngOnInit() {
    this.pdfData = {
      data: this.documentService.getBytesFromDocument(this.document)
    };
  }

  zoomIn() {
    this.zoom -= 0.1;
  }

  zoomOut() {
    this.zoom += 0.1;
  }
};