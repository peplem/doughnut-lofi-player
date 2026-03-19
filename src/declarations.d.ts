declare module '*.css'
declare module 'nes.css/css/nes.css'

interface Window {
  onYouTubeIframeAPIReady?: () => void
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}
