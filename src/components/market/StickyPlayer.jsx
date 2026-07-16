import { usePlayer } from '../../player/PlayerContext.jsx'
import { Play, X } from '../icons.jsx'
import Wave from './Wave.jsx'

export default function StickyPlayer() {
  const { track, visible, hide } = usePlayer()
  if (!track) return null

  return (
    <div className={`sticky-player${visible ? ' show' : ''}`} role="region" aria-label="Player de música">
      <div className="w-12 h-12 rounded-lg flex-shrink-0" style={{ background: track.gradient }} />
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-bold truncate">{track.title}</p>
        <p className="text-slate-500 text-xs truncate">{track.artist}</p>
      </div>
      <div className="hidden sm:block" style={{ width: 140 }}>
        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full" style={{ background: 'linear-gradient(90deg, var(--brand-cyan), var(--brand-violet))', width: '34%' }} />
        </div>
      </div>
      <button className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--brand-cyan), var(--brand-violet))', color: 'var(--brand-purple-deep)' }} aria-label="Tocar/pausar">
        <Play size={14} />
      </button>
      <button onClick={hide} className="text-slate-500 hover:text-white flex-shrink-0" aria-label="Fechar player">
        <X size={16} />
      </button>
    </div>
  )
}
