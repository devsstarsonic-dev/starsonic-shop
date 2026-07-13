import { useMemo, useState } from 'react'
import { useApi } from '../hooks/useApi.js'
import { getPurchases } from '../api/index.js'

const MusicNote = ({ size = 24 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="#0a0a2e"><path d="M9 19V6l12-3v13" /></svg>)
const PlayGlyph = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="#22d3ee"><path d="M8 5v14l11-7z" /></svg>)
const UserGlyph = () => (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>)
const ClockGlyph = () => (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>)
const DownloadGlyph = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" /></svg>)
const DotsGlyph = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>)

export default function Purchases() {
  const { data: purchases } = useApi(getPurchases)
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('recent')

  const items = useMemo(() => {
    let list = (purchases ?? []).slice()
    list.sort((a, b) => {
      if (sort === 'artist') return a.artist.localeCompare(b.artist, 'pt-BR') || b.date.localeCompare(a.date)
      const d = a.date.localeCompare(b.date)
      return sort === 'old' ? d : -d
    })
    const term = q.trim().toLowerCase()
    if (term) list = list.filter((s) => (s.title + ' ' + s.artist + ' ' + s.genre).toLowerCase().includes(term))
    return list
  }, [purchases, q, sort])

  return (
    <>
      <div id="libStats" className="grid grid-cols-3 gap-3 mb-5">
        <div className="lib-stat">
          <div className="ic avatar-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="#0a0a2e"><path d="M9 19V6l12-3v13" /><circle cx="6" cy="19" r="3" /><circle cx="18" cy="16" r="3" /></svg></div>
          <div><p className="text-white text-sm font-bold leading-tight">3 músicas</p><p className="text-slate-400 text-[11px]">na sua biblioteca</p></div>
        </div>
        <div className="lib-stat">
          <div className="ic avatar-4"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a2e" strokeWidth="2.5"><path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" /></svg></div>
          <div><p className="text-white text-sm font-bold leading-tight">Downloads ilimitados</p><p className="text-slate-400 text-[11px]">baixe quantas vezes quiser</p></div>
        </div>
        <div className="lib-stat">
          <div className="ic avatar-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
          <div><p className="text-white text-sm font-bold leading-tight">1 licença comercial</p><p className="text-slate-400 text-[11px]">uso liberado em campanhas</p></div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="lib-search flex-1" style={{ minWidth: 220 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          <input id="libSearch" type="text" className="input-star text-sm" placeholder="Buscar por música, artista ou estilo..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select id="libSort" className="input-star text-xs" style={{ width: 'auto', padding: '8px 12px' }} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="recent">Mais recentes</option><option value="old">Mais antigas</option><option value="artist">Por artista</option>
        </select>
      </div>

      <div id="libList" className="space-y-3">
        {items.map((s) => (
          <div key={s.id} className="music-card lib-item p-4 md:p-5">
            <div className="flex items-center gap-4">
              <div className={`music-cover ${s.avatar}`} title="Ouvir prévia">
                <MusicNote />
                <div className="cover-play"><PlayGlyph /></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="text-white font-bold truncate text-[15px]">{s.title}</p>
                  <span className={`${s.license === 'COMERCIAL' ? 'badge-done' : 'badge-paid'} text-[10px]`}>{s.license}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400 text-xs flex-wrap">
                  <span className="flex items-center gap-1"><UserGlyph />{s.artist}</span>
                  <span className="chip-genre">{s.genre}</span>
                  <span className="flex items-center gap-1"><ClockGlyph />{s.duration}</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1.5">Comprada em {s.dateLabel} · <span className="text-slate-400 font-medium">{s.price}</span></p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="btn-primary px-4 py-2.5 rounded-lg text-xs flex items-center gap-2">
                  <DownloadGlyph />
                  {s.license === 'COMERCIAL' ? <>Baixar <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg></> : 'Baixar MP3'}
                </button>
                <button className="btn-secondary px-3 py-2.5 rounded-lg text-xs"><DotsGlyph /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div id="libEmpty" className="card p-8 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          </div>
          <p className="text-white text-sm font-semibold mb-1">Nenhuma música encontrada</p>
          <p className="text-slate-400 text-xs">Nada na sua biblioteca combina com "<span className="text-cyan-400">{q}</span>". Tente outro termo.</p>
        </div>
      )}

      <div id="libCta" className="card p-5 mt-6 flex items-center gap-4">
        <div className="w-11 h-11 rounded-lg avatar-2 flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-semibold">Descubra novas músicas</p>
          <p className="text-slate-400 text-xs">Milhares de artistas brasileiros com música original</p>
        </div>
        <button className="btn-primary px-4 py-2 rounded-lg text-xs">Explorar Starsonic Shop</button>
      </div>
    </>
  )
}
