import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzoneProps {
  onFileDrop: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileDrop }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileDrop(acceptedFiles[0]);
    }
  }, [onFileDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'pcd': [] },
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()} style={{border: '1px solid black', padding: '10px', textAlign: 'center'}}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>ファイルをここにドロップしてください</p>
      ) : (
        <p>PCDファイルをドラッグ&ドロップしてください</p>
      )}
    </div>
  );
};

export default Dropzone;
