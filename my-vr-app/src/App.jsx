import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Auth from './Auth'
import Landing from './Landing'
import Viewer from './Viewer'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setFile(null)
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        Loading...
      </div>
    )
  }

  if (!session) return <Auth />

  if (file) return <Viewer file={file} onBack={() => setFile(null)} onLogout={handleLogout} />

  return <Landing onFileLoaded={setFile} onLogout={handleLogout} />
}