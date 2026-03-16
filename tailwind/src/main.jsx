import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Card from '../components/Card.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <br></br>
    <Card name="Abhishek" button="Contact me" />
    <Card name="Lucky" button="About me" />
  </StrictMode>,
)
