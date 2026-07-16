# Plano de Construção — StarSonic Shop (Marketplace completo)

> Documento-guia para transformar o protótipo HTML de marketplace em um app
> React + Vite coeso, unindo-o à área do cliente que já existe, **sem tocar no
> login/cadastro** e **sem nenhum vestígio de IA**.
>
> Este é um plano. Nada de código é escrito aqui — ele é a fonte da verdade
> para a implementação em fases.

---

## 1. Decisões travadas (não reabrir sem alinhamento)

| # | Decisão | Efeito |
|---|---------|--------|
| 1 | **Zero IA.** Sem selos "IA", sem "Artista Virtual", sem "voz sintética". Artistas e músicas são tratados como reais. | Remove `ai-badge`, textos "Gerada por IA", "voz sintética criada por IA" do protótipo. |
| 2 | **Mantém separação Compositor ↔ Artista.** Um compositor (autor) publica sob um ou mais artistas (nome artístico/projeto). | Duas páginas de perfil: `Compositor` e `Artista`. |
| 3 | **Marketplace público + conta logada, com Encomendas.** "Biblioteca" do protótipo funde com "Minhas músicas". O fluxo de encomenda personalizada existente é preservado. | Novo shell de marketplace + reaproveita a área do cliente atual. |
| 4 | **Login/Cadastro intocados.** `Login.jsx` e `Signup.jsx` ficam exatamente como estão. | Nenhuma alteração em `/` e `/signup`. |
| 5 | **Paleta oficial.** Cyan `#00c5e4`, Roxo `#16024f`, Branco `#fff`. As cores antigas do protótipo (`#22d3ee`, `#a855f7`, `#ec4899`, `#030310`) são traduzidas. | Ver §4. |
| 6 | **Tipografia da marca (Inter).** Descarta Space Grotesk e JetBrains Mono do protótipo. Números usam `tabular-nums` do próprio Inter. | Consistência com a marca. |

---

## 2. Princípios de design (das skills)

Aplicando `frontend-design` + `ui-ux-pro-max`:

- **Hierarquia por superfície, não só por cor.** 3 tiers já definidos em `src/index.css` (`--surface-1/2/3`). Todo container novo escolhe um tier — nunca "mais um card transparente".
- **Uma CTA primária por tela.** Cyan sólido é reservado para a ação principal. Ações secundárias em `btn-secondary`/`btn-ghost`.
- **Movimento com significado.** Cada animação comunica causa→efeito (hover = "clicável", entrada em stagger = "lista carregando"). Nada decorativo. Sempre respeitando `prefers-reduced-motion`.
- **Roxo é o palco.** Fundo dominante `#16024f`; conteúdo brilha sobre ele. Sem o starfield na área logada (já removido).
- **Sombra tingida de roxo + glow cyan** nos estados interativos — dá profundidade sem sujar.
- **Cor semântica preservada.** Status (pago/pendente/entregue/revisão) mantém verde/âmbar/vermelho — informação, não decoração.

---

## 3. Sistema de design (tokens)

Estende o `:root` que **já existe** em `src/index.css`. Tokens atuais confirmados:
`--brand-cyan #00c5e4`, `--brand-cyan-light #3fdcf5`, `--brand-cyan-tint #3fdcf5`,
`--brand-purple #16024f`, `--brand-purple-deep #0c0230`,
`--brand-violet #8b5cf6`, `--brand-violet-deep #5b21b6`,
`--surface-1/2/3`.

### 3.1 A adicionar

```
/* Elevação (sombra tingida de roxo + glow) */
--elev-1: 0 8px 24px rgba(4,0,20,.28);                    /* card em repouso */
--elev-2: 0 14px 38px rgba(4,0,20,.42);                   /* card hover */
--elev-3: 0 20px 46px rgba(4,0,20,.55), 0 0 40px rgba(0,197,228,.14); /* sticky/modal */
--glow-cyan: 0 8px 24px rgba(0,197,228,.35);              /* CTA / play */

/* Raios */
--r-sm: 10px; --r-md: 14px; --r-lg: 16px; --r-xl: 20px; --r-pill: 999px;

/* Motion */
--dur-micro: 160ms;   /* hover, toggle */
--dur-ui: 240ms;      /* card, sheet */
--dur-page: 320ms;    /* transição de rota/seção */
--ease-out: cubic-bezier(.22,1,.36,1);   /* entrada */
--ease-in: cubic-bezier(.4,0,1,1);        /* saída */

/* Semânticos (mantidos) */
--ok:#10b981; --ok-ink:#34d399;
--warn:#f59e0b; --warn-ink:#fbbf24;
--danger:#ef4444; --danger-ink:#f87171;
--hot:#f59e0b;   /* "em alta"/#1 trending — âmbar, não rosa */
```

