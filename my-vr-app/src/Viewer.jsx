import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function StickyPin({
    position,
    note,
    index,
    onEdit,
    onDelete,
  }) {
    const [open, setOpen] =
      useState(false)
  
    return (
      <mesh position={position}>
        <Html distanceFactor={8}>
          <div
            style={{
              position:
                'relative',
            }}
          >
            {/* pin */}
            <div
              onClick={() =>
                setOpen(!open)
              }
              style={{
                width: 38,
                height: 38,
                background:
                  '#FFD700',
                borderRadius: 6,
                display:
                  'flex',
                alignItems:
                  'center',
                justifyContent:
                  'center',
                cursor:
                  'pointer',
                fontWeight:
                  'bold',
                color:
                  '#333',
                position:
                  'relative',
              }}
            >
              {index + 1}
  
              <div
                style={{
                  position:
                    'absolute',
                  right: 0,
                  bottom: 0,
                  width: 10,
                  height: 10,
                  background:
                    '#e6c200',
                }}
              />
            </div>
  
            {open && (
              <div
                style={{
                  position:
                    'absolute',
                  top: 46,
                  left: 0,
                  width: 260,
                  background:
                    '#FFF9C4',
                  border:
                    '1px solid #e6c200',
                  borderRadius: 6,
                  overflow:
                    'hidden',
                }}
              >
                <div
                  style={{
                    height: 8,
                    background:
                      '#FFD700',
                  }}
                />
  
                <div
                  style={{
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color:
                        '#777',
                      marginBottom:
                        10,
                    }}
                  >
                    NOTE {index + 1}
                  </div>
  
                  <div
                    style={{
                      whiteSpace:
                        'pre-wrap',
                      color:
                        '#333',
                    }}
                  >
                    {note}
                  </div>
  
                  <div
                    style={{
                      display:
                        'flex',
                      gap: 8,
                      marginTop:
                        16,
                    }}
                  >
                    <button
                      onClick={() => {
                        const newText =
                          prompt(
                            'Edit note',
                            note
                          )
  
                        if (
                          newText !==
                            null &&
                          newText.trim()
                        ) {
                          onEdit(
                            index,
                            newText
                          )
                        }
                      }}
                    >
                      ✏️ Edit
                    </button>
  
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            'Delete note?'
                          )
                        ) {
                          onDelete(
                            index
                          )
                        }
                      }}
                    >
                      🗑 Delete
                    </button>
  
                    <button
                      onClick={() =>
                        setOpen(
                          false
                        )
                      }
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Html>
      </mesh>
    )
  }

  function useModel(file) {
    const [scene, setScene] = useState(null)
  
    useEffect(() => {
      if (!file) return
  
      let loader
  
      const ext = file
        .split('?')[0]
        .split('.')
        .pop()
        .toLowerCase()
  
      if (ext === 'obj') {
        loader = new OBJLoader()
      } else if (ext === 'fbx') {
        loader = new FBXLoader()
      } else {
        loader = new GLTFLoader()
      }
  
      loader.load(
        file,
  
        (result) => {
          const loadedScene =
            result.scene || result
  
          loadedScene.scale.set(
            0.01,
            0.01,
            0.01
          )
  
          loadedScene.position.set(
            0,
            -1,
            0
          )
  
          loadedScene.traverse(
            (child) => {
              if (
                child.material
              ) {
                child.material =
                  child.material.clone()
              }
            }
          )
  
          setScene(
            loadedScene
          )
        },
  
        undefined,
  
        (error) => {
          console.error(
            'Model load error:',
            error
          )
        }
      )
  
      return () => {
        setScene(null)
      }
    }, [file])
  
    return scene
  }
  
  function Room({
    file,
    color,
    isAddingPin,
    onAddPin,
  }) {
    const scene =
      useModel(file)
  
    function handleClick(
      e
    ) {
      e.stopPropagation()
  
      if (
        isAddingPin
      ) {
        onAddPin(
          e.point
        )
  
        return
      }
  
      if (
        e.object
          .material
      ) {
        e.object.material =
          e.object.material.clone()
  
        e.object.material.color.set(
          color
        )
      }
    }
  
    if (!scene) {
      return null
    }
  
    return (
      <primitive
        object={scene}
        onClick={handleClick}
      />
    )
  }

  

  


