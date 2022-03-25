import * as React from "react";
import { Plane, Sphere, Stage } from "@react-three/drei";

const Model: React.FC = () => {
    
  return (
      <Stage>
        <Plane args={[2, 2]} />
        <Sphere>
          <meshBasicMaterial attach="material" color="hotpink" />
        </Sphere>
      </Stage>
    )
};

export default Model;