import { useEffect } from "react"
import useStore from "./store"
import Viewer from "./view"
import { useControls } from 'leva'

const Result = () => {
    const { scene, generateScene, animations }: any = useStore()

    console.log(scene)
    const [config, setConfig] = useControls(() => ({
        types: { value: false, hint: 'Add Typescript definitions' },
        shadows: { value: true, hint: 'Let meshes cast and receive shadows' },
        instanceall: { label: 'instance all', value: false, hint: 'Instance every geometry (for cheaper re-use)' },
        instance: { value: false, hint: ' Instance re-occuring geometry' },
        verbose: { value: false, hint: 'Verbose output w/ names and empty groups' },
        keepnames: { value: false, label: 'keep names', hint: 'Keep original names' },
        keepgroups: { value: false, label: 'keep groups', hint: 'Keep (empty) groups' },
        aggressive: { value: false, hint: 'Aggressively prune the graph (empty groups, transform overlap)' },
        meta: { value: false, hint: 'Include metadata (as userData)' },
        precision: { value: 2, min: 1, max: 8, step: 1, hint: 'Number of fractional digits (default: 2)' },
    }))

    const preview = useControls(
        'preview',
        {
            autoRotate: true,
            contactShadow: true,
            intensity: { value: 1, min: 0, max: 2, step: 0.1, label: 'light intensity' },
            preset: {
            value: 'rembrandt',
            options: ['rembrandt', 'portrait', 'upfront', 'soft'],
            },
            environment: {
                value: 'city',
                options: ['', 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
            },
        },
        { collapsed: true }
    )

    // useEffect(() => {
    //     setConfig({ verbose: animations })
    // }, [animations, setConfig])

    useEffect(() => {
        generateScene(config)
    }, [config, generateScene])

    return (
        <div>
            {!scene
                ? (<p>Loading ...</p>) 
                : (
                    <div>
                        <section >
                            {/* {scene && <Viewer scene={scene} {...config} {...preview}/>} */}
                            {scene && <Viewer scene={scene} />}
                        </section>
                    </div>
                )
            }
        </div>
    )
}

export default Result