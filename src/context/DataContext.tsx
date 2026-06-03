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
  // começa vazio: a API é a fonte da verdade. Os dados estáticos só entram
  // como fallback se a API estiver fora do ar — assim os produtos de exemplo
  // nunca "piscam" na tela antes dos reais carregarem.
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<'api' | 'fallback'>('api')

  useEffect(() => {
    let alive = true
    Promise.all([apiProducts(), apiCategories()])
      .then(([ps, cs]) => {
        if (!alive) return
        // API respondeu: ela é a fonte da verdade (mesmo que venha vazia).
        setCategories(Array.isArray(cs) && cs.length ? cs.map(adaptCategory) : staticCategories)
        setProducts(Array.isArray(ps) ? ps.map(adaptProduct) : [])
        setSource('api')
      })
      .catch(() => {
        // API fora do ar: aí sim cai pros dados estáticos pra não ficar vazio.
        if (!alive) return
        setProducts(staticProducts)
        setCategories(staticCategories)
        setSource('fallback')
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
