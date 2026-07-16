import { useNavigate } from 'react-router-dom'
import { Edit, Upload } from '../components/icons.jsx'

const TIPOS = ['Letra', 'Melodia', 'Voz / Interpretação', 'Andamento (BPM)', 'Instrumentos', 'Duração']

export default function RequestChanges() {
  const navigate = useNavigate()

  const enviar = (e) => {
    e.preventDefault()
    alert('Alteração enviada ao João Silva! Você usou 1 de 3 revisões.')
    navigate('/encomendas')
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-8 pb-16">
      <button className="text-slate-400 text-xs mb-6 hover:text-cyan-400" onClick={() => navigate('/encomendas')}>← Voltar pra minhas encomendas</button>

      <form className="card-highlight p-8" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }} onSubmit={enviar}>
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center avatar-6" style={{ color: '#0c0230' }}><Edit size={26} /></div>
          <h1 className="text-white text-2xl font-bold mb-2">Pedir alteração ao artista</h1>
          <p className="text-slate-400 text-sm">Descreva o que você quer que seja ajustado. Seja específico pra facilitar o trabalho do artista.</p>
        </div>

        <div className="p-4 rounded-lg bg-black/30 border border-white/10 mb-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex gap-1.5">
              <div className="revision-dot available"></div><div className="revision-dot available"></div><div className="revision-dot available"></div>
            </div>
            <p className="text-white text-sm font-semibold">3 revisões disponíveis</p>
          </div>
          <p className="text-slate-400 text-[11px]">Essa será sua <strong className="text-yellow-400">1ª revisão de 3</strong>. Use com sabedoria — quanto mais detalhes você der, melhor o artista vai entender.</p>
        </div>

        <div className="mb-4">
          <label className="text-slate-400 text-xs block mb-2 font-medium">Tipos de ajuste (marque tudo que se aplica)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {TIPOS.map((t) => (
              <label key={t} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:border-cyan-400/40">
                <input type="checkbox" className="w-3.5 h-3.5 accent-cyan-400" /><span className="text-white text-xs">{t}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-slate-400 text-xs block mb-2 font-medium" htmlFor="rq-desc">Descreva as alterações que você quer</label>
          <textarea id="rq-desc" className="input-star" rows="6" placeholder="Ex: A parte do refrão poderia ficar mais lenta. E na segunda estrofe, trocar 'nosso primeiro beijo' por 'nosso primeiro encontro'. O instrumento que entra no minuto 1:30 tá muito alto, poderia baixar um pouco..."></textarea>
          <p className="text-slate-500 text-[10px] mt-1">Dica: se puder, indique o minuto específico de cada ajuste (ex: aos 0:45 ficou estranho)</p>
        </div>

        <div className="mb-6">
          <label className="text-slate-400 text-xs block mb-2 font-medium" htmlFor="rq-ref">Referência de áudio (opcional)</label>
          <div className="p-4 border-2 border-dashed border-white/10 rounded-lg text-center">
            <span className="mx-auto mb-2 block w-fit" style={{ color: '#64748b' }}><Upload size={20} /></span>
            <p className="text-slate-400 text-xs">Cole um link do YouTube ou anexe áudio</p>
            <input id="rq-ref" type="url" className="input-star mt-2" placeholder="https://youtube.com/... (opcional)" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button type="button" className="btn-secondary py-3 rounded-lg text-sm" onClick={() => navigate('/encomendas')}>Cancelar</button>
          <button type="submit" className="btn-primary py-3 rounded-lg text-sm">Enviar pedido de alteração</button>
        </div>

        <p className="text-slate-500 text-[10px] text-center mt-4">💡 O artista tem até 3 dias pra enviar a nova versão. Você pode acompanhar o status aqui na sua conta.</p>
      </form>
    </div>
  )
}
