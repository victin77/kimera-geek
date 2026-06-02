# 🚀 Kimera Geek — Handoff / Roadmap

Documento de continuidade do projeto. Site institucional + e-commerce da **Kimera Geek** (Rondonópolis/MT).

---

## 1. Stack atual

- **React 18 + TypeScript + Vite**
- **Tailwind CSS** (design system pop-art em `tailwind.config.js`)
- **Framer Motion** (animações) · **Lucide React** (ícones)
- Roteamento próprio leve em `src/router.tsx` (sem lib externa)
- Estado global (carrinho/favoritos) em `src/context/StoreContext.tsx` com persistência em `localStorage`

### Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção
```

---

## 2. O que já está pronto ✅

- **Header**: logo, navegação, busca funcional (painel animado), favoritos e carrinho (drawers laterais), hambúrguer animado, botão WhatsApp. Links do menu voltam pra home e rolam até a seção.
- **Home**: Hero com carrossel de figures (Fade+Scale, troca a cada 4s, hover sobe) sobre hexágono; barra de benefícios; categorias (clicam → catálogo filtrado); destaques (8 produtos); banner promo; sobre a loja com **mini-mapa do Google Maps**; depoimentos; Instagram; newsletter (visual).
- **Catálogo** (`/catalogo`): busca + filtro por categoria + faixa de preço + paginação. Categoria especial "Promoções".
- **Página de produto** (`/produto/<id>`): imagem, preço, descrição, quantidade, add ao carrinho, favoritar, comprar no WhatsApp, relacionados.
- **Carrinho/Favoritos**: funcionam, persistem no navegador, checkout monta mensagem no WhatsApp.
- **Extras**: botão "voltar ao topo", SEO/Open Graph (`index.html` + `public/og-image.png`), responsivo, WhatsApp real linkado `(66) 99246-0484`.
- **Página de prévia de animações** (`/preview`) — só em desenvolvimento.

### Dados
- Tudo lê de **um único lugar**: `src/data/products.ts` (produtos), `categories.ts`, `testimonials.ts`, `figures.ts`.
- Contato/horários/links em `src/lib/constants.ts`.

---

## 3. Pendências / placeholders ⚠️

- [ ] **Fotos reais** dos produtos (hoje são ilustrações SVG genéricas).
- [ ] **Catálogo real** (nomes/preços/estoque são fictícios).
- [ ] **Otimizar imagens** (logo ~574KB, figures do hero ~700–900KB).
- [ ] **Newsletter** — campo é só visual; ligar num serviço (EmailJS/Mailchimp) ou WhatsApp.
- [ ] **`og:url`** no `index.html` — trocar pela URL real após deploy. Trocar `og-image.png` por um banner caprichado se quiser.
- [ ] **Página 404** (em andamento pelo Victor).
- [ ] **Deploy** (Vercel/Netlify) — lembrar de configurar fallback de SPA pras rotas `/catalogo`, `/produto/...`.

---

## 4. 🎯 Próxima fase: Sistema de gestão (admin) + API + banco

Objetivo: funcionários cadastram produtos/estoque/fotos num **painel separado**, e o site atualiza sozinho.

### Arquitetura (a API fica no meio — o site NUNCA fala direto com o banco)

```
PAINEL ADMIN  ──(escreve, com login)──▶  API + BANCO  ──(lê, só leitura)──▶  SITE PÚBLICO
(sistema Kimera)                         (backend)                          (este projeto)
```

### Por que é seguro
- Dois apps separados: **admin** (com login, só pra funcionários) e **site público** (só lê).
- O site só faz **GET** (não edita/apaga nada).
- **Senha do banco fica só no backend** — nunca no navegador.
- Login + permissões (níveis: dono, atendente…), HTTPS, token de autenticação.

### Fluxo
1. Funcionário loga no painel e cadastra produto (nome, preço, estoque, fotos, categoria).
2. Fotos vão pra um storage (Cloudinary/Supabase Storage); a API salva a URL no banco.
3. Site busca os produtos pela API e exibe.
4. Vendeu → estoque cai no banco → site mostra o novo número.

### Stack recomendada (alinhada com o que o Victor já usa)
- **API**: Node.js + Express + **Prisma** + **PostgreSQL**
- **Fotos**: Cloudinary ou Supabase Storage
- **Painel admin**: app React separado, com **login/JWT**
- **Site**: este projeto, trocando `products.ts` por "buscar da API"

### Passos sugeridos (por etapa)
1. Modelar o banco (tabelas: produtos, categorias, usuários/admin).
2. Subir a API (endpoints públicos de leitura + endpoints protegidos de escrita).
3. Construir o painel admin (login + CRUD de produtos + upload de fotos).
4. Plugar o site na API (trocar a fonte de dados em `src/data/`).

> O site já está preparado: como tudo lê de `src/data/`, plugar na API mexe só nesse ponto, sem refazer telas.

---

## 5. Observações úteis
- O servidor de dev cai se o processo for interrompido — rode `npm run dev` num terminal próprio pra ficar estável.
- Rotas internas usam `navigate()` de `src/router.tsx`.
- Página `/preview` (animações) só aparece em dev (`import.meta.env.DEV`), nunca em produção.
