import { useNavigate } from 'react-router-dom'
import { MusicNote, Heart, Mic, Check } from '../components/icons.jsx'

const Feat = ({ color, children }) => (
  <li className="flex items-center gap-2 text-slate-300 text-xs">
    <span style={{ color }}><Check size={12} strokeWidth={3} /></span>{children}
  </li>
)

export default function NewOrder() {
  const navigate = useNavigate()
  return (
    <div className="max-w-5xl mx-auto px-6 pt-8 pb-16">
      <button className="text-slate-400 text-xs mb-6 hover:text-cyan-400" onClick={() => navigate('/app/encomendas')}>← Voltar pra minhas encomendas</button>

      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl avatar-1 flex items-center justify-center mx-auto mb-3" style={{ color: '#0a0a2e' }}><MusicNote size={26} /></div>
        <h1 className="text-white text-3xl font-bold mb-2">O que você precisa?</h1>
        <p className="text-slate-400 text-sm">Escolha o tipo de música que combina com seu momento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Música pronta */}
        <div className="product-card" onClick={() => alert('Você seria redirecionado pro catálogo do artista')}>
          <div className="w-14 h-14 rounded-2xl avatar-4 flex items-center justify-center mb-4" style={{ color: '#0a0a2e' }}><MusicNote size={26} /></div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white text-lg font-bold">Música pronta</h3>
            <span className="badge-paid text-[10px]">MAIS RÁPIDO</span>
          </div>
          <p className="text-slate-400 text-sm mb-4">Compre uma música original já composta. Baixa na hora.</p>
          <ul className="space-y-2 mb-5">
            <Feat color="#10b981">Download imediato</Feat>
            <Feat color="#10b981">Escolha entre milhares</Feat>
            <Feat color="#10b981">Ouça antes de comprar</Feat>
          </ul>
          <p className="text-slate-500 text-xs mb-3">A partir de</p>
          <p className="text-cyan-400 font-bold text-2xl mb-4">R$ 7,90</p>
          <button className="btn-secondary w-full py-2.5 rounded-lg text-xs">Explorar catálogo</button>
        </div>

        {/* Personalizada */}
        <div className="product-card featured" onClick={() => navigate('/encomendar/personalizada')}>
          <div className="w-14 h-14 rounded-2xl avatar-2 flex items-center justify-center mb-4" style={{ color: '#fff' }}><Heart size={26} /></div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white text-lg font-bold">Música personalizada</h3>
            <span className="badge-review text-[9px]">POPULAR</span>
          </div>
          <p className="text-slate-400 text-sm mb-4">Um artista compõe uma música exclusiva pra sua história.</p>
          <ul className="space-y-2 mb-5">
            <Feat color="#22d3ee">100% exclusiva pra você</Feat>
            <Feat color="#22d3ee"><strong className="text-white">Até 3 revisões gratuitas</strong></Feat>
            <Feat color="#22d3ee">Perfeita pra homenagem, casamento</Feat>
          </ul>
          <p className="text-slate-500 text-xs mb-3">A partir de</p>
          <p className="text-cyan-400 font-bold text-2xl mb-4">R$ 299</p>
          <button className="btn-primary w-full py-2.5 rounded-lg text-xs">Solicitar personalizada</button>
        </div>

        {/* Jingle */}
        <div className="product-card" onClick={() => alert('Formulário de jingle instrumental')}>
          <div className="w-14 h-14 rounded-2xl avatar-6 flex items-center justify-center mb-4" style={{ color: '#0a0a2e' }}><Mic size={26} /></div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white text-lg font-bold">Jingle instrumental</h3>
          </div>
          <p className="text-slate-400 text-sm mb-4">Trilha instrumental pro seu comércio, podcast ou marca.</p>
          <ul className="space-y-2 mb-5">
            <Feat color="#f97316">Sem voz · uso comercial</Feat>
            <Feat color="#f97316">15 a 60 segundos</Feat>
            <Feat color="#f97316">Entrega em 3 dias</Feat>
          </ul>
          <p className="text-slate-500 text-xs mb-3">A partir de</p>
          <p className="text-cyan-400 font-bold text-2xl mb-4">R$ 149</p>
          <button className="btn-secondary w-full py-2.5 rounded-lg text-xs">Solicitar jingle</button>
        </div>
      </div>
    </div>
  )
}
