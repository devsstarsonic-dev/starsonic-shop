// Backend seam. Nada além disso precisa saber de fetch/URL.
const BASE = import.meta.env.VITE_API_URL ?? '/api'

export async function get(path) {
  const res = await fetch(BASE + path)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}
// ponytail: só GET por enquanto. Adicionar post/put/del quando existir endpoint de escrita.