### 3.2 Tipografia (Inter, papéis)

| Papel | Fonte / peso | Uso |
|-------|--------------|-----|
| Display | Inter 800–900, `letter-spacing:-.02em` | Títulos de hero, nomes de artista/música (substitui Space Grotesk) |
| Título | Inter 700 | Seções, cabeçalhos de card |
| Corpo | Inter 400 | Texto geral |
| Rótulo | Inter 500–600, `uppercase`, `tracking-widest` | Eyebrows, labels de stat |
| Números | Inter + `font-variant-numeric: tabular-nums` | Preços, streams, timers (substitui JetBrains Mono) |

---

## 4. Tradução do protótipo → paleta oficial

Tabela de-para obrigatória ao portar cada tela:

| Protótipo (antigo) | Oficial | Onde |
|--------------------|---------|------|
| `#030310` / `#050514` (fundo) | `#0c0230` (deep) / `#16024f` (body) | `body`, `.bg-grid` |
| `#22d3ee` (cyan) | `#00c5e4` | CTAs, acentos, links ativos |
| `#a855f7` (roxo) | `#8b5cf6` (`--brand-violet`) | 2º stop de gradiente, acento |
| `#ec4899` (rosa) | `#5b21b6` (`--brand-violet-deep`) — decorativo; ou `--hot` âmbar quando for "trending" | Gradientes, badge #1 |
| `#67e8f9` / `#c084fc` / `#f472b6` (tints) | `--brand-cyan-tint` / `--brand-violet` | Ícones e textos sobre chips escuros |
| `.card` (rgba 15,18,50,.6) | `--surface-2` + `--elev-1` | Containers |
| `.badge-cyan/purple/pink` | Reduzir a: cyan (info), violet (categoria), + semânticos | Badges |
| `cover-art g1..g8` | Recompor só com família cyan↔violet (como os avatares já foram) | Capas |
| Fonte `display` (Space Grotesk) | Inter 800/900 | Títulos |
| `.mono` (JetBrains) | Inter `tabular-nums` | Números |

> **Regra:** nenhuma cor fora de {cyan, roxo/violet, branco, neutros de leitura, semânticos}. Rosa puro sai.

---

## 5. Arquitetura de informação & rotas

### 5.1 Shell
Hoje `Layout.jsx` = `Header` (só conta) + `Outlet`. O marketplace precisa de um
**TopNav** completo (logo, nav, busca, carrinho, avatar) — o header atual vira
o menu do avatar. O `Backgrounds` (aurora, sem starfield) continua global.

### 5.2 Mapa de rotas (novo → funde com atual)

| Rota | Tela | Origem | Ação |
|------|------|--------|------|
| `/` | Login | existe | **intocado** |
| `/signup` | Cadastro | existe | **intocado** |
| `/inicio` | Home marketplace | protótipo `01` | **criar**; vira destino pós-login |
| `/explorar` | Catálogo + filtros | protótipo `02` | **criar** |
| `/genero/:slug` | Página de gênero | protótipo `06` | **criar** |
| `/musica/:id` | Página de música (produto) | protótipo `03` | **criar** |
| `/artista/:slug` | Perfil de artista | existe (`Artist.jsx`) | **evoluir** p/ layout do protótipo `04` |
| `/compositor/:slug` | Perfil de compositor | protótipo `05` | **criar** |
| `/carrinho` | Carrinho + checkout | protótipo `07` | **criar** (+ `CartContext`) |
| `/biblioteca` | Biblioteca (tabs) | protótipo `08` + `Purchases.jsx` | **fundir** |
| `/conta/dados` | Meus dados | `AccountData.jsx` | reaproveitar |
| `/encomendas` | Encomendas | `Orders.jsx` | manter |
| `/encomendar`, `/encomendar/personalizada`, `/encomenda/aprovar`, `/encomenda/alteracao` | Fluxo de encomenda | existe | **manter intacto** |
| `/app/*` | — | atual | **redirect** → equivalentes novos (back-compat) |

