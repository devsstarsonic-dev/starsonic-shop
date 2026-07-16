import { Play } from '../icons.jsx'
import Wave from './Wave.jsx'

// Capa gerada por gradiente (sem imagem real) + wave decorativo + overlay de play no hover.
export default function CoverArt({ gradient, seed = 1, onPlay, radius, className = '', style }) {
  return (
    <div className={`mkt-cover ${className}`} style={{ background: gradient, borderRadius: radius, ...style }}>
      <div className="flex flex-col justify-end w-full h-full p-3" style={{ opacity: .85 }}>
        <Wave bars={8} height={20} seed={seed} purple={seed % 2 === 0} />
      </div>
      {onPlay && (
        <div className="mkt-cover-overlay">
          <button
            type="button"
            className="mkt-play-btn"
            aria-label="Tocar prévia"
            onClick={(e) => { e.stopPropagation(); onPlay() }}
          >
            <Play size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
