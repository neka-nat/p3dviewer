import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { BufferGeometry, Float32BufferAttribute } from 'three';
import { parsePCD } from '../Parser/PCDParser';

interface PCDViewerProps {
  file: File | undefined;
}

const PCDViewer: React.FC<PCDViewerProps> = ({ file }) => {
  const [geometry, setGeometry] = useState<BufferGeometry | undefined>(undefined);

  useEffect(() => {
    const loadPCDFile = async () => {
      if (file) {
        try {
          const points = await parsePCD(file);
          const bufferGeometry = new BufferGeometry();
          bufferGeometry.setAttribute('position', new Float32BufferAttribute(points, 3));
          setGeometry(bufferGeometry);
        } catch (error) {
          console.error('Error loading PCD file:', error);
          setGeometry(undefined);
        }
      } else {
        setGeometry(undefined);
      }
    };
    loadPCDFile();
  }, [file]);

  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 1]} />
      <OrbitControls />
      {geometry && (
      <points args={[geometry]}>
        <pointsMaterial
          size={0.01}
          sizeAttenuation={true}
          alphaTest={0.5}
          transparent={true}
          color={0x0000ff}
        />
      </points>
      )}
    </Canvas>
  );
};

export default PCDViewer;
