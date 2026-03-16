import { useState } from 'react'
import './App.css'
import Button from '../components/button.jsx'

function App() {
  const colors = [
    { label: 'Red', value: '#ef4444' },
    { label: 'Blue', value: '#3b82f6' },
    { label: 'Green', value: '#22c55e' },
    { label: 'Purple', value: '#a855f7' },
    { label: 'Orange', value: '#f97316' },
    { label: 'Black', value: '#111827' },
  ]

  const [bgColor, setBgColor] = useState(colors[0].value)

  return (
    <main className="app" style={{ backgroundColor: bgColor }}>
      <section className="panel">
        <p className="eyebrow">Background Changer</p>
        <h1>Click any button to change the background color</h1>
        <p className="subtitle">Create one button component and reuse it as many times as you want.</p>

        <div className="button-row">
          {colors.map((color) => (
            <Button
              key={color.value}
              label={color.label}
              color={color.value}
              isActive={bgColor === color.value}
              onClick={() => setBgColor(color.value)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
