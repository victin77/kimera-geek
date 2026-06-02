import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { Drawer } from './Drawer'
import { ProductArt } from './ProductArt'
import { useStore } from '../context/StoreContext'
import { useData } from '../context/DataContext'
import { formatPrice } from '../data/products'

export function FavoritesDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { favorites, favoriteCount, toggleFavorite, addToCart } = useStore()
  const { getProductById } = useData()

  const items = favorites
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <Drawer open={open} onClose={onClose} title="Favoritos" icon={Heart} count={favoriteCount}>
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl border-[3px] border-kimera-ink bg-kimera-red/15">
            <Heart size={28} className="text-kimera-red" />
          </div>
          <p className="font-extrabold text-kimera-ink">Nenhum favorito ainda</p>
          <p className="max-w-[220px] text-sm font-medium text-kimera-ink/60">
            Toque no coração dos produtos pra salvar aqui os que você curtiu.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((product) => (
            <li
              key={product.id}
              className="flex gap-3 rounded-xl border-[3px] border-kimera-ink bg-white p-3 shadow-comic-sm"
            >
              <div
                className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg border-2 border-kimera-ink"
                style={{ backgroundColor: `${product.accent}22` }}
              >
                <ProductArt kind={product.art} accent={product.accent} className="h-full w-full" />
              </div>

              <div className="flex flex-1 flex-col">
                <p className="text-sm font-extrabold leading-tight text-kimera-ink">
                  {product.name}
                </p>
                <p className="text-xs font-bold text-kimera-purple">
                  {formatPrice(product.price)}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => addToCart(product.id)}
                    className="inline-flex items-center gap-1 rounded-lg border-2 border-kimera-ink bg-kimera-yellow px-2.5 py-1 text-xs font-extrabold text-kimera-ink shadow-comic-sm transition-transform active:scale-95"
                  >
                    <ShoppingBag size={13} />
                    Carrinho
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="Remover dos favoritos"
                    className="grid h-8 w-8 place-items-center rounded-lg text-kimera-ink/60 transition-colors hover:bg-kimera-red/10 hover:text-kimera-red"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  )
}
