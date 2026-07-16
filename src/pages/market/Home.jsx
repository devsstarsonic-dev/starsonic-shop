import { useNavigate } from 'react-router-dom'
import { useApi } from '../../hooks/useApi.js'
import { getHome } from '../../api/index.js'
import TrackCard from '../../components/market/TrackCard.jsx'
import ArtistCard from '../../components/market/ArtistCard.jsx'
import ComposerCard from '../../components/market/ComposerCard.jsx'
import GenreTile from '../../components/market/GenreTile.jsx'
import { Play } from '../../components/icons.jsx'
import { usePlayer } from '../../player/PlayerContext.jsx'

export default function Home() {
  const navigate = useNavigate()
  const { data } = useApi(getHome)
  const { play } = usePlayer()

  if (!data) return null

  return (
    <div className="content-wrap">
      {/* HERO */}
      <div className="card p-8 md:p-10 mb-10 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,.16), rgba(0,197,228,.08))', borderColor: 'rgba(139,92,246,.35)', boxShadow: 'var(--elev-2)' }}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="badge-cyan mb-4 inline-flex">Marketplace StarSonic</span>
            <h1 className="text-white font-black leading-none mb-4" style={{ fontSize: 'clamp(32px,5vw,52px)', letterSpacing: '-.02em' }}>
              Descubra a <span style={{ background: 'linear-gradient(135deg,#00c5e4,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>nova onda</span> da música brasileira
            </h1>
            <p className="text-slate-300 text-base md:text-lg mb-6 max-w-lg">Artistas e compositores independentes criando músicas únicas, prontas pra você levar pra sua playlist ou seu projeto.</p>
            <div className="flex gap-3 mb-8 flex-wrap">
              <button className="btn-primary" style={{ padding: '14px 28px', fontSize: 15 }} onClick={() => navigate('/explorar')}>
                <Play size={16} /> Explorar catálogo
              </button>
              <button className="btn-ghost" style={{ padding: '14px 24px' }} onClick={() => navigate('/genero/sertanejo')}>Ver gêneros</button>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <div><p className="text-white text-2xl font-black" style={{ fontVariantNumeric: 'tabular-nums' }}>{data.totals.songs}</p><p className="text-slate-400 text-xs">Músicas no catálogo</p></div>
              <div style={{ width: 1, height: 40, background: 'rgba(148,163,184,.15)' }} />
              <div><p className="text-white text-2xl font-black">{data.totals.artists}</p><p className="text-slate-400 text-xs">Artistas</p></div>
              <div style={{ width: 1, height: 40, background: 'rgba(148,163,184,.15)' }} />
              <div><p className="text-white text-2xl font-black">{data.totals.composers}</p><p className="text-slate-400 text-xs">Compositores</p></div>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-3">
            {data.trending.slice(0, 4).map((s, i) => (
              <div key={s.id} className="mkt-cover" style={{ background: s.gradient, transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)`, aspectRatio: 1 }} />
            ))}
          </div>
        </div>
      </div>

      {/* TRENDING */}
      <SectionHeader eyebrow="🔥 Em alta essa semana" title="Trending agora" subtitle="As músicas mais tocadas nos últimos 7 dias" cta="Ver tudo" onCta={() => navigate('/explorar')} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {data.trending.map((s, i) => <TrackCard key={s.id} song={s} rank={i + 1} delay={i * 40} />)}
      </div>

      {/* ARTISTAS EM ALTA */}
      <SectionHeader eyebrow="🎤 Artistas em alta" title="Vozes que estão bombando" subtitle="Artistas mais tocados no último mês" cta="Ver todos" onCta={() => navigate('/explorar')} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        {data.hotArtists.map((a, i) => <ArtistCard key={a.slug} artist={a} delay={i * 40} />)}
      </div>

      {/* GÊNEROS */}
      <SectionHeader eyebrow="🎵 Navegue por gênero" title="Explore por vibe" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {data.genres.map((g, i) => <GenreTile key={g.slug} genre={g} delay={i * 40} />)}
      </div>

      {/* COMPOSITORES */}
      <SectionHeader eyebrow="✏️ Talentos verificados" title="Compositores em destaque" subtitle="Os criadores por trás das músicas" cta="Ver todos" onCta={() => navigate('/explorar')} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {data.composers.map((c, i) => <ComposerCard key={c.slug} composer={c} delay={i * 40} />)}
      </div>

      {/* PLAYLISTS */}
      <SectionHeader eyebrow="💿 Curadoria StarSonic" title="Playlists da semana" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {data.playlists.map((p, i) => (
          <div key={p.id} className="card mkt-card p-5 stagger-item" style={{ animationDelay: `${i * 40}ms` }} onClick={() => play({ title: p.title, artist: `${p.count} músicas`, gradient: p.gradient })}>
            <div className="mkt-cover mb-4 flex items-center justify-center" style={{ background: p.gradient }}>
              <div className="text-center text-white">
                <p className="text-4xl mb-2">{p.emoji}</p>
                <p className="font-black">{p.title.split(' ')[0]}</p>
              </div>
            </div>
            <p className="text-white font-bold">{p.title}</p>
            <p className="text-slate-500 text-xs">{p.count} músicas · {p.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionHeader({ eyebrow, title, subtitle, cta, onCta }) {
  return (
    <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
      <div>
        <p style={{ color: 'var(--brand-cyan)' }} className="text-xs font-bold tracking-widest uppercase mb-1">{eyebrow}</p>
        <h2 className="text-white font-black text-2xl mb-1">{title}</h2>
        {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
      </div>
      {cta && <button className="btn-ghost" onClick={onCta}>{cta} →</button>}
    </div>
  )
}
