import { useRef } from 'react'

export default function Landing({ onFileLoaded }) {
  const inputRef = useRef()

  const handleFile = (file) => {
    if (!file) return
    if (!file.name.endsWith('.glb') && !file.name.endsWith('.gltf')) {
      alert('Please upload a .glb or .gltf file')
      return
    }
    const url = URL.createObjectURL(file)
    onFileLoaded(url)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleInputChange = (e) => {
    const file = e.target.files[0]
    handleFile(file)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 40px',
        borderBottom: '1px solid #1a1a1a',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: '#FFD700',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#0a0a0a'
          }}>S</div>
          <span style={{
            color: 'white',
            fontWeight: '600',
            fontSize: '18px',
            letterSpacing: '-0.02em'
          }}>SpaceView</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ color: '#666', fontSize: '14px' }}>For interior designers & architects</span>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center',
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: '20px',
          padding: '6px 14px',
          marginBottom: '32px',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
          <span style={{ color: '#888', fontSize: '13px' }}>Now in early access</span>
        </div>

        {/* Headline */}
        <h1 style={{
          color: 'white',
          fontSize: '56px',
          fontWeight: '700',
          lineHeight: '1.1',
          margin: '0 0 20px',
          letterSpacing: '-0.03em',
          maxWidth: '700px',
        }}>
          Walk through your design
          <span style={{ color: '#FFD700' }}> before it's built</span>
        </h1>

        {/* Subheadline */}
        <p style={{
          color: '#888',
          fontSize: '18px',
          lineHeight: '1.6',
          maxWidth: '500px',
          margin: '0 0 48px',
        }}>
          Upload your 3D model and let clients explore, review, and approve their space in an immersive walkthrough — no app install needed.
        </p>

        {/* Upload zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => inputRef.current.click()}
          style={{
            width: '100%',
            maxWidth: '520px',
            border: '2px dashed #2a2a2a',
            borderRadius: '16px',
            padding: '48px 32px',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
            background: '#111',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#FFD700'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}
        >
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>📁</div>
          <p style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 8px',
          }}>
            Drop your 3D file here
          </p>
          <p style={{ color: '#555', fontSize: '14px', margin: '0 0 24px' }}>
            Supports .glb and .gltf files
          </p>
          <button style={{
            background: '#FFD700',
            color: '#0a0a0a',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 28px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
          }}>
            Browse files
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".glb,.gltf"
            style={{ display: 'none' }}
            onChange={handleInputChange}
          />
        </div>

        {/* Feature pills */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '40px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {[
            '🎨 Change wall colours',
            '📌 Leave sticky notes',
            '🥽 VR headset ready',
            '🔗 Share with clients',
          ].map((feature) => (
            <div key={feature} style={{
              background: '#111',
              border: '1px solid #1a1a1a',
              borderRadius: '20px',
              padding: '8px 16px',
              color: '#888',
              fontSize: '13px',
            }}>
              {feature}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}