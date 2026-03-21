import { useCallback, useEffect, useRef, useState } from 'react'

function createPassword(length, includeNumber, includeChar) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  let charSet = letters
  if (includeNumber) charSet += numbers
  if (includeChar) charSet += symbols

  let generated = ''
  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * charSet.length)
    generated += charSet[randomIndex]
  }

  return generated
}

function App() {
  const [length, setLength] = useState(8)
  const [includeNumber, setIncludeNumber] = useState(false)
  const [includeChar, setIncludeChar] = useState(false)
  const [password, setPassword] = useState(() => createPassword(8, false, false))
  const [copied, setCopied] = useState(false)
  const passwordRef = useRef(null)
  const copyTimeoutRef = useRef(null)

  const refreshPassword = useCallback(
    (nextLength = length, nextIncludeNumber = includeNumber, nextIncludeChar = includeChar) => {
      setPassword(createPassword(nextLength, nextIncludeNumber, nextIncludeChar))
    },
    [length, includeNumber, includeChar],
  )

  const selectPasswordField = useCallback(() => {
    if (!passwordRef.current) return

    passwordRef.current.focus()
    passwordRef.current.select()
    passwordRef.current.setSelectionRange(0, password.length)
  }, [password])

  const copyPassword = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(password)
    } catch {
      const area = document.createElement('textarea')
      area.value = password
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      document.body.removeChild(area)
    }

    selectPasswordField()
    setCopied(true)
    if (copyTimeoutRef.current) {
      window.clearTimeout(copyTimeoutRef.current)
    }
    copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 1200)
  }, [password, selectPasswordField])

  useEffect(() => {
    if (copied) {
      selectPasswordField()
    }
  }, [copied, selectPasswordField])

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen grid place-items-center px-6 py-10 bg-slate-950">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900/90 border border-slate-700 p-6 md:p-8 shadow-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
          Password Generator
        </h1>

        <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-2 mb-5">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            readOnly
            className="w-full bg-transparent text-lg text-emerald-300 font-mono px-2 outline-none"
          />
          <button
            onClick={copyPassword}
            className="shrink-0 px-3 py-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-slate-200 font-medium">Length</label>
            <span className="text-emerald-300 font-semibold">{length}</span>
          </div>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => {
              const newLength = Number(e.target.value)
              setLength(newLength)
              refreshPassword(newLength, includeNumber, includeChar)
            }}
            className="w-full accent-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => {
              const newValue = !includeNumber
              setIncludeNumber(newValue)
              refreshPassword(length, newValue, includeChar)
            }}
            className={`rounded-lg px-4 py-3 font-semibold transition ${
              includeNumber
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {includeNumber ? 'Numbers: ON' : 'Numbers: OFF'}
          </button>

          <button
            onClick={() => {
              const newValue = !includeChar
              setIncludeChar(newValue)
              refreshPassword(length, includeNumber, newValue)
            }}
            className={`rounded-lg px-4 py-3 font-semibold transition ${
              includeChar
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {includeChar ? 'Characters: ON' : 'Characters: OFF'}
          </button>
        </div>

        <button
          onClick={() => refreshPassword(length, includeNumber, includeChar)}
          className="w-full rounded-lg px-4 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold"
        >
          Generate New Password
        </button>
      </div>
    </div>
  )
}

export default App