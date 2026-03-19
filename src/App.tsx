import { Player } from './components/Player'
import { useBackground } from './hooks/useBackground'
import logo from './assets/logo.png'

export default function App() {
  const { src: bgSrc, next: nextBg } = useBackground()

  return (
    <>
      <img src={bgSrc} alt="" className="page-bg" />

      <main className="app-root">
        <img src={logo} alt="Doughnut Lofi FM" className="app-logo" />
        <button className="nes-btn bg-btn" onClick={nextBg} title="Change background (G)">
          GIF
        </button>
        <Player />
      </main>
    </>
  )
}
