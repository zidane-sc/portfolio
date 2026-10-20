import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Marks that JS is alive, which is what unlocks the reveal animation.
// Without it the content renders plainly — that is the intended fallback.
document.documentElement.classList.add('js')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
