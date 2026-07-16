import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../cart/CartContext.jsx'
import { useToast } from '../../components/Toast.jsx'
import { formatPrice } from '../../lib/format.js'

const TAX_RATE = 0.2
const CASHBACK_RATE = 0.1

export default function Cart() {
  const navigate = useNavigate()
  const { items, remove, clear, total } = useCart()
  const showToast = useToast()
  const [pay, setPay] = useState('pix')
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const tax = Math.round(total * TAX_RATE)
  const cashback = Math.round(total * CASHBACK_RATE)
  const discount = couponApplied ? Math.round(total * 0.1) : 0
  const grandTotal = Math.max(0, total + tax - cashback - discount)
  const composerShare = Math.round(total * 0.8)
  const platformShare = total - composerShare

  const finalizar = () => {
    showToast('Compra aprovada!', `${items.length} música${items.length > 1 ? 's' : ''} adicionada${items.length > 1 ? 's' : ''} na sua biblioteca`)
    clear()
    setTimeout(() => navigate('/biblioteca'), 900)
  }

  if (items.length === 0) {
    return (
      <div className="content-wrap">
        <p style={{ color: 'var(--brand-cyan)' }} className="text-xs font-bold tracking-widest uppercase mb-2">Finalizar compra</p>
        <h1 className="text-white font-black text-4xl mb-8">Seu carrinho</h1>
        <div className="card p-10 text-center max-w-md">
          <p className="text-white font-semibold mb-2">Seu carrinho está vazio</p>
          <p className="text-slate-400 text-sm mb-5">Explore o catálogo e encontre sua próxima música.</p>
          <button className="btn-primary" onClick={() => navigate('/explorar')}>Explorar músicas</button>
        </div>
      </div>
    )
  }

  return (
    <div className="content-wrap" style={{ maxWidth: 1100 }}>
      <p style={{ color: 'var(--brand-cyan)' }} className="text-xs font-bold tracking-widest uppercase mb-2">Finalizar compra</p>
      <h1 className="text-white font-black text-4xl mb-2">Seu carrinho</h1>
      <p className="text-slate-400 mb-6">{items.length} música{items.length > 1 ? 's' : ''} · Total {formatPrice(total)}</p>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-6 mb-4">
            {items.map((item, i) => (
              <div key={item.cartId} className={`flex items-center gap-4 ${i > 0 ? 'pt-4' : ''} ${i < items.length - 1 ? 'pb-4 border-b border-white/5' : ''}`}>
                <div className="w-16 h-16 rounded-lg flex-shrink-0" style={{ background: item.gradient }} />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold truncate">{item.title}</p>
                  <p className="text-slate-500 text-xs truncate">{item.artist} · {item.licenseLabel}</p>
                  <button className="text-xs mt-1 hover:underline" style={{ color: 'var(--danger-ink)' }} onClick={() => remove(item.cartId)}>Remover</button>
                </div>
                <p className="price-pill font-bold text-lg flex-shrink-0">{formatPrice(item.priceCents)}</p>
              </div>
            ))}
          </div>

          <div className="card p-4">
            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-3">🎟️ Cupom de desconto</p>
            <div className="flex gap-2">
              <input className="input-star" style={{ flex: 1 }} placeholder="Digite o código do cupom" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
              <button className="btn-ghost" onClick={() => { setCouponApplied(true); showToast('Cupom aplicado', 'Desconto de 10%') }}>Aplicar</button>
            </div>
          </div>
        </div>

        <div>
          <div className="card p-6 mb-4" style={{ background: 'linear-gradient(135deg, rgba(0,197,228,.08), rgba(139,92,246,.03))', borderColor: 'rgba(0,197,228,.35)' }}>
            <p style={{ color: 'var(--brand-cyan)' }} className="text-xs font-bold tracking-widest uppercase mb-4">Resumo</p>
            <div className="space-y-2 mb-4 pb-4 border-b border-white/5">
              <Row label={`Subtotal (${items.length} música${items.length > 1 ? 's' : ''})`} value={formatPrice(total)} />
              <Row label="Taxa StarSonic (20%)" value={formatPrice(tax)} muted />
              <Row label="Cashback" value={`- ${formatPrice(cashback)}`} tone="ok" />
              {couponApplied && <Row label="Cupom (10%)" value={`- ${formatPrice(discount)}`} tone="ok" />}
            </div>
            <div className="flex justify-between mb-4" aria-live="polite">
              <span className="text-white font-bold">Total</span>
              <span className="text-white text-3xl font-black" style={{ fontVariantNumeric: 'tabular-nums' }}>{formatPrice(grandTotal)}</span>
            </div>

            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-3">Pagamento</p>
            <div className="space-y-2 mb-4">
              <PayOption id="pix" current={pay} onSelect={setPay} title="PIX instantâneo" sub="Aprovação em segundos" chip="PIX" chipColor="ok" />
              <PayOption id="card" current={pay} onSelect={setPay} title="Cartão salvo •••• 5678" sub="Crédito" chip={<CardIcon />} />
              <PayOption id="balance" current={pay} onSelect={setPay} title="Saldo StarSonic" sub="R$ 42,50 disponível" chip="SALDO" chipColor="violet" />
            </div>

            <button className="btn-primary w-full" style={{ padding: 14 }} onClick={finalizar}>Finalizar compra</button>
            <p className="text-center text-slate-500 text-xs mt-3">🔒 Pagamento seguro</p>
          </div>

          <div className="card p-4" style={{ background: 'rgba(3,3,20,.4)' }}>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-2">Split transparente</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-slate-400">Compositores recebem (80%)</span><span style={{ color: 'var(--ok-ink)' }}>{formatPrice(composerShare)}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">StarSonic (20%)</span><span className="text-slate-400">{formatPrice(platformShare)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, muted, tone }) {
  const color = tone === 'ok' ? 'var(--ok-ink)' : muted ? '#94a3b8' : '#e2e8f0'
  return (
    <div className="flex justify-between">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className="text-sm" style={{ color }}>{value}</span>
    </div>
  )
}

function PayOption({ id, current, onSelect, title, sub, chip, chipColor }) {
  const active = current === id
  return (
    <label className="p-3 rounded-lg cursor-pointer flex items-center gap-3"
      style={active ? { background: 'linear-gradient(135deg, rgba(0,197,228,.15), rgba(139,92,246,.05))', border: '1px solid rgba(0,197,228,.4)' } : { background: 'rgba(3,3,20,.4)', border: '1px solid rgba(148,163,184,.15)' }}>
      <input type="radio" name="pay" checked={active} onChange={() => onSelect(id)} style={{ accentColor: 'var(--brand-cyan)' }} />
      <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: chipColor === 'ok' ? 'rgba(16,185,129,.2)' : chipColor === 'violet' ? 'rgba(139,92,246,.2)' : 'rgba(148,163,184,.15)' }}>
        {typeof chip === 'string' ? <span className="font-bold text-[9px]" style={{ color: chipColor === 'ok' ? 'var(--ok-ink)' : chipColor === 'violet' ? '#c4b5fd' : '#cbd5e1' }}>{chip}</span> : chip}
      </div>
      <div className="flex-1">
        <p className="text-white text-sm font-bold">{title}</p>
        <p className="text-slate-500 text-xs">{sub}</p>
      </div>
    </label>
  )
}

function CardIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /></svg>
}
