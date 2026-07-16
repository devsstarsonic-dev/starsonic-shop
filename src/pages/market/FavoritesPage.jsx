import PageHeader from '../../components/market/PageHeader.jsx'
import Favorites from '../Favorites.jsx'

export default function FavoritesPage() {
  return (
    <div className="content-wrap">
      <PageHeader eyebrow="Sua coleção" title="Favoritos" />
      <Favorites />
    </div>
  )
}
