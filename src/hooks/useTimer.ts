import { useState, useRef, useEffect } from 'react'

const DEFAULT = 25 * 60

export function useTimer() {
  const [seconds, setSeconds] = useState(DEFAULT)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) { setRunning(false); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current!)
  }, [running])

  const start = () => { if (seconds > 0) setRunning(true) }
  const stop  = () => setRunning(false)
  const reset = () => { setRunning(false); setSeconds(DEFAULT) }
  const adjust = (min: number) => {
    if (!running) setSeconds(s => Math.max(5 * 60, Math.min(120 * 60, s + min * 60)))
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return { display: `${mm}:${ss}`, running, seconds, start, stop, reset, adjust }
}
