import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../../hooks/useApi.js'
import { getPurchases, getFavoriteSongs, getPlaylists } from '../../api/index.js'
import { priceToCents } from '../../data/mock.js'
import { formatPrice } from '../../lib/format.js'
import Purchases from '../Purchases.jsx'
import StatTile from '../../components/market/StatTile.jsx'
import { MusicNote, Download, Heart, Play } from '../../components/icons.jsx'

const TABS = [
  { id: 'comprados', label: 'Comprados' },
  { id: 'curtidas', label: 'Curtidas' },
  { id: 'playlists', label: 'Playlists' },
  { id: 'historico', label: 'Histórico' },
]

export default function Library() {
  const navigate = useNavigate()
  const { data: purchases } = useApi(getPurchases)
  const { data: favorites } = useApi(getFavoriteSongs)
  const { data: playlists } = useApi(getPlaylists)
  const [tab, setTab] = useState('comprados')

  const gastoTotal = (purchases ?? []).reduce((sum, p) => sum + priceToCents(p.price), 0)

  return (
    <div className="content-wrap">
      <div className="card-highlight p-6 mb-6 flex items-center gap-4 flex-wrap">
        <div className="w-16 h-16 rounded-full avatar-4 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-2xl">AR</span>
        </div>
        <div className="flex-1 min-w-[200px]">
          <h1 className="text-white text-2xl font-bold">Olá, Ana 👋</h1>
          <p className="text-slate-400 text-sm">Membro desde jun/2026 · {(purchases ?? []).length} músicas na sua biblioteca</p>
        </div>
        <button className="btn-secondary px-4 py-2 rounded-lg text-xs" onClick={() => navigate('/conta/dados')}>Editar perfil</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatTile icon={<MusicNote size={18} />} label="Músicas compradas" value={(purchases ?? []).length} iconBg="avatar-1" />
        <StatTile icon={<Heart size={18} />} label="Curtidas" value={(favorites ?? []).length} iconBg="avatar-2" />
        <StatTile icon={<Play size={18} />} label="Playlists" value={(playlists ?? []).length} iconBg="avatar-5" />
        <StatTile icon={<Download size={18} />} label="Gasto total" value={formatPrice(gastoTotal)} iconBg="avatar-4" />
      </div>

      <div className="border-b border-white/5 flex gap-6 mb-6 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t.id} className={`tab-btn font-medium${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {tab === 'comprados' && <Purchases />}

      {tab === 'curtidas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(favorites ?? []).map((s) => (
            <div key={s.id} className="music-card p-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg ${s.avatar} flex items-center justify-center flex-shrink-0`} style={{ color: 'var(--brand-purple-deep)' }}><Play size={18} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{s.title}</p>
                  <p className="text-slate-400 text-xs">{s.artist} · {s.genre}</p>
                </div>
                <p className="price-pill font-bold text-sm">{s.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'playlists' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(playlists ?? []).map((p) => (
            <div key={p.id} className="card p-5">
              <div className="mkt-cover mb-3 flex items-center justify-center" style={{ background: p.gradient }}>
                <p className="text-4xl">{p.emoji}</p>
              </div>
              <p className="text-white font-bold">{p.title}</p>
              <p className="text-slate-500 text-xs">{p.count} músicas</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'historico' && (
        <div className="card p-8 text-center">
          <p className="text-white text-sm font-semibold mb-1">Seu histórico de reproduções aparece aqui</p>
          <p className="text-slate-400 text-xs">Continue ouvindo prévias no Explorar pra começar a construir seu histórico.</p>
        </div>
      )}
    </div>
  )
}
