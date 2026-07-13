import { useNavigate } from 'react-router-dom'
import { Plus, Play, Check, Download } from '../components/icons.jsx'

export default function Orders() {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <p className="text-slate-400 text-sm">Acompanhe suas músicas personalizadas encomendadas dos artistas</p>
        <button className="btn-primary px-4 py-2 rounded-lg text-xs flex items-center gap-2" onClick={() => navigate('/encomendar')}>
          <Plus size={14} strokeWidth={2.5} /> Nova encomenda
        </button>
      </div>

      {/* Prioritário: música pronta pra revisão */}
      <div className="card-highlight p-6 mb-3" style={{ borderColor: 'rgba(245, 158, 11, 0.35)', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(168, 85, 247, 0.05))' }}>
        <div className="flex items-start justify-between mb-4 gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full avatar-3 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">JS</span>
            </div>
            <div>
              <p className="text-white font-bold">Casamento Ana &amp; Pedro</p>
              <p className="text-slate-400 text-xs">Enviada por <span className="text-cyan-400">João Silva</span> · há 2 horas</p>
            </div>
          </div>
          <span className="badge-review">🎧 OUVIR E APROVAR</span>
        </div>

        <p className="text-slate-200 text-sm mb-4">O artista entregou a primeira versão da sua música. Ouça e aprove ou peça alterações antes de finalizar.</p>

        <div className="p-4 rounded-xl bg-black/40 border border-white/10 mb-4">
          <div className="flex items-center gap-4">
            <div className="play-btn" role="button" aria-label="Reproduzir prévia" style={{ color: '#0a0a2e' }}><Play size={20} /></div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold mb-2">Versão 1 · Prévia da música</p>
              <div className="progress-track mb-2"><div className="progress-fill" style={{ width: '32%' }}></div></div>
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono"><span>1:12</span><span>3:45</span></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-black/20 border border-white/5">
          <div className="flex gap-1.5">
            <div className="revision-dot available"></div><div className="revision-dot available"></div><div className="revision-dot available"></div>
          </div>
          <div className="flex-1">
            <p className="text-white text-xs font-semibold">3 revisões disponíveis</p>
            <p className="text-slate-400 text-[10px]">Você pode pedir até 3 ajustes gratuitos antes de aprovar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button className="btn-primary py-3 rounded-lg text-sm flex items-center justify-center gap-2" onClick={() => navigate('/encomenda/aprovar')}>
            <Check size={16} strokeWidth={2.5} /> Aprovar e finalizar
          </button>
          <button className="btn-secondary py-3 rounded-lg text-sm flex items-center justify-center gap-2" onClick={() => navigate('/encomenda/alteracao')}>
            Pedir alteração
          </button>
        </div>
        <p className="text-slate-500 text-[10px] mt-3">💡 Ao aprovar, o valor de R$ 499 é liberado pro artista e você libera o download final</p>
      </div>

      {/* Revisão em andamento */}
      <div className="card p-6 mb-3" style={{ borderColor: 'rgba(6, 182, 212, 0.15)' }}>
        <div className="flex items-start justify-between mb-3 gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full avatar-5 flex items-center justify-center flex-shrink-0"><span className="text-white font-bold text-sm">AC</span></div>
            <div>
              <p className="text-white font-bold">Homenagem pro meu pai</p>
              <p className="text-slate-400 text-xs">Com <span className="text-cyan-400">Ana Cruz</span> · ajustando versão 2</p>
            </div>
          </div>
          <span className="badge-done">AJUSTES SOLICITADOS</span>
        </div>
        <div className="flex items-center gap-3 mb-3 p-2 rounded-lg bg-black/20">
          <div className="flex gap-1.5">
            <div className="revision-dot used"></div><div className="revision-dot available"></div><div className="revision-dot available"></div>
          </div>
          <p className="text-slate-400 text-[11px]">Você usou 1 de 3 revisões · aguardando nova versão</p>
        </div>
        <p className="text-slate-500 text-[10px]">Previsão da nova versão: 04/07/2026</p>
      </div>

      {/* Em produção (timeline) */}
      <div className="card-highlight p-6 mb-3">
        <div className="flex items-start justify-between mb-4 gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full avatar-2 flex items-center justify-center flex-shrink-0"><span className="text-white font-bold text-sm">DM</span></div>
            <div>
              <p className="text-white font-bold">Homenagem pra minha mãe</p>
              <p className="text-slate-400 text-xs">Encomendada com <span className="text-cyan-400">Demétrio</span> · 28/06/2026</p>
            </div>
          </div>
          <span className="badge-pending">EM PRODUÇÃO</span>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex flex-col items-center gap-2 flex-shrink-0" style={{ width: 60 }}>
            <div className="step-circle step-done"><Check size={14} strokeWidth={3} /></div>
            <p className="text-slate-400 text-[10px] text-center">Pedido<br />enviado</p>
          </div>
          <div className="step-line done"></div>
          <div className="flex flex-col items-center gap-2 flex-shrink-0" style={{ width: 60 }}>
            <div className="step-circle step-done"><Check size={14} strokeWidth={3} /></div>
            <p className="text-slate-400 text-[10px] text-center">Aceito pelo<br />artista</p>
          </div>
          <div className="step-line done"></div>
          <div className="flex flex-col items-center gap-2 flex-shrink-0" style={{ width: 60 }}>
            <div className="step-circle step-active">3</div>
            <p className="text-cyan-400 text-[10px] text-center font-bold">Em<br />produção</p>
          </div>
          <div className="step-line"></div>
          <div className="flex flex-col items-center gap-2 flex-shrink-0" style={{ width: 60 }}>
            <div className="step-circle step-todo">4</div>
            <p className="text-slate-500 text-[10px] text-center">Pronta pra<br />baixar</p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-black/30 border border-white/5 mb-3">
          <p className="text-slate-400 text-[11px] mb-1">Última atualização · há 2 dias</p>
          <p className="text-slate-200 text-sm">"Já compus a melodia e vou gravar amanhã. Fica linda com a história que você contou! 🎵"</p>
          <p className="text-slate-500 text-[10px] mt-2">— Demétrio</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="btn-secondary px-4 py-2 rounded-lg text-xs">Conversar com o artista</button>
          <button className="btn-secondary px-4 py-2 rounded-lg text-xs">Ver detalhes do pedido</button>
        </div>
        <p className="text-slate-500 text-[10px] mt-3">💡 Previsão de entrega: 05/07/2026 · valor: R$ 299,00</p>
      </div>

      {/* Entregue */}
      <div className="card p-6 mb-3 opacity-90">
        <div className="flex items-start justify-between mb-3 gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full avatar-3 flex items-center justify-center flex-shrink-0"><span className="text-white font-bold text-sm">MR</span></div>
            <div>
              <p className="text-white font-bold">Aniversário da Bianca</p>
              <p className="text-slate-400 text-xs">Entregue por <span className="text-cyan-400">Maria</span> · 15/05/2026</p>
            </div>
          </div>
          <span className="badge-paid">ENTREGUE</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="btn-primary px-4 py-2 rounded-lg text-xs flex items-center gap-2"><Download size={12} strokeWidth={2.5} /> Baixar música</button>
          <button className="btn-secondary px-4 py-2 rounded-lg text-xs">Avaliar artista ⭐</button>
        </div>
      </div>

      {/* Nova encomenda */}
      <div className="card p-6 border-dashed border-white/10 text-center">
        <div className="w-12 h-12 rounded-2xl avatar-3 flex items-center justify-center mx-auto mb-3" style={{ color: '#0a0a2e' }}><Plus size={20} /></div>
        <p className="text-white font-semibold mb-1">Quer uma nova música?</p>
        <p className="text-slate-400 text-xs mb-4">Escolha entre jingle instrumental, música pronta ou personalizada</p>
        <button className="btn-primary px-5 py-2 rounded-lg text-xs" onClick={() => navigate('/encomendar')}>Começar encomenda</button>
      </div>
    </>
  )
}
