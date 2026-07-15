import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi.js'
import { getFavoriteSongs, getFavoriteArtists } from '../api/index.js'
import { Play, Star, Search } from '../components/icons.jsx'

export default function Favorites() {
  const [sub, setSub] = useState('songs')
  const navigate = useNavigate()
  const { data: songs } = useApi(getFavoriteSongs)
  const { data: artists } = useApi(getFavoriteArtists)

  return (
    <>
      <p className="text-slate-400 text-sm mb-5">Artistas e músicas que você salvou pra depois</p>

      <div className="border-b border-white/5 flex gap-6 mb-5">
        <button className={`tab-btn text-xs${sub === 'songs' ? ' active' : ''}`} onClick={() => setSub('songs')}>Músicas ({(songs ?? []).length})</button>
        <button className={`tab-btn text-xs${sub === 'artists' ? ' active' : ''}`} onClick={() => setSub('artists')}>Artistas ({(artists ?? []).length})</button>
      </div>

      {sub === 'songs' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(songs ?? []).map((s) => (
            <div key={s.id} className="music-card p-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg ${s.avatar} flex items-center justify-center flex-shrink-0`} style={{ color: '#0c0230' }}><Play size={18} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{s.title}</p>
                  <p className="text-slate-400 text-xs cursor-pointer hover:text-cyan-400" onClick={() => navigate(`/artista/${s.slug}`)}>{s.artist} · {s.genre}</p>
                </div>
                <p className="text-cyan-400 font-bold text-sm">{s.price}</p>
                <button className="btn-primary px-3 py-1.5 rounded-lg text-xs">Comprar</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="text-slate-400 text-xs mb-4">Clique em qualquer artista pra ver o catálogo completo dele</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(artists ?? []).map((a) => (
              <div key={a.slug} className="music-card p-5 text-center cursor-pointer" onClick={() => navigate(`/artista/${a.slug}`)}>
                <div className={`w-20 h-20 rounded-full ${a.avatar} flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-white font-bold text-2xl">{a.initials}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center mb-1">
                  <p className="text-white font-bold">{a.name}</p>
                  {a.verified && <span style={{ color: '#00c5e4' }}><Star size={14} /></span>}
                </div>
                <p className="text-slate-400 text-xs mb-3">{a.genre} · {a.city}</p>
                <div className="flex items-center gap-3 justify-center mb-4">
                  <div><p className="text-white font-bold text-sm leading-none">{a.songs}</p><p className="text-slate-500 text-[9px] mt-1">músicas</p></div>
                  <div className="w-px h-6 bg-white/10"></div>
                  <div><p className="text-white font-bold text-sm leading-none">{a.sales}</p><p className="text-slate-500 text-[9px] mt-1">vendas</p></div>
                  <div className="w-px h-6 bg-white/10"></div>
                  <div><p className="text-white font-bold text-sm leading-none">{a.rating.replace(' ', '')}</p><p className="text-slate-500 text-[9px] mt-1">avaliação</p></div>
                </div>
                <button className="btn-primary w-full py-2 rounded-lg text-xs">Ver loja</button>
              </div>
            ))}
          </div>

          <div className="card p-6 border-dashed border-white/10 text-center mt-4">
            <div className="w-12 h-12 rounded-2xl avatar-1 flex items-center justify-center mx-auto mb-3" style={{ color: '#0c0230' }}><Search size={20} /></div>
            <p className="text-white font-semibold mb-1">Descobrir novos artistas</p>
            <p className="text-slate-400 text-xs mb-4">Explore centenas de compositores brasileiros na StarSonic Shop</p>
            <button className="btn-secondary px-5 py-2 rounded-lg text-xs">Explorar StarSonic</button>
          </div>
        </>
      )}
    </>
  )
}
