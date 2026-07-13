import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import { Check, Google, Apple } from '../components/icons.jsx'
import { LOGO_SRC } from '../assets/media.js'

const UserIcon = () => (<svg className="fi" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>)
const MailIcon = () => (<svg className="fi" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>)
const PhoneIcon = () => (<svg className="fi" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>)
const LockIcon = () => (<svg className="fi" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>)
const EyeOn = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></svg>)
const EyeOff = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>)

const PERKS = [
  'Baixe suas músicas quantas vezes precisar',
  'Acompanhe encomendas personalizadas',
  'Favorite artistas e receba avisos de novas músicas',
]

export default function Signup() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPwd, setShowPwd] = useState(false)

  const criar = async (e) => { e.preventDefault(); await login(); navigate('/app') }

  return (
    <div id="view-signup" className="view active">
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-5">
            <img className="brand-logo mx-auto mb-2" style={{ height: 118 }} src={LOGO_SRC} alt="Starsonic Shop" />
            <span className="brand-tagline">Crie sua conta em 30 segundos</span>
          </div>

          <form className="card-highlight p-8" onSubmit={criar}>
            <h1 className="text-white text-2xl font-bold mb-1 text-center">Criar conta grátis</h1>
            <p className="text-slate-400 text-sm text-center mb-6">Guarde suas músicas na nuvem e baixe sempre que quiser</p>

            <div className="space-y-1.5 mb-4 p-3 rounded-lg bg-cyan-500/5 border border-cyan-400/20">
              {PERKS.map((p) => (
                <div key={p} className="flex items-center gap-2 text-slate-300 text-xs">
                  <span style={{ color: '#22d3ee' }}><Check size={14} strokeWidth={2.5} /></span>{p}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <div>
                <label className="text-slate-400 text-xs block mb-2 font-medium">Nome</label>
                <div className="field"><UserIcon /><input type="text" autoComplete="name" className="input-star" placeholder="Como quer ser chamado" /></div>
              </div>
              <div>
                <label className="text-slate-400 text-xs block mb-2 font-medium">E-mail</label>
                <div className="field"><MailIcon /><input type="email" autoComplete="email" className="input-star" placeholder="seu@email.com" /></div>
              </div>
              <div>
                <label className="text-slate-400 text-xs block mb-2 font-medium">Celular</label>
                <div className="field"><PhoneIcon /><input type="text" autoComplete="tel" className="input-star" placeholder="(11) 99999-9999" /></div>
              </div>
              <div>
                <label className="text-slate-400 text-xs block mb-2 font-medium">Senha</label>
                <div className="field">
                  <LockIcon />
                  <input type={showPwd ? 'text' : 'password'} autoComplete="new-password" className="input-star has-eye" placeholder="Mínimo 8 caracteres" />
                  <button type="button" className="eye" onClick={() => setShowPwd(v => !v)} aria-label={showPwd ? 'Ocultar senha' : 'Mostrar senha'}>{showPwd ? <EyeOff /> : <EyeOn />}</button>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-3 rounded-lg text-sm mb-4">Criar minha conta</button>

            <div className="divider-text mb-4"><span>ou cadastre-se com</span></div>

            <div className="grid grid-cols-2 gap-2 mb-6">
              <button type="button" className="btn-social py-2.5 rounded-lg text-xs flex items-center justify-center gap-2"><Google /> Google</button>
              <button type="button" className="btn-social py-2.5 rounded-lg text-xs flex items-center justify-center gap-2"><Apple /> Apple</button>
            </div>

            <p className="text-slate-400 text-xs text-center">
              Já tem conta?{' '}
              <Link to="/" className="text-cyan-400 font-semibold hover:underline">Fazer login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
