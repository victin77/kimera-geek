import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { getProductById } from '../data/products'

const FAV_KEY = 'kimera.favorites'
const CART_KEY = 'kimera.cart'

export interface CartItem {
  id: string
  qty: number
}

interface StoreContextValue {
  // favoritos
  favorites: string[]
  favoriteCount: number
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
  // carrinho
  cart: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (id: string, qty?: number) => void
  removeFromCart: (id: string) => void
  setQty: (id: string, qty: number) => void
  clearCart: () => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => load(FAV_KEY, []))
  const [cart, setCart] = useState<CartItem[]>(() => load(CART_KEY, []))

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  const value = useMemo<StoreContextValue>(() => {
    const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
    const cartTotal = cart.reduce((sum, i) => {
      const p = getProductById(i.id)
      return sum + (p ? p.price * i.qty : 0)
    }, 0)

    return {
      favorites,
      favoriteCount: favorites.length,
      isFavorite: (id) => favorites.includes(id),
      toggleFavorite: (id) =>
        setFavorites((f) =>
          f.includes(id) ? f.filter((x) => x !== id) : [...f, id],
        ),
      cart,
      cartCount,
      cartTotal,
      addToCart: (id, qty = 1) =>
        setCart((c) => {
          const existing = c.find((i) => i.id === id)
          if (existing) {
            return c.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
          }
          return [...c, { id, qty }]
        }),
      removeFromCart: (id) => setCart((c) => c.filter((i) => i.id !== id)),
      setQty: (id, qty) =>
        setCart((c) =>
          qty <= 0
            ? c.filter((i) => i.id !== id)
            : c.map((i) => (i.id === id ? { ...i, qty } : i)),
        ),
      clearCart: () => setCart([]),
    }
  }, [favorites, cart])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore deve ser usado dentro de <StoreProvider>')
  return ctx
}
