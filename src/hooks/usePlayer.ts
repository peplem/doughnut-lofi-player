import { useState, useRef, useEffect, useCallback } from 'react'
import type { Track, PlayerStatus } from '../types'

interface UsePlayerReturn {
  currentTrack: Track
  trackIndex: number
  status: PlayerStatus
  volume: number        // 0–100
  toggle: () => void
  next: () => void
  prev: () => void
  setVolume: (v: number) => void
  selectTrack: (index: number) => void
}

export function usePlayer(tracks: Track[]): UsePlayerReturn {
  const [trackIndex, setTrackIndex] = useState(0)
  const [status, setStatus] = useState<PlayerStatus>('stopped')
  const [volume, setVolumeState] = useState(80)

  const ytRef = useRef<YT.Player | null>(null)
  const apiReadyRef = useRef(false)
  const isFirstMount = useRef(true)

  const currentTrack = tracks[trackIndex]

  function createPlayer(videoId: string) {
    ytRef.current = new YT.Player('yt-player', {
      videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: () => {
          apiReadyRef.current = true
          ytRef.current?.setVolume(volume)
        },
        onStateChange: (e: YT.OnStateChangeEvent) => {
          if (e.data === YT.PlayerState.PLAYING) setStatus('playing')
          else if (e.data === YT.PlayerState.PAUSED) setStatus('paused')
          else if (e.data === YT.PlayerState.ENDED) setStatus('stopped')
        },
      },
    })
  }

  // Load YouTube IFrame API once on mount
  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => createPlayer(currentTrack.youtubeId)

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Load new video when trackIndex changes (skip first mount)
  useEffect(() => {
    if (isFirstMount.current) { isFirstMount.current = false; return }
    if (!apiReadyRef.current || !ytRef.current) return
    ytRef.current.loadVideoById(currentTrack.youtubeId)
    setStatus('playing')
  }, [trackIndex, currentTrack.youtubeId])

  const play = useCallback(() => {
    ytRef.current?.playVideo()
    setStatus('playing')
  }, [])

  const pause = useCallback(() => {
    ytRef.current?.pauseVideo()
    setStatus('paused')
  }, [])

  const toggle = useCallback(() => {
    status === 'playing' ? pause() : play()
  }, [status, play, pause])

  const next = useCallback(() => {
    setStatus('stopped')
    setTrackIndex(i => (i + 1) % tracks.length)
  }, [tracks.length])

  const prev = useCallback(() => {
    setStatus('stopped')
    setTrackIndex(i => (i - 1 + tracks.length) % tracks.length)
  }, [tracks.length])

  const setVolume = useCallback((v: number) => {
    setVolumeState(v)
    ytRef.current?.setVolume(v)
  }, [])

  const selectTrack = useCallback((index: number) => {
    setStatus('stopped')
    setTrackIndex(index)
  }, [])

  return { currentTrack, trackIndex, status, volume, toggle, next, prev, setVolume, selectTrack }
}

// ─── commented-out mock / audio-element / progress-bar implementation ──────────
//
// interface UsePlayerReturn {
//   ...
//   elapsed: number       // seconds
//   play: () => void
//   pause: () => void
//   seek: (seconds: number) => void
// }
//
// const [elapsed, setElapsed] = useState(0)
// const audioRef = useRef<HTMLAudioElement | null>(null)
// const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)
//
// // Sync audio element src when track changes
// useEffect(() => {
//   const audio = audioRef.current
//   if (!audio) return
//   if (currentTrack.src) { audio.src = currentTrack.src; audio.load() }
//   setElapsed(0)
// }, [trackIndex, currentTrack.src])
//
// // Mount audio element once
// useEffect(() => {
//   audioRef.current = new Audio()
//   audioRef.current.volume = volume / 100
//   return () => { audioRef.current?.pause(); audioRef.current = null }
// }, [])
//
// // Simulated tick for mock (no real audio src)
// const startTick = useCallback(() => {
//   if (tickRef.current) clearInterval(tickRef.current)
//   tickRef.current = setInterval(() => {
//     setElapsed(prev => {
//       if (prev >= currentTrack.duration - 1) {
//         clearInterval(tickRef.current!); setStatus('stopped'); return 0
//       }
//       return prev + 1
//     })
//   }, 1000)
// }, [currentTrack.duration])
//
// const stopTick = useCallback(() => {
//   if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null }
// }, [])
//
// const play = useCallback(() => {
//   const audio = audioRef.current
//   if (audio && currentTrack.src) { audio.play().catch(() => {}) } else { startTick() }
//   setStatus('playing')
// }, [currentTrack.src, startTick])
//
// const pause = useCallback(() => {
//   audioRef.current?.pause(); stopTick(); setStatus('paused')
// }, [stopTick])
//
// const next = useCallback(() => {
//   stopTick(); setStatus('stopped'); setElapsed(0)
//   setTrackIndex(i => (i + 1) % tracks.length)
// }, [tracks.length, stopTick])
//
// const prev = useCallback(() => {
//   stopTick(); setStatus('stopped'); setElapsed(0)
//   setTrackIndex(i => (i - 1 + tracks.length) % tracks.length)
// }, [tracks.length, stopTick])
//
// const seek = useCallback((seconds: number) => {
//   if (audioRef.current && currentTrack.src) audioRef.current.currentTime = seconds
//   setElapsed(seconds)
// }, [currentTrack.src])
//
// const selectTrack = useCallback((index: number) => {
//   stopTick(); setStatus('stopped'); setElapsed(0); setTrackIndex(index)
// }, [stopTick])
//
// return { ..., elapsed, play, pause, seek, ... }
