import { forwardRef } from '@angular/core';

// Extend with custom providers
import { provideToken } from '@fino/ng2-common';

// Third party providers
import WebcamJs from 'webcamjs';

export const Webcam = provideToken('Webcam');
export const WebcamProvider = { provide: Webcam, useValue: WebcamJs };

import MimetypeJs from 'mime-type/with-db';

export const Mimetype = provideToken('Mimetype');
export const MimetypeProvider = { provide: Mimetype, useValue: MimetypeJs };

import 'exif-js';
import LoadImageJs from 'blueimp-load-image';

export const LoadImage = provideToken('LoadImage');
export const LoadImageProvider = { provide: LoadImage, useValue: LoadImageJs };
