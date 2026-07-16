import { useNavigate } from 'react-router-dom'
import { Check } from '../icons.jsx'

export default function ComposerCard({ composer, delay = 0 }) {
  const navigate = useNavigate()
  return (
    <div
      className="card mkt-card p-5 stagger-item"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => navigate(`/compositor/${composer.slug}`)}
      role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/compositor/${composer.slug}`) }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${composer.avatar}`}>
          <span className="text-white font-black text-xl">{composer.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-white font-bold truncate">{composer.name}</p>
            {composer.verified && <span className="badge-cyan" style={{ padding: '2px 6px', fontSize: 8 }}><Check size={9} /> Verificado</span>}
          </div>
          <p className="text-slate-500 text-xs">{composer.location}</p>
          <p className="text-slate-400 text-xs mt-1 truncate">{composer.specialties.join(' · ')}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
        <div><p className="text-slate-500 text-[9px] uppercase tracking-widest">Artistas</p><p className="text-white text-sm font-bold">{composer.stats.artists}</p></div>
        <div><p className="text-slate-500 text-[9px] uppercase tracking-widest">Músicas</p><p className="text-white text-sm font-bold">{composer.stats.songs}</p></div>
        <div><p className="text-slate-500 text-[9px] uppercase tracking-widest">Streams</p><p className="text-white text-sm font-bold">{composer.stats.streams}</p></div>
      </div>
    </div>
  )
}
