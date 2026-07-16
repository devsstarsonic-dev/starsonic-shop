import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext.jsx'
import { useCart } from '../../cart/CartContext.jsx'
import { MusicNote, Orders, Heart, User, Logout, Search, ChevronDown, Cart } from '../icons.jsx'
import { LOGO_SRC } from '../../assets/media.js'

const LINKS = [
  { to: '/inicio', label: 'Início' },
  { to: '/explorar', label: 'Explorar' },
  { to: '/genero/sertanejo', label: 'Gêneros' },
  { to: '/biblioteca', label: 'Biblioteca' },
]

export default function TopNav() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { count } = useCart()

  useEffect(() => {
    const onClick = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const go = (to) => { setOpen(false); navigate(to) }
  const sair = () => { setOpen(false); logout(); navigate('/') }
  const submitSearch = (e) => { e.preventDefault(); navigate(`/explorar?q=${encodeURIComponent(q)}`) }

  return (
    <nav className="market-nav">
      <div className="market-nav-inner">
        <div className="flex items-center gap-2.5 cursor-pointer flex-shrink-0" onClick={() => navigate('/inicio')}>
          <img className="brand-logo" style={{ height: 34 }} src={LOGO_SRC} alt="Starsonic Shop" />
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `market-nav-link${isActive ? ' active' : ''}`}>{l.label}</NavLink>
          ))}
        </div>

        <form className="market-search ml-auto" onSubmit={submitSearch}>
          <Search size={15} />
          <input placeholder="Buscar músicas, artistas, compositores..." value={q} onChange={(e) => setQ(e.target.value)} />
        </form>

        <button className="btn-ghost cart-btn always-visible" style={{ padding: '8px 12px' }} onClick={() => navigate('/carrinho')} aria-label="Ver carrinho">
          <Cart size={16} />
          {count > 0 && <span className="cart-count">{count}</span>}
        </button>

        <div className="dropdown always-visible" ref={menuRef}>
          <button onClick={() => setOpen((o) => !o)} aria-label="Abrir menu da conta"
            className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 hover:bg-white/10 transition">
            <div className="w-8 h-8 rounded-full avatar-4 flex items-center justify-center">
              <span className="text-white font-bold text-xs">AR</span>
            </div>
            <span className="text-white text-sm hidden md:inline">Ana</span>
            <ChevronDown size={12} style={{ color: '#94a3b8' }} />
          </button>
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={() => go('/biblioteca')}><MusicNote size={14} /> Biblioteca</div>
            <div className="dropdown-item" onClick={() => go('/encomendas')}><Orders size={14} /> Encomendas</div>
            <div className="dropdown-item" onClick={() => go('/favoritos')}><Heart size={14} /> Favoritos</div>
            <div className="dropdown-item" onClick={() => go('/conta/dados')}><User size={14} /> Meus dados</div>
            <div className="h-px bg-white/5 my-2"></div>
            <div className="dropdown-item" onClick={sair} style={{ color: 'var(--danger-ink)' }}><Logout size={14} /> Sair</div>
          </div>
        </div>
      </div>
    </nav>
  )
}
