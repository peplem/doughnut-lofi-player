interface CoverArtProps {
  src: string | null
  title: string
}

export function CoverArt({ src, title }: CoverArtProps) {
  return (
    <div className="cover-art">
      {src ? (
        <img src={src} alt={title} />
      ) : (
        <div className="cover-placeholder" aria-label="No cover art">
          <span>♪</span>
        </div>
      )}
    </div>
  )
}
