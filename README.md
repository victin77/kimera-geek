# Kimera Geek 🚀

Site institucional com estrutura de e-commerce para a **Kimera Geek**, loja geek de Rondonópolis/MT. Frontend moderno, responsivo, com identidade visual pop-art / comic store.

## Stack

- **React 18** + **TypeScript**
- **Vite 5**
- **Tailwind CSS 3** (design system pop-art customizado)
- **Framer Motion** (animações)
- **Lucide React** (ícones)

## Como rodar

```bash
npm install
npm run dev      # ambiente de desenvolvimento (http://localhost:5173)
npm run build    # build de produção (pasta dist/)
npm run preview  # pré-visualiza o build
```

## Estrutura

```
src/
├── App.tsx                 # monta a landing page
├── index.css               # base Tailwind + utilitários comic (borda, sombra, halftone)
├── lib/
│   └── constants.ts        # dados da loja, WhatsApp, Instagram, links de navegação
├── data/
│   ├── types.ts            # tipos (Product, Category, Testimonial)
│   ├── products.ts         # produtos fictícios + formatPrice()
│   ├── categories.ts       # categorias
│   └── testimonials.ts     # avaliações reais (texto)
└── components/
    ├── Header.tsx          # navbar fixa + menu hambúrguer
    ├── Hero.tsx            # seção principal
    ├── BenefitsBar.tsx     # faixa de benefícios
    ├── Categories.tsx      # "Escolha seu universo"
    ├── FeaturedProducts.tsx# "Saindo direto da prateleira"
    ├── PromoBanner.tsx     # banner promocional intermediário
    ├── AboutStore.tsx      # "Mais que uma loja"
    ├── Testimonials.tsx    # prova social
    ├── InstagramSection.tsx# feed/comunidade
    ├── Newsletter.tsx      # chamada final
    ├── Footer.tsx          # rodapé
    ├── ProductCard.tsx     # card de produto (reutilizável)
    ├── CategoryCard.tsx    # card de categoria (reutilizável)
    ├── TestimonialCard.tsx # card de avaliação (reutilizável)
    ├── ProductArt.tsx      # ilustrações SVG originais (sem marcas protegidas)
    ├── SectionHeading.tsx  # cabeçalho de seção padronizado
    └── WhatsAppFab.tsx     # botão flutuante de WhatsApp
```

## Como personalizar

- **Contato / WhatsApp / Instagram:** edite `src/lib/constants.ts` (incluindo o número real do WhatsApp em `whatsappNumber`).
- **Produtos / categorias / avaliações:** edite os arquivos em `src/data/`. Estrutura pronta para trocar por API/banco.
- **Cores e fontes:** `tailwind.config.js` (paleta `kimera.*`, sombras `comic`, animações).

## Observações

- As ilustrações dos produtos são SVGs originais em estilo pop-art (`ProductArt.tsx`) — nenhum personagem ou marca protegida é usado. Substitua por fotos reais quando disponíveis.
- Formulário de newsletter e ações de carrinho/favoritos são protótipos visuais, prontos para integração futura.