### 5.3 Navegação do TopNav
`Início · Explorar · Gêneros · Biblioteca` + busca + carrinho (com contador) +
avatar (menu: Biblioteca, Encomendas, Favoritos, Meus dados, Sair).
Estado ativo em cyan. Mobile: colapsar em hambúrguer + possível bottom-nav (≤5).

---

## 6. Modelo de dados (expandir `src/data/mock.js`)

Hoje: `purchases`, `favoriteSongs`, `artists{demetrio,maria,joao}`. Expandir para
o marketplace, mantendo o **seam** de `src/api/index.js` (cada tela consome via
`useApi`, troca pra backend depois). Shapes propostos:

```
composer  { slug, name, initials, city, uf, verified, since,
            specialties[], stats{artists,songs,streams,rating,reviews},
            achievements[], artists[slug] }

artist    { slug, name, initials, composerSlug, genres[], gradient,
            bio, voice{gender,tone,timbre}, stats{streams,songs,followers,rating},
            catalog[songId] }

song      { id, title, artistSlug, composerSlug, genre, subgenre, mood,
            gradient, durationSec, bpm, key, priceCents, licenses[],
            stats{streams,sales,likes,rating,reviews}, lyrics[], releasedAt }

genre     { slug, name, gradient, counts{songs,artists,streamsMonth}, subgenres[] }

playlist  { id, title, emoji, gradient, count, tags[] }

license   { id, label, priceCents, formats[], scope }   /* pessoal, vídeo, comercial */
```

Estado de sessão (React context, sem backend):
- `AuthContext` (existe).
- **`CartContext`** (novo): `items[]`, `add`, `remove`, `clear`, `total`, `count`.
- **`PlayerContext`** (novo, opcional): faixa atual + show/hide do StickyPlayer.

Novas funções no seam (`api/index.js`): `getHome`, `getCatalog(filtros)`,
`getSong(id)`, `getComposer(slug)`, `getGenre(slug)`, `getLibrary`, `getPlaylists`.

---

## 7. Inventário de telas

Para cada tela: rota, o que reusa, o que cria, estados a cobrir.

### 7.1 Home (`/inicio`) — criar
- **Blocos:** hero (headline + stats catálogo), Trending (grid de música), Artistas em alta, Gêneros (grid colorido), Compositores em destaque, Playlists da semana.
- **Reusa:** `MusicCard`, `ArtistCard`, `ComposerCard`, `GenreCard`, `CoverArt`, `Wave`.
- **Estados:** loading (skeleton), hover de card, clique → rota correspondente.
- **Sem IA:** remover selo `IA` dos cards; hero fala de "artistas e compositores", não "artistas virtuais".

### 7.2 Explorar (`/explorar`) — criar
- Sidebar de filtros (gênero, vibe, preço, BPM, origem) + grid + ordenar + paginação + chips ativos.
- **Origem** deixa de ser "Artista Virtual/Humano" → filtro por **gênero/compositor/artista**.
- Mobile: sidebar vira **drawer**; grid 4→2→1 col.
- Estados: vazio ("nenhuma música encontrada"), loading, filtro ativo/removido.

### 7.3 Música (`/musica/:id`) — criar
- Hero (capa + wave + artista + compositor + player + preço + comprar), stats, letra, detalhes técnicos (duração/BPM/tom/formato/idioma/data), similares, sidebar de **licenças** (pessoal/vídeo/comercial), bloco do compositor, compartilhar.
- **Comprar** → adiciona ao `CartContext` + toast + (opcional) ir ao carrinho.
- Remove "Gerada por IA".

