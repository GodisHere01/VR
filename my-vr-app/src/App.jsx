import { useState } from 'react'
import Landing from './Landing'
import Viewer from './Viewer'

export default function App() {
  const [modelUrl, setModelUrl] = useState(null)

  if (modelUrl) {
    return <Viewer modelUrl={modelUrl} onBack={() => setModelUrl(null)} />
  }

  return <Landing onFileLoaded={setModelUrl} />
}