export default function Viewer({
  file,
  onBack,
}) {
  const [color, setColor] =
    useState('#ff0000')

  const [pins, setPins] =
    useState([])

  const [isAddingPin, setIsAddingPin] =
    useState(false)

  const [pendingPin, setPendingPin] =
    useState(null)

  const [noteText, setNoteText] =
    useState('')

  function savePin() {
    if (
      !pendingPin ||
      !noteText.trim()
    )
      return

    setPins([
      ...pins,
      {
        position: pendingPin,
        note: noteText,
      },
    ])

    setPendingPin(null)
    setNoteText('')
  }

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 1000,
          display: 'flex',
          gap: 12,
          background: '#111',
          padding: 16,
          borderRadius: 16,
        }}
      >
        <button onClick={onBack}>
          ← Back
        </button>

        <input
          type="color"
          value={color}
          onChange={(e) =>
            setColor(
              e.target.value
            )
          }
        />

        <button
          onClick={() =>
            setIsAddingPin(
              !isAddingPin
            )
          }
        >
          📌 Note
        </button>
      </div>

      {pendingPin && (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%) rotate(-1deg)',
      zIndex: 3000,
      width: 340,
      background: '#FFF9C4',
      borderRadius: '6px',
      overflow: 'hidden',
      boxShadow:
        '0 18px 50px rgba(0,0,0,.3)',
      border:
        '1px solid #e6c200',
    }}
  >
    {/* tape */}
    <div
      style={{
        height: 10,
        background:
          '#FFD700',
      }}
    />

    <div
      style={{
        padding: 18,
      }}
    >
      <div
        style={{
          color: '#888',
          fontSize: 11,
          fontWeight: '700',
          marginBottom: 12,
          letterSpacing:
            '.08em',
        }}
      >
        NEW STICKY NOTE
      </div>

      <textarea
        value={noteText}
        onChange={(e) =>
          setNoteText(
            e.target.value
          )
        }
        rows={6}
        placeholder="Example:
• Make this wall warmer
• Replace sofa
• Increase lighting"
        style={{
          width: '100%',
          resize: 'none',
          border: 'none',
          background:
            'transparent',
          outline: 'none',
          fontSize: 15,
          lineHeight: 1.8,
          color: '#333',
          fontFamily:
            'sans-serif',
          boxSizing:
            'border-box',
        }}
        autoFocus
      />

      <div
        style={{
          display: 'flex',
          justifyContent:
            'space-between',
          marginTop: 18,
        }}
      >
        <button
          onClick={() => {
            setPendingPin(
              null
            )
            setNoteText('')
          }}
          style={{
            background:
              'white',
            border:
              '1px solid #ddd',
            padding:
              '10px 16px',
            borderRadius:
              8,
            cursor:
              'pointer',
          }}
        >
          Cancel
        </button>

        <button
          onClick={savePin}
          style={{
            background:
              '#FFD700',
            border:
              'none',
            padding:
              '10px 18px',
            borderRadius:
              8,
            fontWeight:
              'bold',
            cursor:
              'pointer',
          }}
        >
          📌 Stick Note
        </button>
      </div>
    </div>

    {/* folded corner */}
    <div
      style={{
        position:
          'absolute',
        right: 0,
        bottom: 0,
        width: 18,
        height: 18,
        background:
          '#e6c200',
        borderRadius:
          '6px 0 0 0',
      }}
    />
  </div>
)}

      <Canvas
        camera={{
          position: [0, 2, 8],
        }}
        style={{
          background:
            'black',
        }}
      >
        <ambientLight intensity={2} />

        <directionalLight
          position={[5, 5, 5]}
        />

<Room
  file={file}
  color={color}
  isAddingPin={isAddingPin}
  onAddPin={(point) => {
    setPendingPin(point)
    setIsAddingPin(false)
  }}
/>

        {pins.map(
          (pin, i) => (
            <StickyPin
              key={i}
              position={[
                pin.position.x,
                pin.position.y,
                pin.position.z,
              ]}
              note={pin.note}
              index={i}
            />
          )
        )}

<OrbitControls
  rotateSpeed={0.4}
  zoomSpeed={0.6}
  panSpeed={0.5}
  dampingFactor={0.12}
  enableDamping
/>
      </Canvas>
    </>
  )
}