### 7.4 Artista (`/artista/:slug`) — evoluir o existente
- `Artist.jsx` já tem hero rico (liquid-ether, capa, catálogo, buy modal). Alinhar ao layout do protótipo `04`: stats (streams/músicas/seguidores/avaliação), tabela de discografia, "comprar pacote completo", link pro compositor criador.
- **"Sobre a voz"/"DNA do artista"** fica, mas reescrito sem "voz sintética criada por IA" — descrição de estilo/timbre como artista real.
- Reusa toda a base `sp-*` já estilizada.

### 7.5 Compositor (`/compositor/:slug`) — criar
- Hero (avatar, verificado, local, bio, stats), "Vozes/Projetos que ele criou" (grid de artistas), últimos lançamentos, reviews, sidebar Sobre + Conquistas.
- Liga com o modelo Compositor↔Artista (decisão #2).

### 7.6 Gênero (`/genero/:slug`) — criar
- Hero colorido do gênero (traduzir gradiente), sub-gêneros (chips), Top 10 (lista ranqueada), artistas em alta, novos lançamentos.

### 7.7 Carrinho / Checkout (`/carrinho`) — criar
- Lista de itens (remover), cupom, resumo (subtotal/taxa/cashback/total), pagamento (PIX/cartão/saldo — **visual**), "split transparente", finalizar → toast + vai pra Biblioteca.
- `CartContext` alimenta contador do TopNav.
- A11y: total em `aria-live`, foco em erros.

### 7.8 Biblioteca (`/biblioteca`) — fundir com `Purchases.jsx`
- KPIs (compradas/curtidas/playlists/gasto), tabs (Comprados, Curtidas, Playlists, Histórico, Seguindo), tabela de faixas com baixar/ouvir.
- **Comprados** = dados de `purchases` (mock atual). Baixar/Ouvir reusam ícones existentes.

### 7.9 Conta / Encomendas — manter
- `AccountData.jsx` → `/conta/dados`. `Orders.jsx` + fluxo `/encomendar/*` intactos, só reestilizados pelos tokens novos (herdam automático).

---

## 8. Componentes reutilizáveis a criar

Centralizar em `src/components/` (e `src/components/market/`):

| Componente | Substitui no protótipo | Notas |
|------------|------------------------|-------|
| `TopNav` | `.topnav` | Logo real, busca, carrinho, avatar. Responsivo. |
| `SearchBar` | `.search-bar` | Client-side filter. |
| `CoverArt` | `.cover-art` | Gradiente da faixa (família cyan↔violet) + overlay de play. |
| `MusicCard` | card de música | Hover elevação + play. |
| `ArtistCard` / `ComposerCard` | cards de perfil | |
| `GenreCard` | card de gênero | Gradiente traduzido. |
| `Wave` | `.wave` | Equalizer decorativo; pausa em reduced-motion. |
| `StickyPlayer` | `.player-sticky` | Via `PlayerContext`. |
| `Toast` | `.toast` / `showToast()` | Provider + `aria-live="polite"`, auto-dismiss 3–5s. |
| `Badge` | `.badge-*` | Variantes: info(cyan), categoria(violet), semânticos. |
| `FilterSidebar` | filtros do Explorar | Drawer no mobile. |
| `TrackTable` / `TrackRow` | tabelas de discografia/biblioteca | `aria-sort`, teclado. |
| `Stars` / `Rating` | estrelas | |
| `StatTile` | blocos de stat | |
| `PricePill` | preço | `tabular-nums`. |

Já existem e reusar: `Backgrounds` (aurora), `icons.jsx` (estender: `Cart`, `ChevronLeft/Right`, `Share`, `Download`, `Filter`, `X`), `useApi`, seam `api/`.

---

## 9. Animações & micro-interações

Aplicando `ui-ux-pro-max` (§7 Animation) e a skill de motion:

- **Hovers (`--dur-micro`, `--ease-out`):** cards sobem `translateY(-2px|-4px)`, borda vai a `rgba(0,197,228,.3)`, sombra `--elev-1`→`--elev-2`. Só `transform`/`opacity`/`box-shadow` (nunca width/height/top/left).
- **Play em capa:** overlay `opacity 0→1` + botão `scale(1)→1.06` no hover; feedback de press `scale(.96)`.
- **Transição de rota (`--dur-page`):** fade + slide curto (entra de baixo = "mais fundo"; volta = de cima). Wrapper de transição no `Outlet` ou keyframe por rota. Respeitar reduced-motion (só fade).
- **Stagger de listas:** itens de grid entram com atraso de 30–50ms cada (cap para não passar de ~8 itens animados).
- **Saída mais rápida que entrada** (~60–70%).
- **Toast:** slide-in da direita, `--ease-out`.
- **StickyPlayer/Carrinho:** contador com micro-bump ao adicionar item.
- **Reduced-motion:** `prefers-reduced-motion: reduce` desliga wave, parallax do liquid-ether, stagger e transições longas (já há bloco base no `index.css` — estender).

---

## 10. Acessibilidade & responsividade (quality floor)

- **Contraste:** cyan `#00c5e4` como acento; texto sempre branco/neutro sobre roxo (>4.5:1). Validar cyan-sobre-roxo em textos pequenos (usar branco pra corpo, cyan só pra destaque/borda).
- **Foco visível** em todo elemento interativo (2–3px).
- **Ícone-só** (carrinho, play, share) com `aria-label`.
- **Tabelas** com `<th>`, `aria-sort`; navegáveis por teclado.
- **Carrinho/checkout:** erros próximos ao campo, `role="alert"`, foco no 1º inválido.
- **Cor nunca sozinha:** status sempre com ícone/texto além da cor.
- **Responsivo mobile-first:** breakpoints 375/768/1024/1440. Grids 6/4 col → 2/1; sidebar de filtro → drawer; topnav → hamburguer; alvos de toque ≥44px; sem scroll horizontal.
- **Imagens/capas** com dimensões reservadas (sem CLS).

---

## 11. Fases de implementação

Ordem sugerida (cada fase entrega algo navegável):

- **Fase 0 — Fundação**
  Estender tokens no `index.css` (§3.1); `TopNav` + shell de marketplace; `CartContext` (+ `PlayerContext`); novo roteamento (§5.2) com redirects de `/app/*`; expandir `mock.js` + funções no seam (§6).
- **Fase 1 — Descoberta**
  Home (`/inicio`), Explorar (`/explorar`), Gênero (`/genero/:slug`) + cards reutilizáveis (§8).
- **Fase 2 — Produto & perfis**
  Música (`/musica/:id`), evoluir Artista (`/artista/:slug`), Compositor (`/compositor/:slug`).
- **Fase 3 — Comércio**
  Carrinho/Checkout (`/carrinho`), `StickyPlayer`, `Toast` provider, botões "Comprar" alimentando o carrinho.
- **Fase 4 — Biblioteca & conta**
  Biblioteca (`/biblioteca`, funde `Purchases`), `/conta/dados`, manter Encomendas e fluxo `/encomendar/*`.
- **Fase 5 — Polimento**
  Animações/transições, responsividade, a11y, `prefers-reduced-motion`, QA em Chrome/Firefox/Safari/Opera GX.

---

## 12. Fora de escopo / riscos / atenção

- **Áudio real** não entra: player e wave são visuais (mock). Marcar como upgrade futuro.
- **Pagamento real** (PIX/Pagar.me/cartão) é visual — nenhuma integração.
- **Backend**: continua no seam de mock (`api/`); nada de fetch real ainda.
- **Busca**: filtro client-side sobre o mock; não é busca de servidor.
- **Login/Signup**: proibido tocar (decisão #4). Ao mexer no roteamento, garantir que `/` e `/signup` seguem idênticos.
- **Consistência de IA**: revisar cada texto portado do protótipo — ele está cheio de "IA/Virtual/voz sintética". Rodar busca final antes de fechar cada fase.
- **Não recriar** o que já existe: `Backgrounds`, `icons`, `useApi`, seam, tokens de superfície, fluxo de encomenda — reaproveitar.
- **Ícones da marca Google** no login ficam nas cores oficiais (não recolorir).

---

### Anexo — telas do protótipo → destino

`01 Home → /inicio` · `02 Explorar → /explorar` · `03 Música → /musica/:id` ·
`04 Artista → /artista/:slug (evoluir)` · `05 Compositor → /compositor/:slug` ·
`06 Gênero → /genero/:slug` · `07 Carrinho → /carrinho` · `08 Biblioteca → /biblioteca (funde Minhas músicas)`.
