import { Stage, useGLTF } from "@react-three/drei";

function Model (url: any) {
    const { scene } = useGLTF(String(url));
    
    return (
        <Stage>
            <primitive scale={[1, 1, 1]} object={scene} dispose={null} />
        </Stage>
    )
};


export default Model;