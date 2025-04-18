/**
 * Image Conversion Worker
 * This worker file is loaded into a web worker context and handles image conversions.
 */

import { ImageConversionWorker } from './ImageConversionWorker';

// Initialize the worker
// `self` refers to the worker scope
const worker = self as unknown as Worker;
new ImageConversionWorker(worker);

// Notify the main thread that the worker is initialized
self.postMessage({
  type: 'INIT',
  payload: { 
    workerType: 'image-converter',
    supportedConversions: {
      'jpg': ['png'],
      'jpeg': ['png'],
      'png': ['jpg', 'jpeg']
    }
  }
}); 