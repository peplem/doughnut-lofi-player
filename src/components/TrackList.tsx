import type { Track } from '../types'

interface TrackListProps {
  tracks: Track[]
  currentIndex: number
  onSelect: (index: number) => void
}

export function TrackList({ tracks, currentIndex, onSelect }: TrackListProps) {
  return (
    <div className="track-list nes-container">
      <p className="title">PLAYLIST</p>
      <ul>
        {tracks.map((track, i) => (
          <li
            key={track.id}
            className={`track-item ${i === currentIndex ? 'active' : ''}`}
            onClick={() => onSelect(i)}
          >
            <span className="track-cursor">{i === currentIndex ? '▶' : '\u00a0\u00a0'}</span>
            <span className="track-num">{String(i + 1).padStart(2, '0')}.</span>
            <span className="track-title">{track.title}</span>
            <a className="track-link-sm" href={track.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>↗</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
