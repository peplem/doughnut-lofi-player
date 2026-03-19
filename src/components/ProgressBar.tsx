interface ProgressBarProps {
  elapsed: number
  duration: number
  onSeek: (seconds: number) => void
}

function fmt(s: number): string {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function ProgressBar({ elapsed, duration, onSeek }: ProgressBarProps) {
  const pct = duration > 0 ? Math.min((elapsed / duration) * 100, 100) : 0

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    onSeek(Math.round(ratio * duration))
  }

  return (
    <div className="progress-section">
      <div className="progress-bar-track" onClick={handleClick} role="slider" aria-valuenow={elapsed} aria-valuemin={0} aria-valuemax={duration}>
        <progress className="nes-progress is-primary" value={pct} max={100} />
      </div>
      <div className="time-labels">
        <span>{fmt(elapsed)}</span>
        <span>{fmt(duration)}</span>
      </div>
    </div>
  )
}
