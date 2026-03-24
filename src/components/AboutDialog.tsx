interface AboutDialogProps {
  onClose: () => void
}

export function AboutDialog({ onClose }: AboutDialogProps) {
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-box nes-container" onClick={e => e.stopPropagation()}>
        <p className="title">ABOUT</p>
        <p className="dialog-body">
          Hello! Welcome to Doughnut FM. This is a safe place where you can relax and enjoy some good lofi music and 
          some pretty 8bit visuals. Music is played from various youtube lofi live channels. Thanks to all the creators
          that keep those channels alive. 
          Advertisements are not controlled by Doughnut FM, since the music source is youtube. If you want to get rid of the ads
          please do your own research on the topic.
          <br/>
          <br/>
          Doughnut FM is built with ReactJS and NES.css, 8bit gifs are owned by their respective artists.
        </p>
        <button className="nes-btn is-error dialog-close" onClick={onClose}>CLOSE</button>
      </div>
    </div>
  )
}
