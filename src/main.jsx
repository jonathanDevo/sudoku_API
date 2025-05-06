import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { JuegoSudoku } from './components/Sudoku'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <JuegoSudoku />
  </StrictMode>,
)
