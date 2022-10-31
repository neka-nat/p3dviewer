import create from "zustand";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
let gltfLoader: GLTFLoader = new GLTFLoader;

const useStore = create((set, get) => ({
    buffer: null,
    scene: null,
    animations: false,
    generateScene: async (config: any) => {
        const { buffer, scene }: any = get()
        const result: any = await new Promise((resolve, reject) => gltfLoader.parse(buffer, '', resolve, reject))
        set({
            animations: !!result.animations.length,
        })
        if (scene == null) set({ scene: result.scene })
    }
}))

export default useStore
