// Cliente da API do sistema interno da Kimera (somente leitura no site público).
// A URL vem de VITE_API_URL; em dev cai no localhost:4000.

const BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:4000').replace(/\/$/, '')

export type ApiBadge = 'NOVO' | 'MAIS_VENDIDO' | 'EDICAO_ESPECIAL' | 'PROMO'

export interface ApiCategory {
  id: string
  name: string
  slug: string
  description?: string | null
  accent: string
  icon?: string | null
  productCount?: number
}

export interface ApiProduct {
  id: string
  name: string
  slug: string
  description: string
  price: number
  oldPrice: number | null
  stock: number
  badge: ApiBadge | null
  accent: string
  images: string[]
  active: boolean
  featured: boolean
  categoryId: string
  category?: ApiCategory
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}/api${path}`)
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json() as Promise<T>
}

export const apiProducts = () => get<ApiProduct[]>('/products')
export const apiCategories = () => get<ApiCategory[]>('/categories')
