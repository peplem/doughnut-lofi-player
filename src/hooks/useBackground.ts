import { useState, useEffect } from 'react'
import { backgrounds } from '../data/backgrounds'

export function useBackground() {
  const [index, setIndex] = useState(0)

  const next = () => setIndex(i => (i + 1) % backgrounds.length)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'g' || e.key === 'G') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return { src: backgrounds[index], next }
}
