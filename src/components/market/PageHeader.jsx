export default function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
      <div>
        {eyebrow && <p style={{ color: 'var(--brand-cyan)' }} className="text-xs font-bold tracking-widest uppercase mb-2">{eyebrow}</p>}
        <h1 className="text-white font-black text-3xl md:text-4xl mb-2" style={{ letterSpacing: '-.02em' }}>{title}</h1>
        {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
