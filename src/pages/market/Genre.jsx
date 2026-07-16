import { useMemo, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useApi } from '../../hooks/useApi.js'
import { getGenre, getCatalog } from '../../api/index.js'
import { formatCompact } from '../../lib/format.js'
import { Play } from '../../components/icons.jsx'
import { usePlayer } from '../../player/PlayerContext.jsx'
import TrackCard from '../../components/market/TrackCard.jsx'

export default function Genre() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { data: genre, loading } = useApi(() => getGenre(slug), [slug])
  const { data: allSongs } = useApi(getCatalog, [])
  const { play } = usePlayer()
  const [sub, setSub] = useState('todos')

  const songs = useMemo(() => {
    if (!allSongs) return []
    return allSongs.filter((s) => s.genreSlug === slug || s.subgenre.toLowerCase().startsWith((genre?.name ?? '').toLowerCase()))
  }, [allSongs, slug, genre])

  const top = useMemo(() => [...songs].sort((a, b) => b.streams - a.streams).slice(0, 5), [songs])

  if (loading || !allSongs) return null
  if (!genre) return <Navigate to="/explorar" replace />

  return (
    <div className="content-wrap">
      <div className="card p-8 md:p-10 mb-8 relative overflow-hidden" style={{ background: genre.gradient, border: 'none', minHeight: 220, boxShadow: 'var(--elev-2)' }}>
        <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-2">Gênero em destaque</p>
        <h1 className="text-white font-black leading-none mb-4" style={{ fontSize: 'clamp(40px,7vw,72px)', letterSpacing: '-.02em' }}>{genre.name}</h1>
        <div className="flex items-center gap-6 mb-6 flex-wrap">
          <div><p className="text-white text-3xl font-black">{genre.songCount}</p><p className="text-white/70 text-xs">músicas</p></div>
          <div><p className="text-white text-3xl font-black">{genre.artistCount}</p><p className="text-white/70 text-xs">artistas</p></div>
          <div><p className="text-white text-3xl font-black">{formatCompact(genre.streamsMonth)}</p><p className="text-white/70 text-xs">streams no mês</p></div>
        </div>
        <div className="flex gap-3">
          <button className="btn-ghost" style={{ background: '#fff', color: 'var(--brand-purple-deep)', padding: '12px 28px' }} onClick={() => top[0] && play({ title: top[0].title, artist: top[0].artistName, gradient: top[0].gradient })}>
            <Play size={16} /> Tocar tudo
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        <button className={`filter-chip${sub === 'todos' ? ' active' : ''}`} onClick={() => setSub('todos')}>Todos</button>
        {genre.subgenres.map((s) => (
          <button key={s} className={`filter-chip${sub === s ? ' active' : ''}`} onClick={() => setSub(s)}>{s}</button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2">
          <h3 className="text-white text-xl font-bold mb-4">🔥 Top do gênero</h3>
          <div className="card">
            {top.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 p-3 hover:bg-white/[.02] cursor-pointer border-b border-white/5 last:border-b-0 transition" onClick={() => navigate(`/musica/${s.id}`)}>
                <span className="text-3xl font-black w-8 flex-shrink-0" style={{ color: i === 0 ? 'var(--brand-cyan)' : '#64748b' }}>{i + 1}</span>
                <div className="w-12 h-12 rounded-lg flex-shrink-0" style={{ background: s.gradient }} />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm truncate">{s.title}</p>
                  <p className="text-slate-500 text-xs truncate">{s.artistName} · {formatCompact(s.streams)} streams</p>
                </div>
                <p className="price-pill font-bold flex-shrink-0">{(s.priceCents / 100).toFixed(2).replace('.', ',')}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Todas as músicas</h3>
          <p className="text-slate-400 text-xs mb-3">{songs.length} músicas em {genre.name}</p>
        </div>
      </div>

      <h3 className="text-white text-xl font-bold mb-4">Explorar {genre.name}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {songs.map((s, i) => <TrackCard key={s.id} song={s} delay={(i % 12) * 30} />)}
      </div>
    </div>
  )
}
