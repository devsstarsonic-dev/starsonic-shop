// Dados mock do protótipo. Trocar por respostas do backend via src/api/index.js.
import { PHOTO_DEMETRIO } from '../assets/media.js'

export const purchases = [
  { id: 1, title: 'Coração de Papel', artist: 'Demétrio', genre: 'Sertanejo', duration: '3:42', license: 'PESSOAL', date: '2026-07-02', dateLabel: '02/07/2026', price: 'R$ 9,90', avatar: 'avatar-1' },
  { id: 2, title: 'Sou Só Gratidão', artist: 'Maria', genre: 'Gospel', duration: '4:12', license: 'COMERCIAL', date: '2026-06-28', dateLabel: '28/06/2026', price: 'R$ 49,90', avatar: 'avatar-3' },
  { id: 3, title: 'Estrada da Vida', artist: 'Demétrio', genre: 'Sertanejo raiz', duration: '4:05', license: 'PESSOAL', date: '2026-06-20', dateLabel: '20/06/2026', price: 'R$ 11,90', avatar: 'avatar-4' },
]

export const favoriteSongs = [
  { id: 1, title: 'Saudade Boa', artist: 'Demétrio', slug: 'demetrio', genre: 'Sertanejo raiz', price: 'R$ 12,90', avatar: 'avatar-1' },
  { id: 2, title: 'Fé Que Move', artist: 'Maria', slug: 'maria', genre: 'Gospel', price: 'R$ 14,90', avatar: 'avatar-3' },
  { id: 3, title: 'Bloqueei Cê', artist: 'João', slug: 'joao', genre: 'Piseiro', price: 'R$ 7,90', avatar: 'avatar-5' },
  { id: 4, title: 'Um Novo Dia', artist: 'Demétrio', slug: 'demetrio', genre: 'Sertanejo', price: 'R$ 10,90', avatar: 'avatar-6' },
]

export const composers = {
  'demetrio-mitre': {
    slug: 'demetrio-mitre', name: 'Demétrio Mitre', initials: 'DM', avatar: 'avatar-2', verified: true,
    location: 'Itanhaém, SP', since: 'Junho 2026',
    bio: 'Compositor independente. Cria artistas e projetos musicais focados em sertanejo raiz, MPB e reggae — tudo produzido do zero no StarSonic Shop.',
    specialties: ['Sertanejo', 'MPB', 'Reggae'],
    plan: 'Pro · R$ 79/mês',
    stats: { artists: 1, songs: 6, streams: '340K', rating: '4.9', reviews: 89 },
    achievements: [
      { title: 'Top 100 compositores', date: 'Julho 2026' },
      { title: '100 mil streams', date: 'Alcançado em 15 dias' },
      { title: 'Verificado', date: 'Identidade confirmada' },
    ],
    artistSlugs: ['demetrio'],
  },
  'maria-silva-comp': {
    slug: 'maria-silva-comp', name: 'Maria Silva', initials: 'MR', avatar: 'avatar-3', verified: true,
    location: 'São Paulo, SP', since: 'Março 2025',
    bio: 'Compositora de gospel e MPB. Componho músicas cheias de fé e emoção pra tocar o coração de quem ouve.',
    specialties: ['Gospel', 'MPB'],
    plan: 'Pro · R$ 79/mês',
    stats: { artists: 1, songs: 4, streams: '96K', rating: '4.8', reviews: 52 },
    achievements: [
      { title: 'Verificado', date: 'Identidade confirmada' },
      { title: '50 mil streams', date: 'Alcançado em 40 dias' },
    ],
    artistSlugs: ['maria'],
  },
  'joao-silva-comp': {
    slug: 'joao-silva-comp', name: 'João Silva', initials: 'JS', avatar: 'avatar-5', verified: false,
    location: 'Recife, PE', since: 'Janeiro 2026',
    bio: 'Piseiro raiz do Nordeste. Produzo batida que mexe com todo mundo — pra festa ou vaquejada.',
    specialties: ['Piseiro', 'Xote'],
    plan: 'Starter',
    stats: { artists: 1, songs: 4, streams: '212K', rating: '4.7', reviews: 31 },
    achievements: [
      { title: '200 mil streams', date: 'Alcançado em 25 dias' },
    ],
    artistSlugs: ['joao'],
  },
}

