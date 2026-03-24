import { useState } from 'react'
import { backgrounds } from '../data/backgrounds'

export function useBackground() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * backgrounds.length))

  const next = () => setIndex(Math.floor(Math.random() * backgrounds.length))

  return { src: backgrounds[index], next }
}
