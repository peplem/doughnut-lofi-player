import type { PlayerStatus } from '../types'

interface ControlsProps {
  status: PlayerStatus
  volume: number
  onToggle: () => void
  onNext: () => void
  onPrev: () => void
  onVolumeChange: (v: number) => void
}

export function Controls({ status, volume, onToggle, onNext, onPrev, onVolumeChange }: ControlsProps) {
  return (
    <div className="controls">
      <div className="transport">
        <button className="nes-btn" onClick={onPrev} aria-label="Previous">
          ◄◄
        </button>
        <button
          className={`nes-btn ${status === 'playing' ? 'is-warning' : 'is-success'} play-btn`}
          onClick={onToggle}
          aria-label={status === 'playing' ? 'Pause' : 'Play'}
        >
          {status === 'playing' ? '❚❚' : '▶'}
        </button>
        <button className="nes-btn" onClick={onNext} aria-label="Next">
          ►►
        </button>
      </div>
      <div className="volume-row">
        <span className="vol-icon">♪</span>
        <input
          type="range"
          className="nes-range"
          min={0}
          max={100}
          step={5}
          value={volume}
          onChange={e => onVolumeChange(parseInt(e.target.value, 10))}
          aria-label="Volume"
        />
      </div>
    </div>
  )
}
