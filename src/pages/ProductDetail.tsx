import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Check,
  Plus,
  Minus,
  Star,
  MessageCircle,
  ShieldCheck,
  MapPin,
  PackageSearch,
} from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { WhatsAppFab } from '../components/WhatsAppFab'
import { ProductArt } from '../components/ProductArt'
import { ProductCard } from '../components/ProductCard'
import { formatPrice } from '../data/products'
import { useStore } from '../context/StoreContext'
import { useData } from '../context/DataContext'
import { useRouter } from '../router'
import { whatsappLink, STORE } from '../lib/constants'
import type { Product, ProductBadge } from '../data/types'

const badgeStyles: Record<ProductBadge, string> = {
  NOVO: 'bg-kimera-purple text-white',
  'MAIS VENDIDO': 'bg-kimera-orange text-kimera-ink',
  'EDIÇÃO ESPECIAL': 'bg-kimera-ink text-kimera-yellow',
  PROMO: 'bg-kimera-red text-white',
}

function describe(p: Product): string {
  const tipo = p.badge ? p.badge.toLowerCase() : 'especial'
  return `${p.name} faz parte da nossa seleção de ${p.category}. Um item ${tipo} pra quem vive a cultura pop — perfeito pra colecionar, decorar o cantinho geek ou presentear alguém que ama o universo nerd. Curadoria Kimera Geek: produtos únicos, com aquele capricho que você só encontra aqui. Dúvidas sobre disponibilidade, variações ou tamanhos? É só chamar no WhatsApp!`
}

export function ProductDetail({ id }: { id: string }) {
  const { navigate } = useRouter()
  const { addToCart, toggleFavorite, isFavorite } = useStore()
  const { products, getProductById, loading } = useData()
  const product = getProductById(id)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  // ainda carregando os produtos da API: evita "não encontrado" prematuro
  if (!product && loading) {
    return (
      <div className="min-h-screen bg-kimera-cream">
        <Header />
        <div className="section-container py-32 text-center text-kimera-ink/50">Carregando…</div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-kimera-cream">
        <Header />
        <div className="section-container flex flex-col items-center justify-center gap-4 py-32 text-center">
          <PackageSearch size={48} className="text-kimera-ink/40" />
          <h1 className="heading-comic text-3xl text-kimera-ink">Produto não encontrado</h1>
          <button onClick={() => navigate('/catalogo')} className="btn-comic bg-kimera-yellow text-kimera-ink">
            Ver catálogo
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const fav = isFavorite(product.id)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAdd = () => {
    addToCart(product.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="min-h-screen bg-kimera-cream">
      <Header />

      <main className="section-container pt-28 lg:pt-32">
        {/* voltar */}
        <button
          type="button"
          onClick={() => navigate('/catalogo')}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-kimera-ink/70 transition-colors hover:text-kimera-ink"
        >
          <ArrowLeft size={16} />
          Voltar pro catálogo
        </button>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* imagem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-square overflow-hidden rounded-3xl border-[3px] border-kimera-ink shadow-comic-lg"
            style={{ backgroundColor: `${product.accent}22` }}
          >
            <div className="absolute inset-0 bg-halftone bg-dots opacity-30" />
            {product.image ? (
              <img src={product.image} alt={product.name} className="relative h-full w-full object-cover" />
            ) : (
              <ProductArt kind={product.art} accent={product.accent} className="relative h-full w-full p-6" />
            )}
            {product.badge && (
              <span className={`comic-tag absolute left-4 top-4 ${badgeStyles[product.badge]}`}>
                {product.badge}
              </span>
            )}
          </motion.div>

          {/* infos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="text-sm font-bold uppercase tracking-wide text-kimera-purple">
              {product.category}
            </span>
            <h1 className="heading-comic mt-2 text-3xl text-kimera-ink sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex gap-0.5" aria-label="4,9 de 5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-kimera-yellow text-kimera-ink" strokeWidth={1.5} />
                ))}
              </div>
              <span className="text-sm font-semibold text-kimera-ink/60">4,9 · +170 avaliações</span>
            </div>

            <div className="mt-5 flex items-end gap-3">
              <span className="font-display text-4xl leading-none text-kimera-ink">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="mb-1 text-lg font-semibold text-kimera-ink/40 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            <p className="mt-5 text-base font-medium leading-relaxed text-kimera-ink/70">
              {describe(product)}
            </p>

            {/* quantidade + ações */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded-xl border-[3px] border-kimera-ink bg-white p-1 shadow-comic-sm">
                <button
                  type="button"
                  aria-label="Diminuir"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-9 w-9 place-items-center rounded-lg transition-colors hover:bg-kimera-yellow/50"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-extrabold">{qty}</span>
                <button
                  type="button"
                  aria-label="Aumentar"
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-9 w-9 place-items-center rounded-lg transition-colors hover:bg-kimera-yellow/50"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`btn-comic flex-1 text-sm ${added ? 'bg-kimera-purple text-white' : 'bg-kimera-yellow text-kimera-ink'}`}
              >
                {added ? <><Check size={18} /> Adicionado!</> : <><ShoppingBag size={18} /> Adicionar ao carrinho</>}
              </button>

              <button
                type="button"
                onClick={() => toggleFavorite(product.id)}
                aria-label={fav ? 'Remover dos favoritos' : 'Favoritar'}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-[3px] border-kimera-ink bg-white shadow-comic-sm transition-transform active:scale-90"
              >
                <Heart size={20} className={fav ? 'fill-kimera-red text-kimera-red' : 'text-kimera-ink'} />
              </button>
            </div>

            <a
              href={whatsappLink(`Olá! Tenho interesse no produto "${product.name}" (${formatPrice(product.price)}). Ainda está disponível?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-comic mt-3 w-full bg-kimera-orange text-kimera-ink"
            >
              <MessageCircle size={18} />
              Comprar pelo WhatsApp
            </a>

            {/* benefícios */}
            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Benefit icon={ShieldCheck} text="Compra segura e atendimento próximo" />
              <Benefit icon={MapPin} text={`Retirada/entrega em ${STORE.city}`} />
            </div>
          </motion.div>
        </div>

        {/* relacionados */}
        {related.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="heading-comic text-2xl text-kimera-ink sm:text-3xl">
              Quem viu, também curtiu
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <div className="mt-16" />
      <Footer />
      <WhatsAppFab />
    </div>
  )
}

function Benefit({ icon: Icon, text }: { icon: typeof ShieldCheck; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border-2 border-kimera-ink/15 bg-white px-3 py-2.5">
      <Icon size={18} className="shrink-0 text-kimera-orange" strokeWidth={2.5} />
      <span className="text-sm font-semibold text-kimera-ink/75">{text}</span>
    </div>
  )
}
