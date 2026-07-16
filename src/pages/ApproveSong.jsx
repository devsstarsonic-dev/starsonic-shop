import { useNavigate } from 'react-router-dom'
import { Check, Play, Info } from '../components/icons.jsx'

const RESUMO = [
  ['Artista', <span className="text-white text-xs font-semibold">João Silva</span>],
  ['Estilo', <span className="text-white text-xs font-semibold">Sertanejo romântico · 3:45</span>],
  ['Revisões usadas', <span className="text-green-400 text-xs font-semibold">Nenhuma · aprovada na 1ª versão 🎯</span>],
  ['Valor a liberar pro artista', <span className="text-cyan-400 text-sm font-bold">R$ 499</span>],
]

export default function ApproveSong() {
  const navigate = useNavigate()

  const aprovar = () => {
    alert('Música aprovada! Download liberado.')
    navigate('/biblioteca')
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-8 pb-16">
      <button className="text-slate-400 text-xs mb-6 hover:text-cyan-400" onClick={() => navigate('/encomendas')}>← Voltar pra minhas encomendas</button>

      <div className="card-highlight p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10b981, #00c5e4)', boxShadow: '0 0 40px rgba(16, 185, 129, 0.3)', color: '#0c0230' }}>
            <Check size={30} strokeWidth={3} />
          </div>
          <h1 className="text-white text-2xl font-bold mb-2">Tem certeza que quer aprovar?</h1>
          <p className="text-slate-400 text-sm">Ao aprovar, o pagamento vai pro artista e você libera o download final</p>
        </div>

        <div className="p-4 rounded-xl bg-black/40 border border-white/10 mb-5">
          <p className="text-slate-400 text-[10px] uppercase font-bold mb-3">Versão que você está aprovando</p>
          <div className="flex items-center gap-4">
            <div className="play-btn" role="button" aria-label="Reproduzir versão" style={{ color: '#0c0230' }}><Play size={20} /></div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold mb-1">Casamento Ana &amp; Pedro</p>
              <p className="text-slate-400 text-xs mb-2">por João Silva · versão 1</p>
              <div className="progress-track mb-2"><div className="progress-fill" style={{ width: '32%' }}></div></div>
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono"><span>1:12</span><span>3:45</span></div>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          {RESUMO.map(([label, val]) => (
            <div key={label} className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between">
              <span className="text-slate-400 text-xs">{label}</span>{val}
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/25 mb-6">
          <p className="text-yellow-300 text-xs flex items-center gap-2"><Info size={14} /> Após aprovar, não é possível pedir mais alterações</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button className="btn-secondary py-3 rounded-lg text-sm" onClick={() => navigate('/encomendas')}>Voltar</button>
          <button className="btn-primary py-3 rounded-lg text-sm flex items-center justify-center gap-2" onClick={aprovar}>
            <Check size={16} strokeWidth={2.5} /> Aprovar e liberar download
          </button>
        </div>
      </div>
    </div>
  )
}
