import React, { useRef, useState, useCallback } from 'react';
import { FileInputProps } from '../types/index';
import styles from '../styles/FileInput.module.css';

const FileInput: React.FC<FileInputProps> = ({
  onFileSelect,
  acceptedFileTypes = '',
  maxFileSizeMB = 100 // 100MB default as per requirements
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Convert MB to bytes
  const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const validateFile = useCallback((file: File): boolean => {
    // Check file size
    if (file.size > maxFileSizeBytes) {
      setError(`File is too large. Maximum size is ${maxFileSizeMB}MB.`);
      return false;
    }
    
    // Check file type if acceptedFileTypes is provided
    if (acceptedFileTypes && !acceptedFileTypes.includes(file.type) && !acceptedFileTypes.includes('*')) {
      setError('File type not supported');
      return false;
    }
    
    setError(null);
    return true;
  }, [acceptedFileTypes, maxFileSizeBytes, maxFileSizeMB]);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const { files } = e.dataTransfer;
    
    if (files && files.length) {
      const file = files[0]; // For now, just take the first file
      
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect, validateFile]);
  
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    
    if (files && files.length) {
      const file = files[0];
      
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect, validateFile]);
  
  const handleButtonClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);
  
  return (
    <div>
      <div
        className={`${styles.fileDropArea} ${isDragging ? styles.fileDropAreaActive : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <p>Drag & drop files here or click to select</p>
        <button className={styles.uploadButton}>
          Select File
        </button>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
          accept={acceptedFileTypes}
        />
      </div>
      
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}
    </div>
  );
};

export default FileInput; 