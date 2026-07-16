export default function StatTile({ icon, label, value, iconBg = 'avatar-1' }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`} style={{ color: 'var(--brand-purple-deep)' }}>
          {icon}
        </div>
        <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">{label}</p>
      </div>
      <p className="text-white text-2xl font-black" style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</p>
    </div>
  )
}
