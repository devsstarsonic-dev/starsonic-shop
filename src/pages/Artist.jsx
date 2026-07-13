import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi.js'
import { getArtist } from '../api/index.js'
import { songCover, artistHero, fmtNum } from '../lib/artistArt.js'

const HERO_ACCENT = [[2, 7], [10, 5, 11], [18, 3, 15], [26, 6, 9], [34, 2, 17], [42, 4, 13], [50, 1, 19], [58, 5, 11], [66, 3, 15], [74, 6, 9], [82, 4, 13], [90, 2, 17], [98, 5, 11], [106, 7, 7], [114, 4, 13], [122, 6, 9]]
const ACC_DELAYS = ['0.0s', '-0.08s', '-0.16s', '-0.24s', '-0.32s', '-0.4s', '-0.48s', '-0.56s', '-0.64s', '-0.72s', '-0.8s', '-0.88s', '-0.96s', '-1.04s', '-1.12s', '-1.2s']

function SongRow({ s, i, base, onBuy }) {
  const playsRaw = Math.round(base * Math.pow(0.6, i))
  const dls = Math.round(playsRaw * 0.028)
  const favs = Math.round(playsRaw * 0.062)
  return (
    <div className="sp-row">
      <div className="sp-row-index"><span className="sp-num">{i + 1}</span>
        <span className="sp-playicon"><span className="eq"><i></i><i></i><i></i><i></i></span></span></div>
      <div className="sp-row-cover" dangerouslySetInnerHTML={{ __html: songCover(i, s.title) }} />
      <div className="sp-row-main">
        <div className="sp-row-title">{s.title}</div>
        <div className="sp-row-sub">{s.tag && <span className="sp-tag">{s.tag}</span>}{s.gname}</div>
        <div className="sp-row-stats">
          <span className="sp-stat" title="Reproduções"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>{fmtNum(playsRaw)}</span>
          <span className="sp-stat" title="Downloads"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14" /></svg>{fmtNum(dls)}</span>
          <span className="sp-stat sp-stat-fav" title="Favoritos"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6.7-4.2-9.3-8.3C1 10 2.4 6 6 6c2 0 3.2 1.2 4 2.3C10.8 7.2 12 6 14 6c3.6 0 5 4 3.3 6.7C18.7 16.8 12 21 12 21z" /></svg>{fmtNum(favs)}</span>
        </div>
      </div>
      <div className="sp-row-meta">
        <span className="sp-meta-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 10v4M8 6v12M12 3v18M16 8v8M20 11v2" /></svg></span>
        <span className="sp-meta-txt"><span className="sp-meta-name">Áudio HD · 320 kbps</span><span className="sp-meta-sub">{s.year ? 'Lançado em ' + s.year : 'Download imediato'}</span></span>
      </div>
      <div className="sp-row-dur">{s.dur}</div>
      <div className="sp-row-buy"><button className="sp-buy-btn" onClick={() => onBuy(i)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0L2 12V2h10l8.6 8.6a2 2 0 010 2.8z" /><circle cx="7" cy="7" r="1.3" fill="currentColor" stroke="none" /></svg>{s.price}</button></div>
    </div>
  )
}

export default function Artist() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { data: a, loading } = useApi(() => getArtist(slug), [slug])
  const [following, setFollowing] = useState(false)
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [buy, setBuy] = useState({ open: false, i: 0, success: false })
  const [toast, setToast] = useState('')
  const liquidRef = useRef(null)
  const toastTimer = useRef(null)

  useEffect(() => { setFollowing(false); setQ(''); setCat('all') }, [slug])

  useEffect(() => {
    const el = liquidRef.current
    if (!el || !window.initLiquidEther) return
    const ctl = window.initLiquidEther(el, { colors: ['#22d3ee', '#8b5cf6', '#ec4899'], resolution: 0.45, cursorSize: 90, mouseForce: 18, autoSpeed: 0.5, autoIntensity: 2.0 })
    return () => { if (ctl && ctl.dispose) ctl.dispose() }
  }, [slug])

  const cats = useMemo(() => {
    if (!a) return []
    const out = []
    a.catalog.forEach((s) => { if (s.gname && !out.includes(s.gname)) out.push(s.gname) })
    return out
  }, [a])

  const rows = useMemo(() => {
    if (!a) return []
    const term = q.trim().toLowerCase()
    return a.catalog
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => (cat === 'all' || s.gname === cat) && (!term || s.title.toLowerCase().includes(term) || s.gname.toLowerCase().includes(term)))
  }, [a, q, cat])

  if (loading) return null
  if (!a) return <Navigate to="/app/favoritos" replace />

  const showToast = (msg) => { setToast(msg); clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(''), 1700) }
  const copyHandle = () => {
    const url = 'https://' + a.handle
    const ok = () => showToast('Link copiado: ' + a.handle)
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok).catch(ok)
    else ok()
  }
  const song = a.catalog[buy.i] || {}

  return (
    <>
      <div className="sp-hero">
        <div className="sp-hero-bg" dangerouslySetInnerHTML={{ __html: artistHero(a) }} />
        <div className="sp-hero-liquid" aria-hidden="true" ref={liquidRef} style={{ position: 'absolute' }} />
        <div className="sp-hero-shade"></div>
        <button className="sp-back" onClick={() => navigate('/app/favoritos')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M19 12H5m7 7l-7-7 7-7" /></svg>
          Voltar
        </button>
        <div className="sp-hero-content">
          <div className="sp-hero-text">
            <h1 className="sp-name">{a.name}</h1>
            <div className="sp-accent" aria-hidden="true">
              <svg width="130" height="20" viewBox="0 0 130 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="spgrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#22d3ee" /><stop offset=".5" stopColor="#8b5cf6" /><stop offset="1" stopColor="#ec4899" /></linearGradient></defs>
                {HERO_ACCENT.map(([x, y, h], idx) => (<rect key={idx} x={x} y={y} width="4" height={h} rx="2" fill="url(#spgrad)" style={{ animationDelay: ACC_DELAYS[idx] }} />))}
              </svg>
            </div>
            <p className="sp-hero-bio">{a.bio}</p>
            <div className="sp-herobox">
              <div className="sp-hb-chip sp-hb-chip--verified">
                <span className="sp-hb-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span>
                <span className="sp-hb-txt"><b>Verificado</b><small>Artista oficial</small></span>
              </div>
              <div className="sp-hb-chip">
                <span className="sp-hb-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0118 0v6" /><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" /></svg></span>
                <span className="sp-hb-txt"><b>{a.monthly || a.fans}</b><small>ouvintes mensais</small></span>
              </div>
              <div className="sp-hb-chip">
                <span className="sp-hb-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg></span>
                <span className="sp-hb-txt"><b>{a.catalog.length}</b><small>músicas</small></span>
              </div>
              <div className="sp-hb-chip">
                <span className="sp-hb-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg></span>
                <span className="sp-hb-txt"><b>{a.location}</b><small>localização</small></span>
              </div>
            </div>
          </div>
          <div className="sp-hero-photo">
            {a.photo ? <img src={a.photo} alt={a.name} /> : <span className={`sp-hero-photo-ini ${a.avatar}`}>{a.initials}</span>}
          </div>
        </div>
      </div>

      <div className="sp-body">
        <div className="sp-controls">
          <button className="sp-play" title="Tocar prévia"><svg width="24" height="24" viewBox="0 0 24 24" fill="#04122b"><path d="M8 5v14l11-7z" /></svg></button>
          <button className={`sp-follow${following ? ' following' : ''}`} onClick={() => setFollowing(v => !v)}>
            <span className="follow-lbl">{following ? 'Seguindo' : 'Seguir'}</span>
          </button>
          <button className="sp-icon" title="Copiar link do perfil" onClick={copyHandle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1" /><path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1" /></svg>
          </button>
          <button className="sp-icon" title="Encomendar música personalizada" onClick={() => navigate('/encomendar/personalizada')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /><circle cx="5" cy="12" r="1.6" /></svg>
          </button>
        </div>

        <div className="sp-section">
          <h2 className="sp-section-title">Populares <span className="eq eq--title playing" aria-hidden="true"><i></i><i></i><i></i><i></i></span></h2>
          <div className="sp-toolbar">
            <div className={`sp-search${q ? ' has-text' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
              <input type="text" placeholder="Buscar música..." autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)} />
              <button className="sp-search-clear" type="button" onClick={() => setQ('')} aria-label="Limpar busca">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="sp-cats">
              <button className={`sp-chip${cat === 'all' ? ' active' : ''}`} onClick={() => setCat('all')}>Todas</button>
              {cats.map((c) => (<button key={c} className={`sp-chip${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>{c}</button>))}
            </div>
          </div>
          <div className="sp-list">
            {rows.length ? rows.map(({ s, i }) => (<SongRow key={s.title} s={s} i={i} base={a.playsBase || 700000} onBuy={(idx) => setBuy({ open: true, i: idx, success: false })} />))
              : <div className="sp-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg><span>Nenhuma música encontrada</span></div>}
          </div>
        </div>

        <div className="sp-section">
          <h2 className="sp-section-title">Sobre</h2>
          <div className="sp-about">
            <div>
              <p className="sp-about-bio">{a.bio}</p>
              <span className="sp-handle" onClick={copyHandle} title="Copiar link do perfil">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1" /><path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1" /></svg>
                <span className="sp-handle-text">{a.handle}</span>
              </span>
            </div>
            <div className="sp-about-stats">
              <div className="sp-about-stat">
                <span className="sp-stat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg></span>
                <span className="num">{a.fans}</span><span className="lbl">fãs</span>
              </div>
              <div className="sp-about-stat">
                <span className="sp-stat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><path d="M3 6h18M16 10a4 4 0 01-8 0" /></svg></span>
                <span className="num">{a.sales}</span><span className="lbl">vendas</span>
              </div>
              <div className="sp-about-stat sp-about-stat--rating">
                <span className="sp-stat-ico"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7z" /></svg></span>
                <span className="num">{a.rating}</span><span className="lbl">avaliação</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`buy-modal${buy.open ? ' open' : ''}`} aria-hidden={!buy.open}>
        <div className="buy-overlay" onClick={() => setBuy((b) => ({ ...b, open: false }))}></div>
        <div className="buy-card" role="dialog" aria-modal="true">
          <button className="buy-close" onClick={() => setBuy((b) => ({ ...b, open: false }))} aria-label="Fechar"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
          {!buy.success ? (
            <div>
              <div className="buy-art-wrap"><div className="buy-art" dangerouslySetInnerHTML={{ __html: songCover(buy.i, song.title) }} /></div>
              <div className="buy-eyebrow"><span className="buy-star">✦</span> <span>{song.gname}</span></div>
              <h3 className="buy-title">{song.title}</h3>
              <div className="buy-sub"><span>{a.name}</span> <span className="buy-dot">•</span> <span>{song.dur}</span></div>
              <ul className="buy-perks">
                <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg> Áudio em alta qualidade (320&nbsp;kbps)</li>
                <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg> Download na hora após o pagamento</li>
                <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg> Licença para uso pessoal</li>
              </ul>
              <button className="buy-cta" onClick={() => setBuy((b) => ({ ...b, success: true }))}>Comprar</button>
              <div className="buy-priceline"><span className="buy-price">{song.price}</span> <span className="buy-price-note">· pagamento único, à vista</span></div>
              <div className="buy-secure"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></svg> Pagamento 100% seguro</div>
            </div>
          ) : (
            <div>
              <div className="buy-check"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></div>
              <h3 className="buy-title">Compra realizada!</h3>
              <p className="buy-success-text">Enviamos o link de download pro seu e-mail. Aproveite! 🎧</p>
              <button className="buy-cta" onClick={() => setBuy((b) => ({ ...b, open: false }))}>Concluir</button>
            </div>
          )}
        </div>
      </div>

      <div className={`sp-toast${toast ? ' show' : ''}`}>{toast}</div>
    </>
  )
}
