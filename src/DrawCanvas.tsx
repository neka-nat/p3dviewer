import * as React from 'react';
import * as Fiber from '@react-three/fiber';
import * as Drei from '@react-three/drei';
import Model from "./Model";

function DrawCanvas(url: any) {

  return (
    <React.Suspense fallback={<span>loading...</span>}>
      <Fiber.Canvas>
        <Drei.PerspectiveCamera makeDefault />
        <Drei.OrbitControls makeDefault />
        <Model url={url}/>
      </Fiber.Canvas>
    </React.Suspense>
  );
};

export default DrawCanvas;