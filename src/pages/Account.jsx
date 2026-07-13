import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { MusicNote, Orders, Heart, User } from '../components/icons.jsx'

const TABS = [
  { to: 'musicas', label: 'Minhas músicas', Icon: MusicNote, badge: '3' },
  { to: 'encomendas', label: 'Encomendas', Icon: Orders, badge: '1' },
  { to: 'favoritos', label: 'Favoritos', Icon: Heart, badge: '7' },
  { to: 'dados', label: 'Meus dados', Icon: User },
]

export default function Account() {
  const navigate = useNavigate()
  return (
    <div id="view-account" className="max-w-6xl mx-auto px-6 pt-8 pb-16">
      <div id="welcomeCard" className="card-highlight p-6 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full avatar-4 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-2xl">AR</span>
        </div>
        <div className="flex-1">
          <h1 className="text-white text-2xl font-bold">Olá, Ana 👋</h1>
          <p className="text-slate-400 text-sm">Membro desde jun/2026 · 3 músicas na sua biblioteca</p>
        </div>
        <button className="btn-secondary px-4 py-2 rounded-lg text-xs hidden md:block" onClick={() => navigate('/app/dados')}>Editar perfil</button>
      </div>

      <div className="border-b border-white/5 flex gap-6 mb-6 overflow-x-auto">
        {TABS.map(({ to, label, Icon, badge }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) => `tab-btn font-medium flex items-center gap-2${isActive ? ' active' : ''}`}>
            <Icon size={14} /> {label}
            {badge && <span className="badge text-[10px]">{badge}</span>}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  )
}
