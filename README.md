# StarSonic Shop

Marketplace de músicas originais brasileiras. Protótipo da **área do cliente**:
login, biblioteca de músicas, encomendas personalizadas com fluxo de aprovação
e revisões, favoritos e perfil de artista.

Interface single-page, dark, com a identidade neon (ciano → roxo) da marca.
Sem back-end e sem build — abre direto no navegador.

## Rodar

```bash
# opção 1: abrir o arquivo
start index.html        # Windows

# opção 2: servidor local (recomendado)
python -m http.server 8000
# depois abra http://localhost:8000
```

Fluxo sugerido: comece na tela de **Login** → botão **Entrar** leva pra área logada.

## Estrutura

```
starsonic-shop/
├── index.html            # todas as telas (views) e a estrutura da página
├── assets/
│   ├── css/styles.css     # design tokens + componentes (tema neon dark)
│   ├── js/data.js         # catálogo de artistas (dados mock)
│   ├── js/app.js          # navegação entre views, abas e perfil do artista
│   └── img/
│       ├── logo.png        # ⚠️ coloque aqui a logo enviada (ver abaixo)
│       └── star.svg        # marca / favicon (gerado)
└── README.md
```

## Logo

Salve a imagem da logo em **`assets/img/logo.png`**. Ela aparece nas telas de
login e cadastro. Se o arquivo não existir, a interface cai automaticamente num
lockup de texto (estrela + "STARSONIC SHOP"), então nada quebra.

## Telas incluídas

- **Login** e **Cadastro** (com social login Google/Apple)
- **Minhas músicas** — biblioteca comprada, download
- **Encomendas** — acompanhamento com timeline, player de prévia, aprovação e até 3 revisões
- **Favoritos** — músicas e artistas salvos
- **Meus dados** — perfil, segurança, notificações
- **Nova encomenda** — música pronta, personalizada ou jingle
- **Perfil do artista** — catálogo dinâmico (renderizado de `data.js`)

## Stack

HTML + [Tailwind CSS](https://tailwindcss.com) (via CDN) + JavaScript puro.
Fonte [Inter](https://fonts.google.com/specimen/Inter). Sem dependências pra instalar.
