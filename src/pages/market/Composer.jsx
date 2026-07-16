import { useParams, useNavigate, Navigate, Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi.js'
import { getComposer, getArtist } from '../../api/index.js'
import { useToast } from '../../components/Toast.jsx'
import { Check, Star } from '../../components/icons.jsx'

export default function Composer() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const showToast = useToast()
  const { data: composer, loading } = useApi(() => getComposer(slug), [slug])

  if (loading) return null
  if (!composer) return <Navigate to="/explorar" replace />

  return (
    <div className="content-wrap">
      <div className="card p-8 mb-8" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,.15), rgba(0,197,228,.05))', borderColor: 'rgba(139,92,246,.35)', boxShadow: 'var(--elev-2)' }}>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="text-center">
            <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto flex items-center justify-center ${composer.avatar}`} style={{ boxShadow: 'var(--elev-3)' }}>
              <span className="text-white font-black text-5xl">{composer.initials}</span>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {composer.verified && <span className="badge-cyan"><Check size={11} /> Compositor verificado</span>}
              <span className="badge-violet">{composer.plan}</span>
            </div>
            <h1 className="text-white font-black leading-none mb-3" style={{ fontSize: 'clamp(30px,5vw,48px)', letterSpacing: '-.02em' }}>{composer.name}</h1>
            <p className="text-slate-300 text-sm mb-2">📍 {composer.location}</p>
            <p className="text-slate-300 mb-6">{composer.bio}</p>

            <div className="flex items-center gap-6 mb-6 flex-wrap">
              <MiniStat value={composer.stats.artists} label="Artistas" />
              <Divider />
              <MiniStat value={composer.stats.songs} label="Músicas" />
              <Divider />
              <MiniStat value={composer.stats.streams} label="Streams totais" cyan />
              <Divider />
              <MiniStat value={`⭐ ${composer.stats.rating}`} label={`${composer.stats.reviews} avaliações`} />
            </div>

            <div className="flex gap-3 flex-wrap">
              <button className="btn-primary" style={{ padding: '12px 28px' }} onClick={() => showToast('Seguindo!', `Você segue ${composer.name}`)}>+ Seguir</button>
              <button className="btn-ghost" style={{ padding: '12px 20px' }} onClick={() => showToast('Mensagem', `Chat aberto com ${composer.name}`)}>Contatar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <p style={{ color: 'var(--brand-violet)' }} className="text-xs font-bold tracking-widest uppercase mb-1">Projetos</p>
        <h2 className="text-white font-black text-2xl mb-6">Artistas que ele criou</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {composer.artistSlugs.map((s, i) => <ComposerArtist key={s} slug={s} delay={i * 50} />)}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h3 className="text-white font-bold text-lg mb-4">Sobre</h3>
            <div className="space-y-3 text-sm">
              <div><p className="text-slate-500 text-xs">📍 Localização</p><p className="text-white">{composer.location}</p></div>
              <div><p className="text-slate-500 text-xs">🎼 Especialidades</p><p className="text-white">{composer.specialties.join(', ')}</p></div>
              <div><p className="text-slate-500 text-xs">📅 No StarSonic desde</p><p className="text-white">{composer.since}</p></div>
              <div><p className="text-slate-500 text-xs">💼 Plano</p><p className="text-white">{composer.plan}</p></div>
            </div>
          </div>
        </div>

        <div className="card p-5" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,.08), rgba(0,197,228,.04))' }}>
          <p className="badge-violet mb-3 inline-flex">🏆 Conquistas</p>
          <div className="space-y-3">
            {composer.achievements.map((ac) => (
              <div key={ac.title} className="flex items-center gap-2">
                <span style={{ color: 'var(--warn-ink)' }}><Star size={20} /></span>
                <div>
                  <p className="text-white text-sm font-bold">{ac.title}</p>
                  <p className="text-slate-500 text-[10px]">{ac.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniStat({ value, label, cyan }) {
  return (
    <div>
      <p className="text-2xl font-black" style={{ color: cyan ? 'var(--brand-cyan-tint)' : '#fff', fontVariantNumeric: 'tabular-nums' }}>{value}</p>
      <p className="text-slate-400 text-xs">{label}</p>
    </div>
  )
}
function Divider() { return <div style={{ width: 1, height: 40, background: 'rgba(148,163,184,.15)' }} /> }

function ComposerArtist({ slug, delay }) {
  const navigate = useNavigate()
  const { data: artist } = useApi(() => getArtist(slug), [slug])
  if (!artist) return null
  return (
    <div className="card mkt-card p-5 text-center stagger-item" style={{ animationDelay: `${delay}ms` }} onClick={() => navigate(`/artista/${slug}`)}>
      <div className={`w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center ${artist.avatar}`}>
        <span className="text-white font-bold text-xl">{artist.initials}</span>
      </div>
      <p className="text-white font-bold text-sm mb-1">{artist.name}</p>
      <p className="text-slate-500 text-xs">{artist.catalog.length} músicas · {artist.monthly} streams</p>
    </div>
  )
}
