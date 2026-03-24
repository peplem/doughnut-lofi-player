import { useTimer } from '../hooks/useTimer'

export function TimerWidget() {
  const { display, running, start, stop, reset, adjust } = useTimer()

  return (
    <div className="timer-widget nes-container is-rounded">
      <div className="timer-display">{display}</div>
      <div className="timer-controls">
        <button className="nes-btn" onClick={() => adjust(-5)} disabled={running}>-5</button>
        <button className="nes-btn" onClick={() => adjust(+5)} disabled={running}>+5</button>
        {running
          ? <button className="nes-btn is-warning" onClick={stop}>STOP</button>
          : <button className="nes-btn is-success" onClick={start}>START</button>
        }
        <button className="nes-btn is-error" onClick={reset}>RESET</button>
      </div>
    </div>
  )
}
