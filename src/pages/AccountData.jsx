import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function AccountData() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const sair = () => { logout(); navigate('/') }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        <div className="card p-6">
          <h3 className="text-white font-bold mb-4">Dados pessoais</h3>

          <div className="mb-4 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full avatar-4 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-2xl">AR</span>
            </div>
            <button className="btn-secondary px-4 py-2 rounded-lg text-xs">Trocar foto</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 text-xs block mb-2" htmlFor="acc-nome">Nome</label>
              <input id="acc-nome" type="text" defaultValue="Ana Ribeiro" className="input-star" />
            </div>
            <div>
              <label className="text-slate-400 text-xs block mb-2" htmlFor="acc-email">E-mail</label>
              <input id="acc-email" type="email" defaultValue="ana@email.com" className="input-star" />
            </div>
            <div>
              <label className="text-slate-400 text-xs block mb-2" htmlFor="acc-cel">Celular</label>
              <input id="acc-cel" type="tel" defaultValue="(11) 98765-4321" className="input-star" />
            </div>
            <div>
              <label className="text-slate-400 text-xs block mb-2" htmlFor="acc-cpf">CPF</label>
              <input id="acc-cpf" type="text" defaultValue="123.456.789-00" className="input-star" />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-5">
            <button className="btn-primary px-5 py-2 rounded-lg text-sm">Salvar</button>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-white font-bold mb-4">Segurança</h3>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 mb-2">
            <div>
              <p className="text-white text-sm font-semibold">Senha</p>
              <p className="text-slate-400 text-xs">Alterada há 3 meses</p>
            </div>
            <button className="btn-secondary px-3 py-2 rounded-lg text-xs">Alterar</button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
            <div>
              <p className="text-white text-sm font-semibold">Verificação em duas etapas</p>
              <p className="text-slate-400 text-xs">Recomendado pra proteger sua conta</p>
            </div>
            <button className="btn-secondary px-3 py-2 rounded-lg text-xs">Ativar</button>
          </div>
        </div>
      </div>

      <div className="md:col-span-1 space-y-4">
        <div className="card-highlight p-5 text-center">
          <p className="text-slate-400 text-xs mb-1">Total gasto na StarSonic</p>
          <p className="text-white text-3xl font-bold mb-1">R$ 71,70</p>
          <p className="text-slate-500 text-[11px]">em 3 músicas + 1 encomenda</p>
        </div>

        <div className="card p-5">
          <h3 className="text-white font-bold mb-3 text-sm">Notificações</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-300 text-xs">Novidades dos artistas seguidos</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-400" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-300 text-xs">Status das encomendas</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-400" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-300 text-xs">Ofertas e destaques</span>
              <input type="checkbox" className="w-4 h-4 accent-cyan-400" />
            </label>
          </div>
        </div>

        <button className="text-red-400 text-xs w-full py-3 hover:underline" onClick={sair}>Sair da conta</button>
      </div>
    </div>
  )
}
