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

export const artists = {
  demetrio: {
    name: 'Demétrio', initials: 'DM', avatar: 'avatar-2', verified: true, photo: PHOTO_DEMETRIO,
    banner: 'linear-gradient(120deg, #7c3aed, #a855f7 45%, #ec4899)',
    hero: ['#2e1065', '#7c3aed', '#ec4899'], monthly: '84,3 mil', playsBase: 1240000,
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
    banner: 'linear-gradient(120deg, #0ea5e9, #6366f1 50%, #a855f7)',
    hero: ['#0c2b4a', '#0ea5e9', '#a855f7'], monthly: '52,1 mil', playsBase: 890000,
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
    banner: 'linear-gradient(120deg, #6366f1, #8b5cf6 50%, #22d3ee)',
    hero: ['#1e1b4b', '#6366f1', '#22d3ee'], monthly: '163 mil', playsBase: 2100000,
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
