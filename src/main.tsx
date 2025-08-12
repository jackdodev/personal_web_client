import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouterPage from './pages/RouterPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterPage />
  </StrictMode>,
)
