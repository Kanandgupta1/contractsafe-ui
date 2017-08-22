import { Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';

import { ExtendedComponent, Window } from '@fino/ng2-common';
import { LoadImage } from '../../../common/shared/provider';
import { DocumentService } from '../../../common/services/document.service';

import template from './imageViewer.html';
import style from './imageViewer.scss';

@ExtendedComponent({
  inputs: ['document'],
  selector: 'image-url-viewer',
  styles: [style],
  template,
  encapsulation: ViewEncapsulation.None,
  queries: {
    imageContainer: new ViewChild('imageContainer')
  }
})
export class ImageUrlViewerComponent extends InjectableClass {
  get dataUrl() {
    return this.documentService.getDataUrlFromDocument(this.document);
  }

  get width() {
    return this.imageContainer && this.imageContainer.nativeElement && this.imageContainer.nativeElement.clientWidth;
  }

  get height() {
    return this.imageContainer && this.imageContainer.nativeElement && this.imageContainer.nativeElement.clientHeight;
  }

  constructor(
    @Inject(DocumentService) documentService,
    @Inject(Window) window,
    @Inject(LoadImage) loadImage) {
    super({ documentService, loadImage, window });
  }

  ngAfterViewInit() {
    this.loadImage(
      this.dataUrl,
      img => {
        this.imageContainer.nativeElement.append(img);
      },
      {
        maxWidth: this.width,
        maxHeight: this.height,
        orientation: true,
        pixelRatio: this.window.devicePixelRatio
      }
    );
  }
};