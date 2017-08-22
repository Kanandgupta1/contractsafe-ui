import _ from 'lodash';

import { Inject, ViewChild, Output, EventEmitter, HostListener } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';
import { Window } from '@fino/ng2-common';

import { ExtendedComponent } from '@fino/ng2-common';
import { Webcam, WebcamProvider } from '../../common/shared/provider';
import { DocumentService } from '../../common/services/document.service';

import template from './webcam.html';
import style from './webcam.scss';

@ExtendedComponent({
  inputs: ['width', 'height', 'imageType'],
  selector: 'webcam',
  template,
  providers: [
    WebcamProvider
  ],
  styles: [style], 
  queries: {
    webcamContainer: new ViewChild('webcamContainer')
  }
})
export class WebcamComponent extends InjectableClass {
  @Output() snap = new EventEmitter();
  @Output() errored = new EventEmitter();
  @Output() attached = new EventEmitter();

  constructor(
    @Inject(Webcam) webcam,
    @Inject(Window) window,
    @Inject(DocumentService) documentService) {
    super({ webcam, window, documentService });
  }

  ngOnInit() {
    if (!this.imageType) {
      this.imageType = 'jpeg'
    }

    this.webcam.on('error', (err) => this.errored.emit(err));
    this.reset = _.debounce(() => this.resetWebcam(), 50);
    this.reset();
  }

  ngOnChanges(changes) {
    if ((changes.width || changes.height) && this.reset) {
      this.reset();
    }
  }

  resetWebcam() {
    const options = this.getOptions();
    this.webcam.reset();
    this.webcam.set(options);
    this.webcam.set('constraints', {
      optional: [{facingMode: 'environment'}]
    });
    this.webcam.attach(this.webcamContainer.nativeElement);
    this.attached.emit(this.webcam);
  }

  getOptions() {
    const fullWidth = this.window.screen.availWidth;
    const fullHeight = this.window.screen.availHeight;
    const width = this.width || this.webcamContainer.nativeElement.clientWidth;
    const height = this.height || this.webcamContainer.nativeElement.clientHeight;
    //const crop_height = this.height || this.webcamContainer.nativeElement.clientHeight;
    let format = fullHeight / fullWidth;
    const crop_height = this.height;// * format;
    return {
      width,
      height,
      crop_height,
      crop_width: width,
      image_format: this.imageType,
      constraints: {
        width: this.width || 0,
        height: this.height || 0
      }
      /*enable_flash: true,
      force_flash: true,
      swfURL: './node_modules/webcamjs/webcam.swf'*/
    };
  }

  snapshot() {
    this.webcam.snap(url => {
      const meta = {
        width: this.webcam.dest_width,
        height: this.webcam.dest_height
      };
      const file = this.documentService.getFileFromImage(url, this.imageType, meta)
      this.snap.emit(file);
    });
  }
};