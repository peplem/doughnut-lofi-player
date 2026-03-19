import { usePlayer } from '../hooks/usePlayer'
import { tracks } from '../data/tracks'
import { Controls } from './Controls'
import { TrackList } from './TrackList'

export function Player() {
  const {
    currentTrack,
    trackIndex,
    status,
    volume,
    toggle,
    next,
    prev,
    setVolume,
    selectTrack,
  } = usePlayer(tracks)

  return (
    <>
      {/* Hidden YouTube IFrame player container */}
      <div id="yt-player" style={{ display: 'none' }} />

      <div className="player-shell nes-container is-rounded">
        <div className="player-body">
          <div className="track-info">
            <p className="track-name">{currentTrack.title}</p>
            <a className="track-link" href={currentTrack.url} target="_blank" rel="noopener noreferrer">go to ↗</a>
          </div>

          <Controls
            status={status}
            volume={volume}
            onToggle={toggle}
            onNext={next}
            onPrev={prev}
            onVolumeChange={setVolume}
          />
        </div>

        <TrackList tracks={tracks} currentIndex={trackIndex} onSelect={selectTrack} />
      </div>
    </>
  )
}
