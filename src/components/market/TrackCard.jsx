import { useNavigate } from 'react-router-dom'
import CoverArt from './CoverArt.jsx'
import { formatPrice } from '../../lib/format.js'
import { usePlayer } from '../../player/PlayerContext.jsx'

// Card vertical de música pro grid (Home/Explorar/Gênero). Clique → página da música.
export default function TrackCard({ song, rank, delay = 0 }) {
  const navigate = useNavigate()
  const { play } = usePlayer()

  return (
    <div
      className="mkt-card stagger-item"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => navigate(`/musica/${song.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/musica/${song.id}`) }}
    >
      <div className="relative mb-3">
        <CoverArt gradient={song.gradient} seed={song.id.length} onPlay={() => play({ title: song.title, artist: song.artistName, gradient: song.gradient })} />
        {rank != null && (
          <span className="absolute top-2 left-2 badge-hot">#{rank}</span>
        )}
      </div>
      <p className="mkt-title">{song.title}</p>
      <p className="text-slate-400 text-xs truncate">{song.artistName}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="badge-slate">{song.genre}</span>
        <span className="price-pill text-xs">{formatPrice(song.priceCents)}</span>
      </div>
    </div>
  )
}