export const artists = {
  demetrio: {
    name: 'Demétrio', initials: 'DM', avatar: 'avatar-2', verified: true, photo: PHOTO_DEMETRIO,
    composerSlug: 'demetrio-mitre',
    banner: 'linear-gradient(120deg, #16024f, #8b5cf6 45%, #00c5e4)',
    hero: ['#16024f', '#8b5cf6', '#00c5e4'], monthly: '84,3 mil', playsBase: 1240000,
    location: 'Itanhaém, SP', handle: 'star.so/demetrio', genre: 'Sertanejo',
    bio: 'Compositor apaixonado por sertanejo. Faço músicas que falam da vida real. Aceito encomendas personalizadas.',
    sales: '128', fans: '2,4 mil', rating: '4,9',
    catalog: [
      { title: 'Coração de Papel', gname: 'Sertanejo', dur: '3:42', price: 'R$ 9,90', tag: '#1 MAIS VENDIDA', album: 'Coração de Papel', year: '2024' },
      { title: 'Saudade Boa', gname: 'Sertanejo raiz', dur: '4:18', price: 'R$ 12,90', tag: '', album: 'Raízes', year: '2022' },
      { title: 'Amor Verdadeiro', gname: 'Universitário', dur: '3:15', price: 'R$ 8,90', tag: '', album: 'Coração de Papel', year: '2024' },
      { title: 'Estrada da Vida', gname: 'Sertanejo raiz', dur: '4:05', price: 'R$ 11,90', tag: '', album: 'Estrada da Vida', year: '2023' },
      { title: 'Cheiro de Chuva', gname: 'Sertanejo', dur: '3:28', price: 'R$ 9,90', tag: '', album: 'Estrada da Vida', year: '2023' },
      { title: 'Um Novo Dia', gname: 'Sertanejo', dur: '3:55', price: 'R$ 10,90', tag: '', album: 'Raízes', year: '2022' },
    ],
  },
  maria: {
    name: 'Maria Silva', initials: 'MR', avatar: 'avatar-3', verified: true, photo: null,
    composerSlug: 'maria-silva-comp',
    banner: 'linear-gradient(120deg, #16024f, #00c5e4 50%, #8b5cf6)',
    hero: ['#16024f', '#00c5e4', '#8b5cf6'], monthly: '52,1 mil', playsBase: 890000,
    location: 'São Paulo, SP', handle: 'star.so/maria', genre: 'Gospel',
    bio: 'Cantora de gospel e MPB. Componho músicas cheias de fé e emoção pra tocar o coração de quem ouve.',
    sales: '96', fans: '1,1 mil', rating: '4,8',
    catalog: [
      { title: 'Sou Só Gratidão', gname: 'Gospel', dur: '4:12', price: 'R$ 12,90', tag: '#1 MAIS VENDIDA', album: 'Sou Só Gratidão', year: '2024' },
      { title: 'Fé Que Move', gname: 'Gospel', dur: '3:45', price: 'R$ 14,90', tag: '', album: 'Fé Que Move', year: '2023' },
      { title: 'Deus Cuida', gname: 'Gospel', dur: '4:20', price: 'R$ 11,90', tag: '', album: 'Adoração', year: '2022' },
      { title: 'Meu Grande Amor', gname: 'MPB', dur: '3:38', price: 'R$ 13,90', tag: '', album: 'Adoração', year: '2022' },
    ],
  },
  joao: {
    name: 'João Silva', initials: 'JS', avatar: 'avatar-5', verified: false, photo: null,
    composerSlug: 'joao-silva-comp',
    banner: 'linear-gradient(120deg, #5b21b6, #8b5cf6 50%, #00c5e4)',
    hero: ['#5b21b6', '#8b5cf6', '#00c5e4'], monthly: '163 mil', playsBase: 2100000,
    location: 'Recife, PE', handle: 'star.so/joao', genre: 'Piseiro',
    bio: 'Piseiro raiz do Nordeste. Batida que mexe com todo mundo. Se quiser piseiro pra festa ou vaquejada, é comigo!',
    sales: '212', fans: '860', rating: '4,7',
    catalog: [
      { title: 'Bloqueei Cê', gname: 'Piseiro', dur: '2:58', price: 'R$ 7,90', tag: 'HIT', album: 'Piseiro do Vaqueiro', year: '2024' },
      { title: 'Ela Volta pra Mim', gname: 'Piseiro', dur: '3:12', price: 'R$ 8,90', tag: '', album: 'Piseiro do Vaqueiro', year: '2024' },
      { title: 'Vaqueiro do Sertão', gname: 'Piseiro raiz', dur: '3:40', price: 'R$ 9,90', tag: '', album: 'Poeira', year: '2023' },
      { title: 'Xote da Saudade', gname: 'Xote', dur: '3:25', price: 'R$ 8,90', tag: '', album: 'Poeira', year: '2023' },
    ],
  },
}

// ---- Derivado: catálogo achatado em "músicas" pro marketplace (Home/Explorar/Música) ----

const GRADIENTS = [
  'linear-gradient(135deg, #00c5e4, #8b5cf6)',
  'linear-gradient(135deg, #8b5cf6, #5b21b6)',
  'linear-gradient(135deg, #5b21b6, #00c5e4)',
  'linear-gradient(135deg, #16024f, #8b5cf6)',
  'linear-gradient(135deg, #10b981, #00c5e4)',
  'linear-gradient(135deg, #00c5e4, #3fdcf5)',
]

const slugify = (s) => s.toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const priceToCents = (price) => Math.round(parseFloat(price.replace('R$', '').replace('.', '').replace(',', '.')) * 100)
const durationToSec = (dur) => { const [m, s] = dur.split(':').map(Number); return m * 60 + s }

