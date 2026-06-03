import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronLeft, ChevronRight, ArrowLeft, PackageSearch, X } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { WhatsAppFab } from '../components/WhatsAppFab'
import { ProductCard } from '../components/ProductCard'
import { ProductCardSkeleton } from '../components/ProductCardSkeleton'
import { useRouter } from '../router'
import { useData } from '../context/DataContext'

const PAGE_SIZE = 8

interface PriceRange {
  key: string
  label: string
  test: (price: number) => boolean
}

const priceRanges: PriceRange[] = [
  { key: 'all', label: 'Todos os preços', test: () => true },
  { key: 'lt50', label: 'Até R$ 50', test: (p) => p <= 50 },
  { key: '50-100', label: 'R$ 50 – 100', test: (p) => p > 50 && p <= 100 },
  { key: '100-200', label: 'R$ 100 – 200', test: (p) => p > 100 && p <= 200 },
  { key: 'gt200', label: 'Acima de R$ 200', test: (p) => p > 200 },
]

export function Catalog() {
  const { navigate } = useRouter()
  const { products, productCategories, loading } = useData()

  // categoria inicial vinda da URL (?cat=...) — ex.: cards de categoria da home
  const initialCategory = (() => {
    const raw = new URLSearchParams(window.location.search).get('cat')
    if (!raw) return 'Todas'
    if (raw === 'Promoções' || productCategories.includes(raw)) return raw
    return 'Todas'
  })()

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(initialCategory)
  const [priceKey, setPriceKey] = useState('all')
  const [page, setPage] = useState(1)

  const priceTest = priceRanges.find((r) => r.key === priceKey)!.test

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      const matchQuery =
        !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      const matchCategory =
        category === 'Todas' ||
        (category === 'Promoções'
          ? p.oldPrice != null || p.badge === 'PROMO'
          : p.category === category)
      const matchPrice = priceTest(p.price)
      return matchQuery && matchCategory && matchPrice
    })
  }, [query, category, priceTest])

  // volta pra página 1 sempre que os filtros mudam
  useEffect(() => {
    setPage(1)
  }, [query, category, priceKey])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const hasFilters = query.trim() || category !== 'Todas' || priceKey !== 'all'
  const clearFilters = () => {
    setQuery('')
    setCategory('Todas')
    setPriceKey('all')
  }

  return (
    <div className="min-h-screen bg-kimera-cream">
      <Header />

      {/* faixa do topo */}
      <section className="relative overflow-hidden bg-kimera-orange pt-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-halftone bg-dots opacity-50" />
        <div className="section-container relative py-10">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-comic mb-5 bg-kimera-cream px-4 py-2 text-sm text-kimera-ink"
          >
            <ArrowLeft size={16} />
            Voltar pra Home
          </button>
          <h1 className="heading-comic text-4xl text-kimera-cream text-stroke-ink sm:text-5xl lg:text-6xl">
            Catálogo completo
          </h1>
          <p className="mt-3 max-w-lg font-semibold text-kimera-ink/90">
            Explore tudo da Kimera Geek. Filtre por categoria, preço e ache o que combina com você.
          </p>
        </div>
        <div className="relative">
          <svg className="block w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden>
            <path
              d="M0 60 L0 20 L120 38 L240 14 L360 40 L480 16 L600 42 L720 18 L840 40 L960 14 L1080 40 L1200 16 L1320 38 L1440 18 L1440 60 Z"
              fill="#FFFDF7"
            />
          </svg>
        </div>
      </section>

      <main className="section-container py-10 lg:py-14">
        {/* controles */}
        <div className="flex flex-col gap-5 rounded-2xl border-[3px] border-kimera-ink bg-white p-5 shadow-comic">
          {/* busca */}
          <div className="flex items-center gap-2 rounded-xl border-[3px] border-kimera-ink bg-kimera-cream px-3 py-2 focus-within:shadow-comic-sm">
            <Search size={18} className="shrink-0 text-kimera-ink/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar no catálogo…"
              aria-label="Buscar no catálogo"
              className="w-full bg-transparent font-semibold text-kimera-ink outline-none placeholder:text-kimera-ink/40"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Limpar busca" className="text-kimera-ink/50 hover:text-kimera-ink">
                <X size={16} />
              </button>
            )}
          </div>

          {/* categorias */}
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-kimera-ink/50">
              Categoria
            </p>
            <div className="flex flex-wrap gap-2">
              <Chip active={category === 'Todas'} onClick={() => setCategory('Todas')}>
                Todas
              </Chip>
              {productCategories.map((c) => (
                <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                  {c}
                </Chip>
              ))}
              <Chip active={category === 'Promoções'} onClick={() => setCategory('Promoções')}>
                Promoções
              </Chip>
            </div>
          </div>

          {/* faixa de preço */}
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-kimera-ink/50">
              Faixa de preço
            </p>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((r) => (
                <Chip key={r.key} active={priceKey === r.key} onClick={() => setPriceKey(r.key)}>
                  {r.label}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        {/* contagem + limpar */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-kimera-ink/70">
            {loading ? (
              'Carregando produtos…'
            ) : (
              <>
                {filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado
                {filtered.length !== 1 ? 's' : ''}
              </>
            )}
          </p>
          {!loading && hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-sm font-bold text-kimera-purple hover:underline"
            >
              <X size={15} />
              Limpar filtros
            </button>
          )}
        </div>

        {/* grade */}
        {loading ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : pageItems.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border-[3px] border-dashed border-kimera-ink/40 bg-white/60 py-16 text-center">
            <PackageSearch size={40} className="text-kimera-ink/40" />
            <p className="font-extrabold text-kimera-ink">Nada encontrado com esses filtros</p>
            <button type="button" onClick={clearFilters} className="btn-comic bg-kimera-yellow text-sm text-kimera-ink">
              Limpar filtros
            </button>
          </div>
        ) : (
          <motion.div
            key={`${category}-${priceKey}-${query}-${currentPage}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
          >
            {pageItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </motion.div>
        )}

        {/* paginação */}
        {pageCount > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <PageBtn
              label="Anterior"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={18} />
            </PageBtn>

            {Array.from({ length: pageCount }).map((_, i) => {
              const n = i + 1
              const active = n === currentPage
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  aria-current={active}
                  className={`grid h-10 w-10 place-items-center rounded-lg border-[3px] border-kimera-ink font-extrabold shadow-comic-sm transition-all ${
                    active
                      ? 'bg-kimera-orange text-kimera-ink'
                      : 'bg-white text-kimera-ink hover:-translate-y-0.5'
                  }`}
                >
                  {n}
                </button>
              )
            })}

            <PageBtn
              label="Próxima"
              disabled={currentPage === pageCount}
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            >
              <ChevronRight size={18} />
            </PageBtn>
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  )
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-2 border-kimera-ink px-3.5 py-1.5 text-sm font-bold transition-all ${
        active
          ? 'bg-kimera-ink text-kimera-cream shadow-comic-sm'
          : 'bg-kimera-cream text-kimera-ink hover:bg-kimera-yellow/50'
      }`}
    >
      {children}
    </button>
  )
}

function PageBtn({
  children,
  label,
  disabled,
  onClick,
}: {
  children: React.ReactNode
  label: string
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-lg border-[3px] border-kimera-ink bg-white text-kimera-ink shadow-comic-sm transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
    >
      {children}
    </button>
  )
}
