import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Suspense, useLayoutEffect } from "react";
import useStore from "./store";

interface Props {
    shadows: boolean | undefined,
    contactShadow: false | { blur: number; opacity?: number | undefined; position?: [x: number, y: number, z: number] | undefined; } | undefined,
    environment: "sunset" | "dawn" | "night" | "warehouse" | "forest" | "apartment" | "studio" | "city" | "park" | "lobby" | null | undefined,
    preset:  "rembrandt" | "portrait" | "upfront" | "soft" | undefined,
    intensity: number | undefined,
}

export default function Viewer({shadows, contactShadow, environment, preset, intensity}: any) {
    const scene = useStore((store: any) => store.scene)
    const ref: React.MutableRefObject<any> = useRef()
    useLayoutEffect(() => {
        scene.traverse((obj: any) => {
            if (obj.isMesh) {
                obj.castShadow = obj.receiveShadow = shadows
                obj.material.envMapIntensity = 0.8
            }
        })
    }, [scene, shadows])

    return (
        <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 150], fov: 40 }}>
            <ambientLight intensity={0.25} />
            <Suspense fallback={null}>
            <Stage
                controls={ref}
                preset={preset}
                intensity={intensity}
                contactShadow={contactShadow}
                shadows
                adjustCamera
                environment={environment}>
                <primitive object={scene} />
            </Stage>
            </Suspense>
            <OrbitControls ref={ref} autoRotate={true} />
        </Canvas>
    )
}