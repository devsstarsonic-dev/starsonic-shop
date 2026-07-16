import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useApi } from '../../hooks/useApi.js'
import { getCatalog, getGenres } from '../../api/index.js'
import TrackCard from '../../components/market/TrackCard.jsx'
import PageHeader from '../../components/market/PageHeader.jsx'
import { Filter, X, Search } from '../../components/icons.jsx'

const SORTS = [
  { id: 'streams', label: '🔥 Mais tocadas' },
  { id: 'rating', label: '⭐ Melhor avaliadas' },
  { id: 'recent', label: '🆕 Mais recentes' },
  { id: 'price', label: '💰 Menor preço' },
]

export default function Explore() {
  const [params, setParams] = useSearchParams()
  const { data: songs } = useApi(getCatalog, [])
  const { data: genres } = useApi(getGenres)
  const [q, setQ] = useState(params.get('q') ?? '')
  const [activeGenres, setActiveGenres] = useState([])
  const [sort, setSort] = useState('streams')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const list = useMemo(() => {
    if (!songs) return []
    let out = songs.slice()
    if (q.trim()) {
      const term = q.trim().toLowerCase()
      out = out.filter((s) => (s.title + ' ' + s.artistName + ' ' + s.genre).toLowerCase().includes(term))
    }
    if (activeGenres.length) out = out.filter((s) => activeGenres.includes(s.genreSlug))
    if (sort === 'streams') out.sort((a, b) => b.streams - a.streams)
    if (sort === 'rating') out.sort((a, b) => b.rating - a.rating)
    if (sort === 'recent') out.sort((a, b) => b.releasedAt.localeCompare(a.releasedAt))
    if (sort === 'price') out.sort((a, b) => a.priceCents - b.priceCents)
    return out
  }, [songs, q, activeGenres, sort])

  const toggleGenre = (slug) => setActiveGenres((cur) => cur.includes(slug) ? cur.filter((g) => g !== slug) : [...cur, slug])

  if (!songs || !genres) return null

  const Filters = (
    <div className="card p-5 filters-panel">
      <div className="flex items-center justify-between mb-4">
        <p className="text-white font-bold">Filtros</p>
        {activeGenres.length > 0 && (
          <button className="text-xs font-bold" style={{ color: 'var(--brand-cyan)' }} onClick={() => setActiveGenres([])}>Limpar tudo</button>
        )}
      </div>
      <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-3">Gênero</p>
      <div className="space-y-2">
        {genres.map((g) => (
          <label key={g.slug}>
            <input type="checkbox" checked={activeGenres.includes(g.slug)} onChange={() => toggleGenre(g.slug)} style={{ accentColor: 'var(--brand-cyan)' }} />
            <span className={activeGenres.includes(g.slug) ? 'text-white text-sm' : 'text-slate-300 text-sm'}>{g.name} <span className="text-slate-500">({g.songCount})</span></span>
          </label>
        ))}
      </div>
    </div>
  )

  return (
    <div className="content-wrap">
      <PageHeader eyebrow="Catálogo completo" title="Explorar músicas" subtitle={`${songs.length} músicas disponíveis · Filtre e encontre a que combina com você`} />

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="hidden lg:block lg:col-span-1">{Filters}</div>

        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="market-search flex-1" style={{ maxWidth: 'none' }}>
              <Search size={15} />
              <input placeholder="Buscar por música, artista ou estilo..." value={q} onChange={(e) => { setQ(e.target.value); setParams(e.target.value ? { q: e.target.value } : {}) }} />
            </div>
            <button className="btn-ghost lg:hidden" onClick={() => setDrawerOpen(true)}><Filter size={14} /> Filtros{activeGenres.length > 0 && ` (${activeGenres.length})`}</button>
            <select className="input-star text-xs" style={{ width: 'auto', padding: '8px 12px' }} value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>

          {activeGenres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeGenres.map((slug) => {
                const g = genres.find((x) => x.slug === slug)
                return <span key={slug} className="filter-chip active" onClick={() => toggleGenre(slug)}>{g?.name} <X size={11} /></span>
              })}
            </div>
          )}

          <p className="text-slate-400 text-sm mb-4"><strong className="text-white">{list.length}</strong> músicas encontradas</p>

          {list.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-white text-sm font-semibold mb-1">Nenhuma música encontrada</p>
              <p className="text-slate-400 text-xs">Tente outro termo ou remova alguns filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {list.map((s, i) => <TrackCard key={s.id} song={s} delay={(i % 8) * 40} />)}
            </div>
          )}
        </div>
      </div>

      {/* Drawer mobile */}
      <div className={`filter-drawer-backdrop${drawerOpen ? ' open' : ''}`} onClick={() => setDrawerOpen(false)} />
      <div className={`filter-drawer${drawerOpen ? ' open' : ''}`} role="dialog" aria-label="Filtros" aria-hidden={!drawerOpen}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white font-bold text-lg">Filtros</p>
            <button onClick={() => setDrawerOpen(false)} aria-label="Fechar filtros" className="text-slate-400 hover:text-white"><X size={18} /></button>
          </div>
          {Filters}
        </div>
      </div>
    </div>
  )
}
