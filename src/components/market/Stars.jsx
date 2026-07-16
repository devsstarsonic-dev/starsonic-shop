import { Star } from '../icons.jsx'

export default function Stars({ rating, size = 12 }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Avaliação ${rating} de 5`}>
      <span style={{ color: 'var(--warn-ink)' }}><Star size={size} /></span>
      <span className="text-slate-300 text-xs font-semibold">{rating}</span>
    </span>
  )
}
