import { purchases, favoriteSongs, artists } from '../data/mock.js'
// import { get } from './client.js'

// Cada função é o ponto de troca pro backend: troque o corpo por `return get('/rota')`.
// ponytail: retornando mock resolvido. A assinatura async já é a definitiva.
export const getPurchases = async () => purchases
export const getFavoriteSongs = async () => favoriteSongs
export const getFavoriteArtists = async () =>
  Object.entries(artists).map(([slug, a]) => ({ slug, ...a }))
export const getArtist = async (slug) =>
  artists[slug] ? { slug, ...artists[slug] } : null
