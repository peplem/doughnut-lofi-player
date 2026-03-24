import { useState } from 'react'
import { Player } from './components/Player'
import { AboutDialog } from './components/AboutDialog'
import { TimerWidget } from './components/TimerWidget'
import { useBackground } from './hooks/useBackground'
import logo from './assets/logo.png'

export default function App() {
  const { src: bgSrc, next: nextBg } = useBackground()
  const [aboutOpen, setAboutOpen] = useState(false)
  const [timerOpen, setTimerOpen] = useState(false)

  return (
    <>
      <img src={bgSrc} alt="" className="page-bg" />

      <main className="app-root">
        <img src={logo} alt="Doughnut Lofi FM" className="app-logo" />

        <div className="top-btns">
          <button className="nes-btn bg-btn" onClick={nextBg}>GIF</button>
          <button className="nes-btn bg-btn" onClick={() => setAboutOpen(true)}>ABOUT</button>
          <button className="nes-btn bg-btn" onClick={() => setTimerOpen(o => !o)}>TIMER</button>
        </div>

        {timerOpen && <TimerWidget />}

        <Player />
      </main>

      {aboutOpen && <AboutDialog onClose={() => setAboutOpen(false)} />}
    </>
  )
}
