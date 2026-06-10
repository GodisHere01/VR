import { Canvas } from '@react-three/fiber'
import {
    OrbitControls,
    PointerLockControls,
    useGLTF
  } from '@react-three/drei'
import { useState } from 'react'



window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true
})

window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false
})

function Room({ color }) {
  const model = useGLTF('/room.glb')

  const handleClick = (e) => {
    e.stopPropagation()
  
    const obj = e.object
  
    if (obj.material) {
      obj.material = obj.material.clone()
  
      obj.material.color.set(color)
  
      obj.material.roughness = 1
      obj.material.metalness = 0
  
      obj.material.needsUpdate = true
    }
  }

  return (
    <primitive
      object={model.scene}
      onClick={handleClick}
    />
  )
}


export default function Viewer() {
  const [color, setColor] = useState('#ff0000')

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 1000
        }}
      >
        <input
          type="color"
          value={color}
          onChange={(e) =>
            setColor(e.target.value)
          }
        />
      </div>

      <Canvas
        camera={{
          position: [0, 2, 8]
        }}
        style={{
          background: 'black'
        }}
      >
        <ambientLight intensity={2} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
        />

        <Room color={color} />

     
        <OrbitControls
  enablePan={true}
  enableZoom={true}
  enableRotate={true}
/>
      </Canvas>
    </>
  )
}