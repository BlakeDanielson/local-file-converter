import React, { useEffect, useState } from 'react';
// @ts-ignore
import ExampleWorker from './example.worker.js';
import { getWasmStatus } from './wasmUtils';
import FileInput from './components/FileInput';
import { FileData } from './types/index';

const App: React.FC = () => {
  const [workerMessage, setWorkerMessage] = useState<string | null>(null);
  const [wasmStatus, setWasmStatus] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  
  useEffect(() => {
    // Check WASM support
    setWasmStatus(getWasmStatus());
    
    // Test worker initialization
    const worker = new ExampleWorker();
    
    worker.onmessage = (event: MessageEvent) => {
      console.log('Message from worker:', event.data);
      if (event.data.type === 'READY') {
        setWorkerMessage(event.data.message);
        
        // Test sending a message to the worker
        worker.postMessage({ test: 'Hello from main thread' });
      } else if (event.data.type === 'ECHO') {
        setWorkerMessage(`Worker connection confirmed: ${event.data.message}`);
      }
    };
    
    // Clean up worker when component unmounts
    return () => {
      worker.terminate();
    };
  }, []);

  const handleFileSelect = (file: File) => {
    // Extract file extension from name
    const nameParts = file.name.split('.');
    const extension = nameParts.length > 1 ? nameParts[nameParts.length - 1].toLowerCase() : '';
    
    setSelectedFile({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      extension
    });
    
    console.log('File selected:', file.name, file.size, file.type, extension);
  };

  return (
    <div className="container">
      <header>
        <h1>Local File Converter</h1>
        <p className="tagline">Privacy-focused file conversion that happens entirely in your browser</p>
      </header>
      <main>
        {/* Display technology statuses */}
        <div style={{ marginBottom: '1.5rem' }}>
          {workerMessage && (
            <div style={{ 
              marginBottom: '0.5rem', 
              padding: '0.5rem', 
              backgroundColor: '#e3f2fd', 
              borderRadius: '4px' 
            }}>
              <p><strong>Worker Status:</strong> {workerMessage}</p>
            </div>
          )}
          
          <div style={{ 
            padding: '0.5rem', 
            backgroundColor: '#e8f5e9', 
            borderRadius: '4px' 
          }}>
            <p><strong>WASM Status:</strong> {wasmStatus}</p>
          </div>
        </div>
        
        {/* File Input Component */}
        <FileInput 
          onFileSelect={handleFileSelect}
        />
        
        {/* Display selected file information */}
        {selectedFile && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px'
          }}>
            <h3>Selected File</h3>
            <p><strong>Name:</strong> {selectedFile.name}</p>
            <p><strong>Size:</strong> {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            <p><strong>Type:</strong> {selectedFile.type || 'Unknown'}</p>
            <p><strong>Extension:</strong> {selectedFile.extension}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App; 