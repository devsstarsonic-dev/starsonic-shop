import { useNavigate } from 'react-router-dom'

export default function GenreTile({ genre, delay = 0 }) {
  const navigate = useNavigate()
  return (
    <div
      className="genre-tile stagger-item"
      style={{ background: genre.gradient, animationDelay: `${delay}ms` }}
      onClick={() => navigate(`/genero/${genre.slug}`)}
      role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/genero/${genre.slug}`) }}
    >
      <p className="text-white text-3xl font-black mb-1" style={{ letterSpacing: '-.02em' }}>{genre.name}</p>
      <p className="text-white/70 text-sm mb-4">{genre.songCount} músicas</p>
      <p className="text-white/60 text-xs">{genre.vibe}</p>
    </div>
  )
}
