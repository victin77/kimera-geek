import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Product, Category } from '../data/types'
import { products as staticProducts } from '../data/products'
import { categories as staticCategories } from '../data/categories'
import { apiProducts, apiCategories } from '../lib/api'
import { adaptProduct, adaptCategory } from '../data/adapt'

interface DataValue {
  products: Product[]
  categories: Category[]
  loading: boolean
  /** de onde vieram os dados atuais */
  source: 'api' | 'fallback'
  getProductById: (id: string) => Product | undefined
  searchProducts: (query: string) => Product[]
  productCategories: string[]
}

const DataContext = createContext<DataValue | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  // começa com os dados estáticos (render instantâneo, nunca vazio)
  const [products, setProducts] = useState<Product[]>(staticProducts)
  const [categories, setCategories] = useState<Category[]>(staticCategories)
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<'api' | 'fallback'>('fallback')

  useEffect(() => {
    let alive = true
    Promise.all([apiProducts(), apiCategories()])
      .then(([ps, cs]) => {
        if (!alive) return
        // só troca se a API devolveu algo (senão mantém o fallback)
        if (Array.isArray(cs) && cs.length) setCategories(cs.map(adaptCategory))
        if (Array.isArray(ps)) setProducts(ps.map(adaptProduct))
        setSource('api')
      })
      .catch(() => {
        /* API fora do ar: mantém os dados estáticos */
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [])

  const value = useMemo<DataValue>(
    () => ({
      products,
      categories,
      loading,
      source,
      getProductById: (id) => products.find((p) => p.id === id),
      searchProducts: (query) => {
        const q = query.trim().toLowerCase()
        if (!q) return []
        return products.filter(
          (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
        )
      },
      productCategories: Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
    }),
    [products, categories, loading, source],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useData(): DataValue {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData deve ser usado dentro de <DataProvider>')
  return ctx
}
