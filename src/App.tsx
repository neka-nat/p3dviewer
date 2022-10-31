import { useCallback } from 'react';
import Dropzone from './Dropzone';
import useStore from './store'
import loadable from '@loadable/component';

const Result = loadable(() => import('./result'))

function App() {
  const { buffer } = useStore((state: any) => ({
    buffer: state.buffer,
  }))

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader()
      reader.onabort = () => console.error('file reading was aborted')
      reader.onerror = () => console.error('file reading has failed')
      reader.onload = async () => {
        const data = reader.result
        useStore.setState({ buffer: data })
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])

  return (
    <div className="App">
      <main>
        <Dropzone onDrop={onDrop}/>
        {buffer ? <Result /> : <div></div>}
      </main>
    </div>
  );
}

export default App;
