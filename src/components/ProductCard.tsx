import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Check } from 'lucide-react'
import type { Product, ProductBadge } from '../data/types'
import { formatPrice } from '../data/products'
import { ProductArt } from './ProductArt'
import { useStore } from '../context/StoreContext'
import { useRouter } from '../router'

const badgeStyles: Record<ProductBadge, string> = {
  NOVO: 'bg-kimera-purple text-white',
  'MAIS VENDIDO': 'bg-kimera-orange text-kimera-ink',
  'EDIÇÃO ESPECIAL': 'bg-kimera-ink text-kimera-yellow',
  PROMO: 'bg-kimera-red text-white',
}

export function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite, addToCart } = useStore()
  const { navigate } = useRouter()
  const fav = isFavorite(product.id)
  const [added, setAdded] = useState(false)

  const openProduct = () => navigate(`/produto/${product.id}`)

  const handleAdd = () => {
    addToCart(product.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.99 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border-[3px] border-kimera-ink bg-white shadow-comic transition-shadow duration-200 hover:shadow-comic-lg"
    >
      {/* topo: arte + etiqueta + favorito */}
      <div
        onClick={openProduct}
        role="link"
        aria-label={`Ver ${product.name}`}
        className="relative aspect-square cursor-pointer overflow-hidden border-b-[3px] border-kimera-ink"
        style={{ backgroundColor: `${product.accent}22` }}
      >
        <ProductArt
          kind={product.art}
          accent={product.accent}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />

        {product.badge && (
          <span
            className={`comic-tag absolute left-3 top-3 animate-pulse-tag ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(product.id)
          }}
          aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={fav}
          whileTap={{ scale: 0.8 }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border-2 border-kimera-ink bg-white shadow-comic-sm"
        >
          <motion.span key={String(fav)} initial={{ scale: 0.6 }} animate={{ scale: 1 }}>
            <Heart
              size={18}
              className={fav ? 'fill-kimera-red text-kimera-red' : 'text-kimera-ink'}
            />
          </motion.span>
        </motion.button>
      </div>

      {/* corpo */}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-bold uppercase tracking-wide text-kimera-purple">
          {product.category}
        </span>
        <h3
          onClick={openProduct}
          className="mt-1 cursor-pointer text-base font-extrabold leading-tight text-kimera-ink transition-colors hover:text-kimera-orange"
        >
          {product.name}
        </h3>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-xl font-black text-kimera-ink">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="mb-0.5 text-sm font-semibold text-kimera-ink/40 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`btn-comic mt-4 w-full text-sm transition-colors ${
            added ? 'bg-kimera-purple text-white' : 'bg-kimera-yellow text-kimera-ink'
          }`}
        >
          {added ? (
            <>
              <Check size={18} />
              Adicionado!
            </>
          ) : (
            <>
              <ShoppingBag size={18} />
              Adicionar
            </>
          )}
        </button>
      </div>
    </motion.article>
  )
}