const MOODS = ['Romântica', 'Energética', 'Chill', 'Reflexiva', 'Festa']
const BPMS = [72, 88, 96, 104, 120, 132]
const KEYS = ['Ré maior', 'Sol maior', 'Mi menor', 'Lá menor', 'Dó maior']

export const songs = Object.entries(artists).flatMap(([artistSlug, a]) =>
  a.catalog.map((s, i) => {
    const id = `${artistSlug}-${i}`
    const gi = (artistSlug.charCodeAt(0) + i) % GRADIENTS.length
    return {
      id,
      title: s.title,
      artistSlug,
      artistName: a.name,
      composerSlug: a.composerSlug,
      genre: s.gname,
      genreSlug: slugify(s.gname.split(' ')[0]),
      subgenre: s.gname,
      mood: MOODS[(artistSlug.length + i) % MOODS.length],
      gradient: GRADIENTS[gi],
      priceCents: priceToCents(s.price),
      durationSec: durationToSec(s.dur),
      bpm: BPMS[(artistSlug.length + i) % BPMS.length],
      key: KEYS[(artistSlug.length + i) % KEYS.length],
      tag: s.tag,
      album: s.album,
      year: s.year,
      streams: Math.max(12000, Math.round(a.playsBase / (a.catalog.length + i))),
      rating: (4.4 + ((i * 7) % 6) / 10).toFixed(1),
      reviewCount: 80 + i * 47,
      releasedAt: `${s.year}-0${(i % 9) + 1}-1${i}`,
      lyrics: [
        { tag: 'Verso 1', text: 'Meu coração bate mais forte\nQuando o vento traz teu perfume\nA saudade me faz voltar\nPra onde a gente foi feliz' },
        { tag: 'Refrão', text: `${s.title}\nDo café passado no coador\nDo brilho da tua tez\nDo abraço que eu já não sinto mais` },
        { tag: 'Verso 2', text: 'Sonho toda madrugada\nCom aquela estrada de chão\nCom o sol nascendo devagar' },
      ],
    }
  })
)

export const getSongById = (id) => songs.find((s) => s.id === id)

// ---- Gêneros ----

const GENRE_SEED = [
  { slug: 'sertanejo', name: 'Sertanejo', gradient: GRADIENTS[0], vibe: '🔥 Em alta', subgenres: ['Sertanejo Universitário', 'Sertanejo Raiz', 'Sertanejo Sofrência', 'Sertanejo Pop'] },
  { slug: 'gospel', name: 'Gospel', gradient: GRADIENTS[4], vibe: '🙏 Fé', subgenres: ['Gospel Contemporâneo', 'Adoração'] },
  { slug: 'piseiro', name: 'Piseiro', gradient: GRADIENTS[2], vibe: '🔥 Em alta', subgenres: ['Piseiro Raiz', 'Xote'] },
  { slug: 'mpb', name: 'MPB', gradient: GRADIENTS[1], vibe: '🎼 Clássico', subgenres: ['Bossa Nova', 'MPB Reflexivo'] },
]

export const genres = GENRE_SEED.map((g) => {
  const list = songs.filter((s) => s.genreSlug === g.slug || s.subgenre.toLowerCase().startsWith(g.name.toLowerCase()))
  return {
    ...g,
    songCount: list.length,
    artistCount: new Set(list.map((s) => s.artistSlug)).size,
    streamsMonth: list.reduce((sum, s) => sum + s.streams, 0),
  }
})

export const getGenreBySlug = (slug) => genres.find((g) => g.slug === slug)

// ---- Playlists curadas ----

export const playlists = [
  { id: 'verao', title: 'Verão StarSonic', emoji: '☀️', gradient: GRADIENTS[0], tags: ['Balada', 'Piseiro', 'Gospel'] },
  { id: 'sofrencia', title: 'Sofrência Sertaneja', emoji: '💔', gradient: GRADIENTS[1], tags: ['Sertanejo raiz'] },
  { id: 'studio', title: 'Studio Vibes', emoji: '🎧', gradient: GRADIENTS[2], tags: ['MPB', 'Foco'] },
  { id: 'festa', title: 'Festa Total', emoji: '🎉', gradient: GRADIENTS[4], tags: ['Piseiro', 'Sertanejo'] },
].map((p) => ({ ...p, count: 4 + (p.id.length % 6) }))

// ---- Licenças (tiers aplicados a qualquer música) ----

export const LICENSE_TIERS = [
  { id: 'pessoal', label: 'Uso pessoal', mult: 1, formats: 'MP3 320kbps · não comercial' },
  { id: 'video', label: 'Uso em vídeo', mult: 5, formats: 'MP3 + WAV · YouTube, TikTok, Reels' },
  { id: 'comercial', label: 'Uso comercial', mult: 30, formats: 'Stems separados · uso ilimitado' },
]
