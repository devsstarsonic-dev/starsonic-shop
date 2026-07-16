import { useMemo, useState } from 'react'
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi.js'
import { getSong, getCatalog, getArtist } from '../../api/index.js'
import { LICENSE_TIERS } from '../../data/mock.js'
import { formatPrice, formatDuration, formatCompact } from '../../lib/format.js'
import { Play, Heart, Share, Download } from '../../components/icons.jsx'
import { usePlayer } from '../../player/PlayerContext.jsx'
import { useCart } from '../../cart/CartContext.jsx'
import { useToast } from '../../components/Toast.jsx'
import CoverArt from '../../components/market/CoverArt.jsx'
import Wave from '../../components/market/Wave.jsx'
import TrackCard from '../../components/market/TrackCard.jsx'

export default function Song() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: song, loading } = useApi(() => getSong(id), [id])
  const { data: allSongs } = useApi(() => getCatalog(), [])
  const { data: artist } = useApi(() => song ? getArtist(song.artistSlug) : Promise.resolve(null), [song?.artistSlug])
  const { play } = usePlayer()
  const { add } = useCart()
  const showToast = useToast()
  const [licenseId, setLicenseId] = useState('pessoal')

  const similar = useMemo(() => {
    if (!allSongs || !song) return []
    return allSongs.filter((s) => s.id !== song.id && s.genreSlug === song.genreSlug).slice(0, 3)
  }, [allSongs, song])

  if (loading) return null
  if (!song) return <Navigate to="/explorar" replace />

  const license = LICENSE_TIERS.find((l) => l.id === licenseId)
  const priceCents = song.priceCents * license.mult

  const comprar = () => {
    add({ cartId: `${song.id}-${licenseId}`, songId: song.id, title: song.title, artist: song.artistName, gradient: song.gradient, licenseLabel: license.label, priceCents })
    showToast('Adicionado ao carrinho!', `${song.title} · ${formatPrice(priceCents)}`)
  }

  return (
    <div className="content-wrap">
      {/* HERO */}
      <div className="card p-6 md:p-8 mb-8" style={{ background: 'linear-gradient(135deg, rgba(0,197,228,.14), rgba(139,92,246,.08))', borderColor: 'rgba(0,197,228,.3)', boxShadow: 'var(--elev-2)' }}>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <CoverArt gradient={song.gradient} seed={song.id.length} radius={20} className="mx-auto" style={{ maxWidth: 260 }} />

          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {song.tag && <span className="badge-hot">🔥 {song.tag}</span>}
              <span className="badge-cyan">{song.genre}</span>
            </div>
            <h1 className="text-white font-black leading-none mb-3" style={{ fontSize: 'clamp(30px,5vw,48px)', letterSpacing: '-.02em' }}>{song.title}</h1>

            <Link to={`/artista/${song.artistSlug}`} className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition">
              {artist && <div className={`w-9 h-9 rounded-full flex items-center justify-center ${artist.avatar}`}><span className="text-white font-bold text-xs">{artist.initials}</span></div>}
              <div className="text-left">
                <p className="text-white font-bold text-sm">{song.artistName}</p>
                <p className="text-slate-500 text-xs">Artista</p>
              </div>
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <button className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--brand-cyan), var(--brand-violet))', color: 'var(--brand-purple-deep)', boxShadow: 'var(--glow-cyan)' }}
                onClick={() => play({ title: song.title, artist: song.artistName, gradient: song.gradient })} aria-label="Tocar prévia">
                <Play size={24} />
              </button>
              <div className="flex-1">
                <Wave bars={20} height={36} seed={song.id.length} />
                <div className="flex justify-between mt-2">
                  <span className="text-slate-500 text-xs" style={{ fontVariantNumeric: 'tabular-nums' }}>0:00</span>
                  <span className="text-slate-500 text-xs" style={{ fontVariantNumeric: 'tabular-nums' }}>{formatDuration(song.durationSec)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-1">Preço</p>
                <p className="text-white text-3xl font-black" style={{ fontVariantNumeric: 'tabular-nums' }}>{formatPrice(priceCents)}</p>
              </div>
              <div className="flex-1" />
              <button className="btn-ghost" style={{ padding: 14 }} onClick={() => showToast('❤️ Curtido!', 'Salvo em suas curtidas')} aria-label="Curtir"><Heart size={18} /></button>
              <button className="btn-ghost" style={{ padding: 14 }} onClick={() => showToast('Link copiado', `starsonic.shop/musica/${song.id}`)} aria-label="Compartilhar"><Share size={18} /></button>
              <button className="btn-primary" style={{ padding: '14px 32px', fontSize: 15 }} onClick={comprar}><Download size={18} /> Comprar agora</button>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MiniStat label="🎧 Streams totais" value={formatCompact(song.streams)} />
        <MiniStat label="⭐ Avaliação" value={`${song.rating} / 5`} sub={`${song.reviewCount} avaliações`} />
        <MiniStat label="💰 Vendas" value={formatCompact(Math.round(song.streams / 60))} sub="licenças vendidas" />
        <MiniStat label="🎼 BPM · Tom" value={`${song.bpm} · ${song.key}`} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* LETRA */}
          <div className="card p-6 mb-6">
            <p style={{ color: 'var(--brand-cyan)' }} className="text-xs font-bold tracking-widest uppercase mb-1">Letra completa</p>
            <h3 className="text-white text-xl font-bold mb-4">Letra da música</h3>
            <div className="space-y-4">
              {song.lyrics.map((block, i) => (
                <div key={i}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: i % 2 === 0 ? 'var(--brand-cyan)' : '#c4b5fd' }}>[{block.tag}]</p>
                  <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">{block.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DETALHES */}
          <div className="card p-6 mb-6">
            <h3 className="text-white font-bold text-lg mb-4">Detalhes técnicos</h3>
            <div className="grid grid-cols-2 gap-4">
              <Detail label="Duração" value={formatDuration(song.durationSec)} />
              <Detail label="BPM" value={String(song.bpm)} />
              <Detail label="Tom" value={song.key} />
              <Detail label="Formato" value="MP3 320kbps · WAV" />
              <Detail label="Álbum" value={song.album} />
              <Detail label="Lançamento" value={song.year} />
            </div>
          </div>

          {/* SIMILARES */}
          {similar.length > 0 && (
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Você também vai gostar</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {similar.map((s, i) => <TrackCard key={s.id} song={s} delay={i * 40} />)}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div>
          <div className="card p-5 mb-4">
            <p style={{ color: 'var(--brand-cyan)' }} className="text-xs font-bold tracking-widest uppercase mb-3">Opções de licença</p>
            <div className="space-y-2">
              {LICENSE_TIERS.map((l) => (
                <label key={l.id} className="p-3 rounded-lg cursor-pointer flex items-start gap-3"
                  style={licenseId === l.id
                    ? { background: 'linear-gradient(135deg, rgba(0,197,228,.15), rgba(139,92,246,.06))', border: '1px solid rgba(0,197,228,.4)' }
                    : { background: 'rgba(3,3,20,.35)', border: '1px solid rgba(148,163,184,.15)' }}>
                  <input type="radio" name="license" checked={licenseId === l.id} onChange={() => setLicenseId(l.id)} style={{ accentColor: 'var(--brand-cyan)', marginTop: 3 }} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-white text-sm font-bold">{l.label}</p>
                      <p className={licenseId === l.id ? 'font-bold' : 'text-slate-300 font-bold'} style={licenseId === l.id ? { color: 'var(--brand-cyan-tint)' } : undefined}>{formatPrice(song.priceCents * l.mult)}</p>
                    </div>
                    <p className="text-slate-400 text-xs">{l.formats}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {artist && (
            <div className="card p-5 mb-4">
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-3">Sobre o artista</p>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${artist.avatar}`}>
                  <span className="text-white font-black">{artist.initials}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{artist.name}</p>
                  <p className="text-slate-500 text-xs">{artist.location}</p>
                </div>
              </div>
              <p className="text-slate-400 text-xs mb-3">{artist.catalog.length} músicas · {artist.monthly} streams/mês</p>
              <button className="btn-ghost w-full justify-center" style={{ padding: 8, fontSize: 12 }} onClick={() => navigate(`/artista/${song.artistSlug}`)}>Ver perfil</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function MiniStat({ label, value, sub }) {
  return (
    <div className="card p-4">
      <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-2">{label}</p>
      <p className="text-white text-xl font-black" style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</p>
      {sub && <p className="text-slate-400 text-xs mt-1">{sub}</p>}
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div className="pb-3 border-b border-white/5">
      <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">{label}</p>
      <p className="text-white text-sm font-bold mt-1">{value}</p>
    </div>
  )
}
