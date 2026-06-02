import { ShoppingBag, Plus, Minus, Trash2, MessageCircle } from 'lucide-react'
import { Drawer } from './Drawer'
import { ProductArt } from './ProductArt'
import { useStore } from '../context/StoreContext'
import { getProductById, formatPrice } from '../data/products'
import { whatsappLink } from '../lib/constants'

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, cartCount, cartTotal, setQty, removeFromCart, clearCart } = useStore()

  const items = cart
    .map((c) => ({ item: c, product: getProductById(c.id) }))
    .filter((x) => x.product)

  // mensagem de checkout no WhatsApp
  const checkoutMessage =
    'Olá, Kimera Geek! Quero finalizar meu pedido:\n\n' +
    items
      .map(({ item, product }) => `• ${item.qty}x ${product!.name} — ${formatPrice(product!.price * item.qty)}`)
      .join('\n') +
    `\n\nTotal: ${formatPrice(cartTotal)}`

  const footer =
    items.length > 0 ? (
      <>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-kimera-ink/70">Total</span>
          <span className="font-display text-2xl leading-none text-kimera-ink">
            {formatPrice(cartTotal)}
          </span>
        </div>
        <a
          href={whatsappLink(checkoutMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-comic w-full bg-kimera-orange text-kimera-ink"
        >
          <MessageCircle size={18} />
          Finalizar no WhatsApp
        </a>
      </>
    ) : undefined

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Carrinho"
      icon={ShoppingBag}
      count={cartCount}
      footer={footer}
    >
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map(({ item, product }) => (
            <li
              key={item.id}
              className="flex gap-3 rounded-xl border-[3px] border-kimera-ink bg-white p-3 shadow-comic-sm"
            >
              <div
                className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg border-2 border-kimera-ink"
                style={{ backgroundColor: `${product!.accent}22` }}
              >
                <ProductArt kind={product!.art} accent={product!.accent} className="h-full w-full" />
              </div>

              <div className="flex flex-1 flex-col">
                <p className="text-sm font-extrabold leading-tight text-kimera-ink">
                  {product!.name}
                </p>
                <p className="text-xs font-bold text-kimera-purple">
                  {formatPrice(product!.price)}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  {/* quantidade */}
                  <div className="flex items-center gap-1">
                    <QtyButton label="Diminuir" onClick={() => setQty(item.id, item.qty - 1)}>
                      <Minus size={14} />
                    </QtyButton>
                    <span className="w-6 text-center text-sm font-extrabold">{item.qty}</span>
                    <QtyButton label="Aumentar" onClick={() => setQty(item.id, item.qty + 1)}>
                      <Plus size={14} />
                    </QtyButton>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remover do carrinho"
                    className="grid h-8 w-8 place-items-center rounded-lg text-kimera-ink/60 transition-colors hover:bg-kimera-red/10 hover:text-kimera-red"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </li>
          ))}

          <button
            type="button"
            onClick={clearCart}
            className="mt-1 self-start text-xs font-bold text-kimera-ink/50 underline-offset-2 hover:text-kimera-red hover:underline"
          >
            Esvaziar carrinho
          </button>
        </ul>
      )}
    </Drawer>
  )
}

function EmptyCart() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl border-[3px] border-kimera-ink bg-kimera-yellow/40">
        <ShoppingBag size={28} className="text-kimera-ink" />
      </div>
      <p className="font-extrabold text-kimera-ink">Seu carrinho está vazio</p>
      <p className="max-w-[220px] text-sm font-medium text-kimera-ink/60">
        Adicione produtos pra montar seu pedido e finalizar no WhatsApp.
      </p>
    </div>
  )
}

function QtyButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-7 w-7 place-items-center rounded-md border-2 border-kimera-ink bg-kimera-cream shadow-comic-sm transition-transform active:scale-90"
    >
      {children}
    </button>
  )
}
