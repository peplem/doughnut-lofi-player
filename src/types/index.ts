export interface Track {
  id: number
  title: string
  url: string
  youtubeId: string
}

export type PlayerStatus = 'playing' | 'paused' | 'stopped'
