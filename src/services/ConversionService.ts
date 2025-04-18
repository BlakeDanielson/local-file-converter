/**
 * Conversion Service
 * 
 * This service handles file conversions and provides a simpler interface
 * for the app to use, abstracting away the complexity of workers.
 */

import { WorkerFactory } from './WorkerFactory';

// Define event types for the conversion process
export type ConversionStatus = 'idle' | 'converting' | 'completed' | 'error';

export interface ConversionProgress {
  status: ConversionStatus;
  progress: number | null;
  error?: string;
  result?: Blob;
}

export interface ConversionOptions {
  sourceFormat: string;
  targetFormat: string;
  onProgress?: (progress: ConversionProgress) => void;
}

export class ConversionService {
  private workerFactory: WorkerFactory;
  
  constructor() {
    this.workerFactory = new WorkerFactory();
  }
  
  /**
   * Convert a file from one format to another
   */
  async convertFile(file: File, options: ConversionOptions): Promise<Blob> {
    const { sourceFormat, targetFormat, onProgress } = options;
    
    // Get the appropriate worker
    const worker = this.workerFactory.getWorkerForConversion(sourceFormat, targetFormat);
    
    if (!worker) {
      const error = `Conversion from ${sourceFormat} to ${targetFormat} is not supported`;
      if (onProgress) {
        onProgress({
          status: 'error',
          progress: null,
          error
        });
      }
      throw new Error(error);
    }
    
    return new Promise<Blob>((resolve, reject) => {
      // Set up event listener for worker messages
      worker.onmessage = (event) => {
        const { type, progress, result, error } = event.data;
        
        switch (type) {
          case 'PROGRESS_UPDATE':
            if (onProgress) {
              onProgress({
                status: 'converting',
                progress
              });
            }
            break;
            
          case 'CONVERSION_COMPLETE':
            if (onProgress) {
              onProgress({
                status: 'completed',
                progress: 100,
                result
              });
            }
            resolve(result);
            break;
            
          case 'CONVERSION_ERROR':
            const errorMessage = error?.message || 'Unknown error during conversion';
            if (onProgress) {
              onProgress({
                status: 'error',
                progress: null,
                error: errorMessage
              });
            }
            reject(new Error(errorMessage));
            break;
        }
      };
      
      // Set up error handler
      worker.onerror = (error) => {
        if (onProgress) {
          onProgress({
            status: 'error',
            progress: null,
            error: error.message
          });
        }
        reject(new Error(`Worker error: ${error.message}`));
      };
      
      // Start the conversion
      if (onProgress) {
        onProgress({
          status: 'converting',
          progress: 0
        });
      }
      
      // Send the conversion request to the worker
      worker.postMessage({
        type: 'START_CONVERSION',
        payload: {
          file,
          targetFormat
        }
      });
    });
  }
  
  /**
   * Get all supported conversions
   */
  getSupportedConversions(): Record<string, string[]> {
    return this.workerFactory.getAllSupportedConversions();
  }
  
  /**
   * Clean up resources when done
   */
  dispose(): void {
    this.workerFactory.terminateAll();
  }
} 