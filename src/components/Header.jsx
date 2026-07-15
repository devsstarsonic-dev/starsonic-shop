import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import { MusicNote, Orders, Heart, User, Logout, Search, ChevronDown } from './icons.jsx'
import { LOGO_SRC } from '../assets/media.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { logout } = useAuth()

  useEffect(() => {
    const onClick = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const go = (to) => { setOpen(false); navigate(to) }
  const sair = () => { setOpen(false); logout(); navigate('/') }

  return (
    <header id="header-logged" className="border-b border-white/5 bg-black/30 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/app')}>
          <img className="brand-logo" style={{ height: 50 }} src={LOGO_SRC} alt="Starsonic Shop" />
        </div>

        <div className="flex items-center gap-3">
          <button className="btn-secondary px-3 py-2 rounded-lg text-xs hidden md:flex items-center gap-2">
            <Search size={14} /> Buscar músicas
          </button>

          <div className={`dropdown${open ? ' open' : ''}`} ref={menuRef}>
            <button onClick={() => setOpen(o => !o)} aria-label="Abrir menu da conta"
              className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 hover:bg-white/10 transition">
              <div className="w-8 h-8 rounded-full avatar-4 flex items-center justify-center">
                <span className="text-white font-bold text-xs">AR</span>
              </div>
              <span className="text-white text-sm hidden md:inline">Ana</span>
              <ChevronDown size={12} style={{ color: '#94a3b8' }} />
            </button>
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => go('/app/musicas')}><MusicNote size={14} /> Minhas músicas</div>
              <div className="dropdown-item" onClick={() => go('/app/encomendas')}><Orders size={14} /> Encomendas</div>
              <div className="dropdown-item" onClick={() => go('/app/favoritos')}><Heart size={14} /> Favoritos</div>
              <div className="dropdown-item" onClick={() => go('/app/dados')}><User size={14} /> Meus dados</div>
              <div className="h-px bg-white/5 my-2"></div>
              <div className="dropdown-item" onClick={sair} style={{ color: 'var(--danger)' }}><Logout size={14} /> Sair</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
