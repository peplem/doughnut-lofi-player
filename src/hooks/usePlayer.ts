import { useState, useRef, useEffect, useCallback } from 'react'
import type { Track, PlayerStatus } from '../types'

interface UsePlayerReturn {
  currentTrack: Track
  trackIndex: number
  status: PlayerStatus
  volume: number
  toggle: () => void
  next: () => void
  prev: () => void
  setVolume: (v: number) => void
  selectTrack: (index: number) => void
}

export function usePlayer(tracks: Track[]): UsePlayerReturn {
  const [trackIndex, setTrackIndex] = useState(() => Math.floor(Math.random() * tracks.length))
  const [status, setStatus] = useState<PlayerStatus>('stopped')
  const [volume, setVolumeState] = useState(80)

  const ytRef = useRef<YT.Player | null>(null)
  const apiReadyRef = useRef(false)

  const currentTrack = tracks[trackIndex]

  function createPlayer(videoId: string) {
    ytRef.current = new YT.Player('yt-player', {
      videoId,
      playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, rel: 0 },
      events: {
        onReady: () => {
          apiReadyRef.current = true
          ytRef.current?.setVolume(volume)
          ytRef.current?.playVideo()
        },
        onStateChange: (e: YT.OnStateChangeEvent) => {
          if (e.data === YT.PlayerState.PLAYING) setStatus('playing')
          else if (e.data === YT.PlayerState.PAUSED) setStatus('paused')
          else if (e.data === YT.PlayerState.ENDED) setStatus('stopped')
        },
      },
    })
  }

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => createPlayer(currentTrack.youtubeId)
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!apiReadyRef.current || !ytRef.current) return
    ytRef.current.loadVideoById(currentTrack.youtubeId)
    setStatus('playing')
  }, [trackIndex, currentTrack.youtubeId])

  const toggle = useCallback(() => {
    if (status === 'playing') {
      ytRef.current?.pauseVideo()
      setStatus('paused')
    } else {
      ytRef.current?.playVideo()
      setStatus('playing')
    }
  }, [status])

  const next = useCallback(() => {
    setTrackIndex(i => (i + 1) % tracks.length)
  }, [tracks.length])

  const prev = useCallback(() => {
    setTrackIndex(i => (i - 1 + tracks.length) % tracks.length)
  }, [tracks.length])

  const setVolume = useCallback((v: number) => {
    setVolumeState(v)
    ytRef.current?.setVolume(v)
  }, [])

  const selectTrack = useCallback((index: number) => {
    setTrackIndex(index)
  }, [])

  return { currentTrack, trackIndex, status, volume, toggle, next, prev, setVolume, selectTrack }
}
