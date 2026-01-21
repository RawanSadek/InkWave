import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthcontextProvider } from './Contexts/AuthContext/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthcontextProvider><App /></AuthcontextProvider>
  // <StrictMode>
  // </StrictMode>,
)
