import { useRef, useState } from 'react'

export default function Landing({ onFileLoaded, onLogout }) {
const inputRef = useRef()

const [dragging, setDragging] = useState(false)
const [selectedFile, setSelectedFile] =
useState('')

const handleFile = (file) => {
if (!file) return
const valid =
  file.name.toLowerCase().endsWith('.glb') ||
  file.name.toLowerCase().endsWith('.gltf') ||
  file.name.toLowerCase().endsWith('.obj') ||
  file.name.toLowerCase().endsWith('.fbx')
const validExtensions = ['.glb', '.gltf', '.obj', '.fbx']
  const hasValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
  if (!hasValidExt) {
    alert('Please upload a .glb, .gltf, .obj, or .fbx file')
    return
  }

setSelectedFile(file.name)

const url = URL.createObjectURL(file)

setTimeout(() => {
  onFileLoaded(url)
}, 700)


}

const handleDrop = (e) => {
e.preventDefault()


setDragging(false)

const file = e.dataTransfer.files[0]

handleFile(file)


}

return (
<div
style={{
minHeight: '100vh',
background:
'linear-gradient(180deg,#070707,#111)',
display: 'flex',
flexDirection: 'column'
}}
>
<nav
style={{
display: 'flex',
justifyContent:
'space-between',
alignItems: 'center',
padding: '24px 48px',
borderBottom:
'1px solid rgba(255,255,255,.06)'
}}
>
<div
style={{
display: 'flex',
gap: 12,
alignItems: 'center'
}}
>
<div
style={{
width: 34,
height: 34,
background: '#FFD700',
borderRadius: 8,
display: 'grid',
placeItems: 'center',
color: '#000',
fontWeight: 800
}}
>
S </div>

```
      <div
        style={{
          color: 'white',
          fontWeight: 700,
          fontSize: 20
        }}
      >
        SpaceView
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
  <span style={{ color: '#666', fontSize: 14 }}>Interior • Architecture • VR</span>
  <button
    onClick={onLogout}
    style={{
      background: 'none',
      border: '1px solid #2a2a2a',
      borderRadius: '8px',
      padding: '7px 14px',
      color: '#666',
      fontSize: '13px',
      cursor: 'pointer',
    }}
  >
    Log out
  </button>
</div>
  </nav>

  <div
    style={{
      flex: 1,
      display: 'flex',
      justifyContent:
        'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: 20
    }}
  >
    <div
      style={{
        color: '#4ade80',
        marginBottom: 24,
        fontSize: 13
      }}
    >
      ● Early Access
    </div>

    <h1
      style={{
        color: 'white',
        fontSize: 64,
        lineHeight: 1.05,
        textAlign: 'center',
        margin: 0,
        maxWidth: 900
      }}
    >
      Walk through your design
      <br />

      <span
        style={{
          color: '#FFD700'
        }}
      >
        before it's built
      </span>
    </h1>

    <p
      style={{
        color: '#777',
        fontSize: 18,
        marginTop: 28,
        textAlign: 'center',
        maxWidth: 700
      }}
    >
      Upload a model and let
      clients explore, review,
      approve, and experience
      spaces before construction.
    </p>

    <div
      onClick={() =>
        inputRef.current.click()
      }
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() =>
        setDragging(false)
      }
      onDrop={handleDrop}
      style={{
        marginTop: 50,
        width: 580,
        maxWidth: '90%',
        border:
          dragging
            ? '2px solid #FFD700'
            : '2px dashed rgba(255,255,255,.12)',
        background:
          dragging
            ? '#17120a'
            : '#111',
        borderRadius: 24,
        padding: 50,
        textAlign: 'center',
        cursor: 'pointer',
        transition:
          'all .2s ease'
      }}
    >
      <div
        style={{
          fontSize: 44
        }}
      >
        {dragging
          ? '🚀'
          : '📁'}
      </div>

      <div
        style={{
          color: 'white',
          fontSize: 22,
          marginTop: 16,
          fontWeight: 600
        }}
      >
        Upload your 3D model
      </div>

      <div
        style={{
          color: '#666',
          marginTop: 10
        }}
      >
        Drag & Drop .glb / .gltf / .obj / .fbx
      </div>

      <button
        style={{
          marginTop: 28,
          background:
            '#FFD700',
          color: '#000',
          border: 0,
          padding:
            '14px 28px',
          borderRadius: 12,
          fontWeight: 700,
          cursor: 'pointer'
        }}
      >
        Browse files
      </button>

      {selectedFile && (
        <div
          style={{
            marginTop: 18,
            color:
              '#4ade80',
            fontSize: 14
          }}
        >
          Loading:
          {' '}
          {selectedFile}
        </div>
      )}

      <input
        hidden
        ref={inputRef}
        type="file"
        accept=".glb,.gltf,.obj,.fbx"
        onChange={(e) =>
          handleFile(
            e.target.files[0]
          )
        }
      />
    </div>

    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 40,
        justifyContent:
          'center'
      }}
    >
      {[
        '🎨 Material Editing',
        '📌 Review Notes',
        '🥽 VR Ready',
        '🔗 Share Links'
      ].map((item) => (
        <div
          key={item}
          style={{
            color:
              '#888',
            background:
              '#111',
            padding:
              '10px 18px',
            borderRadius: 30,
            border:
              '1px solid rgba(255,255,255,.06)'
          }}
        >
          {item}
        </div>
      ))}
    </div>
  </div>
</div>
)
}
