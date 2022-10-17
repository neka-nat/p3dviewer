import create from "zustand"
import { REVISION, WebGLRenderer } from "three/src/Three"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

// const MeshoptDecoder = require('three/examples/jsm/libs/meshopt_decoder.module');
// Decoder...他の形式に変換したデータを元に戻すためのソフト
// Meshopt...glTFが対応している非可逆圧縮
let gltfLoader: GLTFLoader = new GLTFLoader

// ブラウザーとブラウザーじゃない環境を識別する
// if(typeof window !== 'undefined') {
//     // const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`
//     // const dracoloader = new DRACOLoader().setDecoderPath(`${THREE_PATH}/examples/js/libs/draco/gltf/`)
//     // const ktx2Loader = new KTX2Loader().setTranscoderPath(`${THREE_PATH}/examples/js/libs/basis/`)

//     // gltfLoader = new GLTFLoader()
//         // .setCrossOrigin('anonymous')
//         // .setDRACOLoader(dracoloader)
//         // .setKTX2Loader(ktx2Loader.detectSupport(new WebGLRenderer()))
//         // .setMeshoptDecoder(MeshoptDecoder)
// }

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
