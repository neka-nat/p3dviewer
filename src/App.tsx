import React, { useState } from 'react';
import Dropzone from './components/Dropzone';
import PCDViewer from './components/PCDViewer';

const App: React.FC = () => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleFileDrop = (droppedFile: File) => {
    setFile(droppedFile);
  };

  return (
    <div>
      <h1>PCDファイルビューア</h1>
      <Dropzone onFileDrop={handleFileDrop} />
      {file && <p>選択されたファイル: {file.name}</p>}
      <div style={{ width: '100%', height: '500px' }}>
        <PCDViewer file={file} />
      </div>
    </div>
  );
};

export default App;
