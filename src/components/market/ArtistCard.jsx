import { useNavigate } from 'react-router-dom'
import { Star } from '../icons.jsx'
import { useToast } from '../Toast.jsx'

export default function ArtistCard({ artist, delay = 0 }) {
  const navigate = useNavigate()
  const showToast = useToast()

  return (
    <div
      className="card mkt-card p-5 text-center stagger-item"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => navigate(`/artista/${artist.slug}`)}
      role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/artista/${artist.slug}`) }}
    >
      <div className={`w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center ${artist.avatar}`}>
        <span className="text-white font-bold text-xl">{artist.initials}</span>
      </div>
      <p className="text-white font-bold text-sm mb-1 flex items-center justify-center gap-1">
        {artist.name} {artist.verified && <span style={{ color: 'var(--brand-cyan)' }}><Star size={13} /></span>}
      </p>
      <p className="text-slate-500 text-xs mb-3">{artist.genre}</p>
      <div className="flex items-center justify-center gap-4 pb-3 border-b border-white/5 mb-3">
        <div>
          <p className="text-white text-lg font-black" style={{ fontVariantNumeric: 'tabular-nums' }}>{artist.monthly}</p>
          <p className="text-slate-500 text-[10px]">streams/mês</p>
        </div>
        <div>
          <p className="text-white text-lg font-black">{artist.catalog.length}</p>
          <p className="text-slate-500 text-[10px]">músicas</p>
        </div>
      </div>
      <button
        type="button"
        className="btn-secondary w-full justify-center py-1.5 rounded-lg text-xs"
        onClick={(e) => { e.stopPropagation(); showToast('Seguindo!', `Agora você segue ${artist.name}`) }}
      >
        + Seguir
      </button>
    </div>
  )
}
