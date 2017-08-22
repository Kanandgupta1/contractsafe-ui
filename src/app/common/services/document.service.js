import { Observable } from 'rxjs';
import _ from 'lodash';

import { Injectable, Inject } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';
import { HttpService } from '@fino/ng2-common';

import { StateKeys } from './appState.service';

import { Mimetype } from '../shared/provider';

@Injectable()
export class DocumentService extends InjectableClass {
  get supportedExtensions() {
    return {
      Pdf: '.pdf',
      Image: ['.jpg', '.jpeg', '.png']
    };
  }

  get allSupportedExtensions() {
    return [this.supportedExtensions.Pdf].concat(this.supportedExtensions.Image);
  }

  constructor(@Inject(Mimetype) mimetype) {
    super({ mimetype });
  }

  getFileFromImage(dataUrl, imageType, meta = {}, filename = null) {
    const random = Math.random().toString(36).substring(7);
    filename = filename || `upload.${random}.${imageType}`;
    let file = this.getFileFromDataUrl(filename, dataUrl);
    return _.merge(file, { meta });
  }

  getFileFromDataUrl(filename, dataUrl) {
    // get content type from filename
    const mimetype = this.mimetype.lookup(filename);
    // get base64 string
    const content = dataUrl.split(',')[1];

    return {
      filename,
      contenttype: mimetype,
      content
    };
  }

  dataUrltoBytes(dataUrl) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataUrls - see SO answer #6850276 for code that does this
    const pureDataUrl = _.includes(dataUrl, ',') ? dataUrl.split(',')[1] : dataUrl;
    let byteString = atob(pureDataUrl);

    return this.byteStringToContent(byteString);
  }

  byteStringToContent(byteString) {
    // write the bytes of the string to an ArrayBuffer
    let ia = [];
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return ia;
  }

  readFiles(files) {
    return Observable
      .from(files)
      .flatMap(file => {
        return Observable.create(observer => {
          const fileReader = new FileReader();
          fileReader.onload = (event) => {
            const element = event.srcElement || event.target;
            observer.next({
              file,
              dataUrl: element.result
            });
            observer.complete();
          }
          fileReader.readAsDataURL(file);
        })
      })
      .map(readResult => {
        return this.getFileFromDataUrl(readResult.file.name, readResult.dataUrl)
      });
  } 

  getDataUrlFromDocument(document) {
    let base64String = document.content;
    if (Array.isArray(base64String)){
      base64String = this.bufferToBase64(base64String);
    }
    const mimetype = this.mimetype.lookup(document.filename);
    return `data:${mimetype};base64,${base64String}`;
  }

  getBytesFromDocument(document) {
    return _.isString(document.content) 
      ? this.dataUrltoBytes(document.content)
      : document.content;
  }

  getBlobFromDocument(document) {
    const type = this.mimetype.lookup(document.filename);
    const bytes = this.getBytesFromDocument(document)

    return new Blob(bytes, { type });
  }

  isPdf(document) {
    return this.isSameFiletype(document, this.supportedExtensions.Pdf);
  }

  isImage(document) {
    return this.isSameFiletype(document, this.supportedExtensions.Image);
  }

  isSameFiletype(document, extension) {
    if (_.isString(extension)) {
      extension = [extension];
    }
    return _.some(extension, e => {
      const mimetype = this.mimetype.lookup(e);
      return document.contenttype === mimetype;
    });
  }

  bufferToBase64(buffer) {
    const base64String = this.uint8ToString(base64String);
    return btoa(base64String);
  }

  uint8ToString(u8a){
    let CHUNK_SZ = 0x8000;
    let c = [];
    for (let i=0; i < u8a.length; i+=CHUNK_SZ) {
      c.push(String.fromCharCode.apply(null, _.slice(u8a, i, i+CHUNK_SZ)));
    }
    return c.join('');
  }
}