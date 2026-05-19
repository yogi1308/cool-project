import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactFlowProvider } from '@xyflow/react'
import './index.css'
import App from './components/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactFlowProvider> {/* Provides React Flow context for hooks and coordinate transformations */}
      <App />
    </ReactFlowProvider>
  </StrictMode>,
)
