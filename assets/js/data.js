// Artist catalog. Mock data for the prototype — swap for an API later.
const ARTISTS = {
  demetrio: {
    name: 'Demétrio', initials: 'DM', avatar: 'avatar-2',
    meta: '📍 Itanhaém, SP · starsonic.shop/demetrio · Sertanejo',
    bio: 'Compositor apaixonado por sertanejo. Faço músicas que falam da vida real. Aceito encomendas personalizadas.',
    songs: 12, sales: 423, rating: '4.9 ★',
    catalog: [
      {title:'Coração de Papel', genre:'Sertanejo · 3:42', price:'R$ 9,90', avatar:'avatar-1', tag:'#1 MAIS VENDIDA'},
      {title:'Saudade Boa', genre:'Sertanejo raiz · 4:18', price:'R$ 12,90', avatar:'avatar-2', tag:''},
      {title:'Amor Verdadeiro', genre:'Universitário · 3:15', price:'R$ 8,90', avatar:'avatar-3', tag:''},
      {title:'Estrada da Vida', genre:'Sertanejo raiz · 4:05', price:'R$ 11,90', avatar:'avatar-4', tag:''},
      {title:'Cheiro de Chuva', genre:'Sertanejo · 3:28', price:'R$ 9,90', avatar:'avatar-5', tag:''},
      {title:'Um Novo Dia', genre:'Sertanejo · 3:55', price:'R$ 10,90', avatar:'avatar-6', tag:''}
    ]
  },
  maria: {
    name: 'Maria Silva', initials: 'MR', avatar: 'avatar-3',
    meta: '📍 São Paulo, SP · starsonic.shop/maria · Gospel',
    bio: 'Cantora de gospel e MPB. Componho músicas cheias de fé e emoção pra tocar o coração de quem ouve.',
    songs: 8, sales: 298, rating: '4.8 ★',
    catalog: [
      {title:'Sou Só Gratidão', genre:'Gospel · 4:12', price:'R$ 12,90', avatar:'avatar-3', tag:'#1 MAIS VENDIDA'},
      {title:'Fé Que Move', genre:'Gospel · 3:45', price:'R$ 14,90', avatar:'avatar-2', tag:''},
      {title:'Deus Cuida', genre:'Gospel · 4:20', price:'R$ 11,90', avatar:'avatar-4', tag:''},
      {title:'Meu Grande Amor', genre:'MPB · 3:38', price:'R$ 13,90', avatar:'avatar-5', tag:''}
    ]
  },
  joao: {
    name: 'João Silva', initials: 'JS', avatar: 'avatar-5',
    meta: '📍 Recife, PE · starsonic.shop/joao · Piseiro',
    bio: 'Piseiro raiz do Nordeste. Batida que mexe com todo mundo. Se quiser piseiro pra festa ou vaquejada, é comigo!',
    songs: 15, sales: 187, rating: '4.7 ★',
    catalog: [
      {title:'Bloqueei Cê', genre:'Piseiro · 2:58', price:'R$ 7,90', avatar:'avatar-5', tag:'HIT'},
      {title:'Ela Volta pra Mim', genre:'Piseiro · 3:12', price:'R$ 8,90', avatar:'avatar-6', tag:''},
      {title:'Vaqueiro do Sertão', genre:'Piseiro raiz · 3:40', price:'R$ 9,90', avatar:'avatar-1', tag:''},
      {title:'Xote da Saudade', genre:'Xote · 3:25', price:'R$ 8,90', avatar:'avatar-3', tag:''}
    ]
  }
};
