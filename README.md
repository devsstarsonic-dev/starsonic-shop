<div align="center">

<img src="public/star.svg" alt="StarSonic Shop" width="72" />

# StarSonic Shop

**Marketplace de músicas originais brasileiras.**

Área do cliente: login, biblioteca de músicas, encomendas personalizadas com
fluxo de aprovação e revisões, favoritos e perfil de artista.

Interface single-page, dark, com a identidade neon (ciano → roxo) da marca.

</div>

---

App React (Vite + React Router). Os dados ainda são mock, mas toda a leitura
passa pela camada `src/api/` — o único ponto a trocar quando o backend chegar.

## Rodar

```bash
npm install
npm run dev       # http://localhost:5173
```

```bash
npm run build     # gera dist/
npm run preview   # serve o build de produção
```

> [!TIP]
> Comece pela tela de **Login** e clique em **Entrar** para acessar a área
> logada. A autenticação ainda é fake (`src/auth/AuthContext.jsx`).

## Telas

| Rota | O que faz |
|------|-----------|
| `/`, `/signup` | Login e cadastro (com social login Google/Apple) |
| `/app/musicas` | Biblioteca comprada, com download |
| `/app/encomendas` | Timeline de acompanhamento, player de prévia, aprovação e até 3 revisões |
| `/app/favoritos` | Músicas e artistas salvos |
| `/app/dados` | Perfil, segurança e notificações |
| `/encomendar` | Escolha do produto: música pronta, personalizada ou jingle |
| `/artista/:slug` | Catálogo dinâmico do artista |

## Estrutura

```
starsonic-shop/
├── index.html            # entrypoint do Vite (Tailwind CDN + fontes)
├── public/star.svg       # marca / favicon
├── src/
│   ├── main.jsx          # bootstrap: router + auth provider
│   ├── App.jsx           # rotas
│   ├── index.css         # design tokens + componentes (tema neon dark)
│   ├── api/              # ← camada de dados (troque aqui pro backend)
│   │   ├── client.js     # wrapper fetch (VITE_API_URL)
│   │   └── index.js      # getMe, getPurchases, getArtist, ...
│   ├── auth/             # AuthContext (fake) + ProtectedRoute
│   ├── data/mock.js      # dados mock (compras, favoritos, artistas)
│   ├── hooks/useApi.js   # hook de fetch assíncrono
│   ├── components/       # Header, Layout, Logo, icons
│   └── pages/            # uma tela por arquivo
└── package.json
```

## Ligar o backend

1. Defina `VITE_API_URL` (ex: `.env` com `VITE_API_URL=https://api.starsonic.shop`).
2. Em `src/api/index.js`, troque cada `return mock` por `return get('/rota')`.
3. Em `src/auth/AuthContext.jsx`, troque o `login()` fake por um `POST /auth/login`.

Nada fora de `src/api/` e `src/auth/` sabe de onde os dados vêm.

## Logo

Coloque a logo em **`public/logo.png`** — aparece nas telas de login e cadastro.

> [!NOTE]
> Se o arquivo não existir, a interface cai num lockup de texto (estrela +
> "STARSONIC SHOP"). Nada quebra sem a logo.

## Stack

[React](https://react.dev) + [Vite](https://vitejs.dev) +
[React Router](https://reactrouter.com) · [Tailwind CSS](https://tailwindcss.com)
(via CDN) · tipografia [Inter](https://fonts.google.com/specimen/Inter).
