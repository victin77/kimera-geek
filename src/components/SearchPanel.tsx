import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X, ShoppingBag } from 'lucide-react'
import { ProductArt } from './ProductArt'
import { formatPrice } from '../data/products'
import { useStore } from '../context/StoreContext'
import { useData } from '../context/DataContext'

interface Props {
  open: boolean
  onClose: () => void
}

/** Busca: barra que desce do header com resultados ao vivo. */
export function SearchPanel({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { addToCart } = useStore()
  const { searchProducts } = useData()

  const results = searchProducts(query)

  // foca o input ao abrir e fecha no Esc
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 120)
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', onKey)
      return () => {
        clearTimeout(t)
        window.removeEventListener('keydown', onKey)
      }
    }
    // limpa a busca ao fechar
    setQuery('')
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden border-t-[3px] border-kimera-ink bg-kimera-cream"
        >
          <div className="section-container py-4">
            {/* campo de busca */}
            <div className="flex items-center gap-2 rounded-xl border-[3px] border-kimera-ink bg-white px-3 py-2 shadow-comic-sm focus-within:shadow-comic">
              <Search size={18} className="shrink-0 text-kimera-ink/50" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar produtos, categorias…"
                aria-label="Buscar"
                className="w-full bg-transparent font-semibold text-kimera-ink outline-none placeholder:text-kimera-ink/40"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar busca"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-kimera-ink/60 transition-colors hover:bg-kimera-yellow/50 hover:text-kimera-ink"
              >
                <X size={16} />
              </button>
            </div>

            {/* resultados */}
            {query.trim() && (
              <div className="mt-3">
                {results.length === 0 ? (
                  <p className="px-1 py-3 text-sm font-medium text-kimera-ink/60">
                    Nenhum produto encontrado para “{query}”.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {results.map((p) => (
                      <li
                        key={p.id}
                        className="flex items-center gap-3 rounded-xl border-2 border-kimera-ink bg-white p-2 shadow-comic-sm"
                      >
                        <div
                          className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg border-2 border-kimera-ink"
                          style={{ backgroundColor: `${p.accent}22` }}
                        >
                          <ProductArt kind={p.art} accent={p.accent} className="h-full w-full" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-extrabold text-kimera-ink">{p.name}</p>
                          <p className="text-xs font-bold text-kimera-purple">
                            {p.category} · {formatPrice(p.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(p.id)
                            onClose()
                          }}
                          className="inline-flex shrink-0 items-center gap-1 rounded-lg border-2 border-kimera-ink bg-kimera-orange px-2.5 py-1.5 text-xs font-extrabold text-kimera-ink shadow-comic-sm transition-transform active:scale-95"
                        >
                          <ShoppingBag size={13} />
                          Add
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
