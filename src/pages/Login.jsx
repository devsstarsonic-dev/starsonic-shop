import { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import { Google, Apple } from '../components/icons.jsx'
import { useLoginFx } from '../components/effects/useLoginFx.js'
import { LOGO_SRC } from '../assets/media.js'

const MailIcon = () => (<svg className="fi" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>)
const LockIcon = () => (<svg className="fi" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>)
const EyeOn = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></svg>)
const EyeOff = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>)

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPwd, setShowPwd] = useState(false)
  const sceneRef = useRef(null), tiltRef = useRef(null), cardRef = useRef(null)
  useLoginFx({ sceneRef, tiltRef, cardRef })

  const entrar = async (e) => { e.preventDefault(); await login(); navigate('/app') }

  return (
    <div id="view-login" className="view active">
      <div className="min-h-screen flex items-center justify-center p-6 tilt-scene" ref={sceneRef}>
        <div className="max-w-md w-full tilt-3d" ref={tiltRef}>
          <div className="tilt-depth" aria-hidden="true"><span className="orb o1"></span><span className="orb o2"></span><span className="orb o3"></span></div>

          <div className="text-center mb-5 logo-3d">
            <img className="brand-logo mx-auto mb-2" style={{ height: 118 }} src={LOGO_SRC} alt="Starsonic Shop" />
            <span className="brand-tagline">Músicas de verdade, feitas por gente de verdade</span>
          </div>

          <div className="border-glow-card tilt-card" ref={cardRef} style={{ '--border-radius': '16px', '--cone-spread': 25, '--fill-opacity': 0.4 }}>
            <span className="edge-light" aria-hidden="true"></span>
            <span className="inner-glow" aria-hidden="true"></span>
            <form className="border-glow-inner card-highlight p-8" onSubmit={entrar}>
              <h1 className="text-white text-2xl font-bold mb-1 text-center">Bem-vindo de volta</h1>
              <p className="text-slate-400 text-sm text-center mb-6">Entre pra baixar suas músicas e acompanhar suas compras</p>

              <div className="mb-4">
                <label className="text-slate-400 text-xs block mb-2 font-medium">E-mail</label>
                <div className="field">
                  <MailIcon />
                  <input type="email" autoComplete="email" className="input-star" placeholder="seu@email.com" />
                </div>
              </div>
              <div className="mb-2">
                <label className="text-slate-400 text-xs block mb-2 font-medium">Senha</label>
                <div className="field">
                  <LockIcon />
                  <input type={showPwd ? 'text' : 'password'} autoComplete="current-password" className="input-star has-eye" placeholder="••••••••" />
                  <button type="button" className="eye" onClick={() => setShowPwd(v => !v)} aria-label={showPwd ? 'Ocultar senha' : 'Mostrar senha'}>{showPwd ? <EyeOff /> : <EyeOn />}</button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded accent-cyan-400" />
                  <span className="text-slate-400 text-xs">Lembrar de mim</span>
                </label>
                <a className="text-cyan-400 text-xs cursor-pointer hover:underline">Esqueci a senha</a>
              </div>

              <button type="submit" className="btn-primary w-full py-3 rounded-lg text-sm mb-4">Entrar</button>

              <div className="divider-text mb-4"><span>ou continue com</span></div>

              <div className="grid grid-cols-2 gap-2 mb-6">
                <button type="button" className="btn-social py-2.5 rounded-lg text-xs flex items-center justify-center gap-2"><Google /> Google</button>
                <button type="button" className="btn-social py-2.5 rounded-lg text-xs flex items-center justify-center gap-2"><Apple /> Apple</button>
              </div>

              <p className="text-slate-400 text-xs text-center">
                Não tem conta ainda?{' '}
                <Link to="/signup" className="text-cyan-400 font-semibold hover:underline">Criar conta grátis</Link>
              </p>
            </form>
          </div>

          <p className="tilt-terms text-slate-400 text-[11px] leading-relaxed text-center mt-6">
            Ao continuar você concorda com os <a className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/40 underline-offset-2 cursor-pointer">Termos</a> e a <a className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/40 underline-offset-2 cursor-pointer">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  )
}
