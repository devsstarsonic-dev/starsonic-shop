import {
  purchases, favoriteSongs, artists, composers, songs, genres, playlists,
  getSongById, getGenreBySlug,
} from '../data/mock.js'
// import { get } from './client.js'

// Cada função é o ponto de troca pro backend: troque o corpo por `return get('/rota')`.
// ponytail: retornando mock resolvido. A assinatura async já é a definitiva.
export const getPurchases = async () => purchases
export const getFavoriteSongs = async () => favoriteSongs
export const getFavoriteArtists = async () =>
  Object.entries(artists).map(([slug, a]) => ({ slug, ...a }))
export const getArtist = async (slug) =>
  artists[slug] ? { slug, ...artists[slug] } : null

export const getComposer = async (slug) =>
  composers[slug] ? { slug, ...composers[slug] } : null

export const getHome = async () => ({
  trending: [...songs].sort((a, b) => b.streams - a.streams).slice(0, 6),
  hotArtists: Object.entries(artists).map(([slug, a]) => ({ slug, ...a })).sort((a, b) => b.playsBase - a.playsBase).slice(0, 5),
  genres: genres.slice(0, 8),
  composers: Object.entries(composers).map(([slug, c]) => ({ slug, ...c })),
  playlists,
  totals: { songs: songs.length, artists: Object.keys(artists).length, composers: Object.keys(composers).length },
})

export const getCatalog = async (filters = {}) => {
  let list = [...songs]
  if (filters.genreSlug) list = list.filter((s) => s.genreSlug === filters.genreSlug)
  if (filters.q) {
    const term = filters.q.trim().toLowerCase()
    list = list.filter((s) => (s.title + ' ' + s.artistName + ' ' + s.genre).toLowerCase().includes(term))
  }
  if (filters.maxPriceCents) list = list.filter((s) => s.priceCents <= filters.maxPriceCents)
  return list
}

export const getSong = async (id) => getSongById(id) ?? null

export const getGenre = async (slug) => getGenreBySlug(slug) ?? null

export const getGenres = async () => genres

export const getPlaylists = async () => playlists
