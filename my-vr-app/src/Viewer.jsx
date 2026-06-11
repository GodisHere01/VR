import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import { useState } from 'react'

function StickyPin({ position, note, index }) {
  const [open, setOpen] = useState(false)

  return (
    <mesh position={position}>
      <Html distanceFactor={8} style={{ pointerEvents: 'none' }}>

        {/* The sticky note icon — always visible */}
        <div
          onClick={() => setOpen(!open)}
          style={{
            pointerEvents: 'auto',
            cursor: 'pointer',
            width: '36px',
            height: '36px',
            background: '#FFD700',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
            color: '#333',
            boxShadow: '2px 2px 6px rgba(0,0,0,0.3)',
            border: '1px solid #e6c200',
            position: 'relative',
            userSelect: 'none',
          }}
        >
          {index + 1}
          {/* Folded corner effect */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '10px',
            height: '10px',
            background: '#e6c200',
            borderRadius: '4px 0 4px 0',
          }} />
        </div>

        {/* Expanded sticky note — shows when clicked */}
        {open && (
          <div style={{
            pointerEvents: 'auto',
            position: 'absolute',
            top: '44px',
            left: '0px',
            width: '200px',
            background: '#FFF9C4',
            border: '1px solid #e6c200',
            borderRadius: '4px',
            padding: '12px 14px',
            boxShadow: '3px 4px 12px rgba(0,0,0,0.25)',
            fontFamily: 'sans-serif',
          }}>
            {/* Sticky note top strip */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: '#FFD700',
              borderRadius: '4px 4px 0 0',
            }} />
            <p style={{
              margin: '8px 0 6px',
              fontWeight: 'bold',
              fontSize: '12px',
              color: '#888',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Note {index + 1}
            </p>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#333',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {note}
            </p>
            <p
              onClick={() => setOpen(false)}
              style={{
                margin: '10px 0 0',
                fontSize: '11px',
                color: '#999',
                cursor: 'pointer',
                textAlign: 'right',
              }}
            >
              close ✕
            </p>
          </div>
        )}
      </Html>
    </mesh>
  )
}

function Room({ color, onAddPin, isAddingPin }) {
  const model = useGLTF('/room.glb')

  const handleClick = (e) => {
    e.stopPropagation()
    if (isAddingPin) {
      onAddPin(e.point)
      return
    }
    const obj = e.object
    if (obj.material) {
      obj.material = obj.material.clone()
      obj.material.color.set(color)
      obj.material.roughness = 1
      obj.material.metalness = 0
      obj.material.needsUpdate = true
    }
  }

  return <primitive object={model.scene} onClick={handleClick} />
}

export default function Viewer({ modelUrl, onBack }) {
  const [color, setColor] = useState('#ff0000')
  const [pins, setPins] = useState([])
  const [isAddingPin, setIsAddingPin] = useState(false)
  const [pendingPin, setPendingPin] = useState(null)
  const [noteText, setNoteText] = useState('')

  const handleAddPin = (point) => {
    setPendingPin(point)
    setIsAddingPin(false)
  }

  const confirmPin = () => {
    if (!pendingPin || !noteText.trim()) return
    setPins([...pins, { position: pendingPin, note: noteText }])
    setPendingPin(null)
    setNoteText('')
  }

  const cancelPin = () => {
    setPendingPin(null)
    setNoteText('')
  }

  return (
    <>
      {/* Toolbar */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1000,
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          title="Pick wall colour"
        />
        <button
          onClick={() => setIsAddingPin(!isAddingPin)}
          style={{
            background: isAddingPin ? '#FFD700' : 'white',
            color: '#333',
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '7px 14px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '13px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
          }}
        >
          {isAddingPin ? '📌 Click room to place pin' : '📌 Add Sticky Note'}
        </button>
        {pins.length > 0 && (
          <span style={{
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '7px 14px',
            fontSize: '13px'
          }}>
            {pins.length} note{pins.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Note input popup */}
      {pendingPin && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#FFF9C4',
          border: '1px solid #e6c200',
          borderRadius: '8px',
          padding: '0',
          zIndex: 2000,
          minWidth: '280px',
          boxShadow: '3px 4px 16px rgba(0,0,0,0.25)',
          overflow: 'hidden'
        }}>
          {/* Yellow top strip */}
          <div style={{
            background: '#FFD700',
            padding: '10px 16px',
            fontWeight: '600',
            fontSize: '13px',
            color: '#333'
          }}>
            📌 New Sticky Note
          </div>
          <div style={{ padding: '16px' }}>
            <textarea
              placeholder="Write your note here... e.g. Change this wall to cream"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #e6c200',
                fontSize: '13px',
                background: '#FFFDE7',
                resize: 'none',
                boxSizing: 'border-box',
                fontFamily: 'sans-serif',
                outline: 'none'
              }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <button
                onClick={confirmPin}
                style={{
                  flex: 1,
                  background: '#FFD700',
                  color: '#333',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '9px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              >
                Save note
              </button>
              <button
                onClick={cancelPin}
                style={{
                  flex: 1,
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  padding: '9px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Canvas camera={{ position: [0, 2, 8] }} style={{ background: 'black' }}>
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Room
          color={color}
          onAddPin={handleAddPin}
          isAddingPin={isAddingPin}
        />
        {pins.map((pin, i) => (
          <StickyPin
            key={i}
            position={[pin.position.x, pin.position.y, pin.position.z]}
            note={pin.note}
            index={i}
          />
        ))}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </>
  )
}
