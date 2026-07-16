import { useNavigate } from 'react-router-dom'
import { Heart, Info } from '../components/icons.jsx'

const OCASIOES = ['💍 Casamento', '🎂 Aniversário', '🙏 Homenagem', '🎁 Presente']

export default function RequestCustom() {
  const navigate = useNavigate()

  const enviar = (e) => {
    e.preventDefault()
    alert('Solicitação enviada pro Demétrio! Você recebe uma resposta em até 24h.')
    navigate('/encomendas')
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-8 pb-16">
      <button className="text-slate-400 text-xs mb-6 hover:text-cyan-400" onClick={() => navigate('/encomendar')}>← Voltar</button>

      <form className="card-highlight p-8" onSubmit={enviar}>
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center avatar-2" style={{ color: '#fff' }}><Heart size={26} /></div>
          <h1 className="text-white text-2xl font-bold mb-2">Encomende sua música personalizada</h1>
          <p className="text-slate-400 text-sm">Conte a história e escolha o artista. Você acompanha tudo pela sua conta.</p>
        </div>

        <div className="mb-4">
          <label className="text-slate-400 text-xs block mb-2 font-medium">Qual a ocasião?</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {OCASIOES.map((o, i) => (
              <div key={o} className={`p-3 rounded-lg text-center text-white text-xs cursor-pointer ${i === 0 ? 'border-2 border-cyan-400/40 bg-cyan-500/5' : 'border border-white/10 bg-white/5'}`}>{o}</div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-slate-400 text-xs block mb-2 font-medium" htmlFor="rc-hist">Conte sua história em detalhes</label>
          <textarea id="rc-hist" className="input-star" rows="5" placeholder="Ex: quero uma música pro casamento em setembro. Nos conhecemos em 2019 numa festa de amigos, ela é professora, eu sou engenheiro. Nossa música é 'Evidências'. Queremos algo romântico mas alegre pra dançar..."></textarea>
          <p className="text-slate-500 text-[10px] mt-1">Quanto mais detalhes, melhor a música fica. Nomes, lugares, momentos marcantes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-slate-400 text-xs block mb-2 font-medium" htmlFor="rc-estilo">Estilo desejado</label>
            <select id="rc-estilo" className="input-star cursor-pointer">
              <option>Sertanejo</option><option>MPB</option><option>Gospel</option><option>Pagode</option><option>Rock</option>
            </select>
          </div>
          <div>
            <label className="text-slate-400 text-xs block mb-2 font-medium" htmlFor="rc-prazo">Prazo de entrega</label>
            <select id="rc-prazo" className="input-star cursor-pointer">
              <option>7 dias · R$ 299</option><option>3 dias · R$ 499</option><option>24h · R$ 899</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-slate-400 text-xs block mb-2 font-medium">Artista preferido</label>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-400/30">
              <div className="w-7 h-7 rounded-full avatar-2 flex items-center justify-center"><span className="text-white font-bold text-[10px]">DM</span></div>
              <span className="text-white text-xs">Demétrio</span>
            </div>
            <button type="button" className="btn-secondary px-3 py-2 rounded-lg text-xs">+ Trocar artista</button>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-400/20 mb-6">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 mt-0.5" style={{ color: '#00c5e4' }}><Info size={18} /></span>
            <div>
              <p className="text-white text-xs font-semibold mb-1">Como funciona</p>
              <p className="text-slate-300 text-[11px] leading-relaxed">1) Artista aceita o pedido em até 24h · 2) Ele compõe e envia a versão pra você aprovar · 3) Você tem até <strong className="text-cyan-400">3 revisões grátis</strong> pra pedir ajustes · 4) Quando aprovar, o download final libera.</p>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full py-3 rounded-lg text-sm">Enviar solicitação</button>
      </form>
    </div>
  )
}
