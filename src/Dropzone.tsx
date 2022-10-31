import { useDropzone } from 'react-dropzone';

const Dropzone = ({onDrop} : any) => {

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    // 受け付けるファイルの種類を指定
    accept: {}
  })

  return (
    <section className="drop-zone">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here,</p>
        {fileRejections.length
          ? (<p>Only .gltf or .glb files are accepted</p>)
          : null
        }
      </div>
    </section>
  );
}

export default Dropzone;
