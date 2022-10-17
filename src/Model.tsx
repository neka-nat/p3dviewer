import * as React from "react";
import { Plane, Sphere, Stage, useGLTF } from "@react-three/drei";

// const Model: React.FC = () => {
//   const { scene } = useGLTF("gift.gltf");
//   // const { scene } = useGLTF("totoro.glb");

//   return (
//       <Stage>
//           <primitive scale={[1, 1, 1]} object={scene} dispose={null} />
//       </Stage>
//     )
// };

function Model (url: any) {
    const { scene } = useGLTF(String(url));
  
    return (
        <Stage>
            <primitive scale={[1, 1, 1]} object={scene} dispose={null} />
        </Stage>
      )
  };
  

export default Model;