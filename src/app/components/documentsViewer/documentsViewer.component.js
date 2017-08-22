import _ from 'lodash';
import { Observable } from 'rxjs';
import { Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MdDialog } from '@angular/material';
import { InjectableClass } from '@fino/lib-injection';

import { Window, ExtendedComponent, LoadingService } from '@fino/ng2-common';
import { AccountService } from '../../common/services/account.service';
import { DocumentService } from '../../common/services/document.service';

import template from './documentsViewer.html';
import style from './documentsViewer.scss';

@ExtendedComponent({
  inputs: ['documentIds', 'contractId'],
  selector: 'documents-viewer',
  template,
  styles: [style],
  queries: {
    dialogTemplate: new ViewChild('dialogTemplate')
  }
})
export class DocumentsViewerComponent extends InjectableClass {
  @Output() documentsChanged = new EventEmitter();

  get acceptedUploadTypes() {
    return this.documentService.allSupportedExtensions;
  }

  constructor(
    @Inject(AccountService) accountService,
    @Inject(DocumentService) documentService,
    @Inject(LoadingService) loadingService,
    @Inject(MdDialog) dialog,
    @Inject(Window) window) {
    super({ window, accountService, loadingService, documentService });

    this.uploadOptions = {};
  }

  ngOnInit() {
    this.documents = [];
    Observable.from(this.documentIds)
      .flatMap(id => {
        const document = { 
          loading: true,
          id
        };
        this.documents.push(document);
        return this.loadDocument(id).map(doc => {
          return () => {
            _.merge(document, doc);
            document.loading = false;
          }
        });
      })
      .subscribe(update => {
        update();
      });
  }

  takeSnapshot() {
    this.dialogRef = this.dialog.open();
  }

  webcamAttached(webcam) {
    if (this.dialogRef) {
      this.dialogRef.afterClosed().subscribe(() => {
        webcam.reset();
      });
    }
  }

  snap(document) {
    this.dialogRef.close();
    this.newDocuments = [];
    this.newDocuments.push(document);
    this.uploadDocuments();
  }

  webcamError() {
    this.dialogRef.close();
  }

  openViewer(document) {
    if (document.loading) {
      return;
    }

    this.selectedDocument = document;
    this.viewerDialogRef = this.viewerDialog.open();
  }

  closeViewer() {
    return this.viewerDialogRef && this.viewerDialogRef.close();
  }

  loadDocument(document) {
    return this.accountService.fetchDocument(document, this.contractId);
  }

  removeDocument(document) {
    const id = document.id || document;
    this.accountService.deleteDocument(id, this.contractId).subscribe(() => {
      const index = _.indexOf(this.documents, document);
      this.documents.splice(index, 1);
      this.closeViewer();
      this.documentsChanged.emit(this.documents);      
    });
  }

  // TODO Extract queing mechanism
  handleUpload(event) {
    this.newDocuments = [];
    const debouncedUpload = _.debounce(() =>  {
      this.loadingService.isLoading(true);
      this.uploadDocuments()
    }, 200);
    const element = event.srcElement || event.target;
    this.documentService.readFiles(element.files)
    .subscribe(resp => {
      this.newDocuments.push(resp);
      debouncedUpload();
    });
  }

  uploadDocuments() {
    const document = _.first(this.newDocuments);
    if (document) {
      this.uploadDocument(document)
        .finally(() => {
          this.newDocuments.splice(0, 1);
          if (!this.newDocuments.length) {
            return this.loadingService.isLoading(false);
          }
          this.uploadDocuments();
        })
        .subscribe((data) => {
          document.id = data.documentid;
          this.documents.push(document);
          this.documentsChanged.emit(this.documents);
        });
    }
  }

  uploadDocument(document) {
    return this.accountService
      .uploadDocument(this.contractId, document);
  }
};