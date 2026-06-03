import { motion } from 'framer-motion'
import { LayoutGrid } from 'lucide-react'
import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from './ProductCardSkeleton'
import { SectionHeading } from './SectionHeading'
import { useRouter } from '../router'
import { useData } from '../context/DataContext'

export function FeaturedProducts() {
  const { navigate } = useRouter()
  const { products, loading } = useData()
  // prioriza os marcados como destaque; se não houver, mostra os primeiros
  const highlighted = products.filter((p) => p.featured)
  const featured = (highlighted.length ? highlighted : products).slice(0, 8)

  return (
    <section id="produtos" className="relative bg-kimera-yellow py-16 lg:py-24">
      {/* textura halftone discreta */}
      <div className="pointer-events-none absolute inset-0 bg-halftone bg-dots opacity-40" />

      <div className="section-container relative">
        <SectionHeading
          eyebrow="Destaques da semana"
          title={
            <>
              Saindo direto da <span className="text-kimera-purple">prateleira</span>
            </>
          }
          subtitle="Uma seleção do que tá bombando na loja. Veja o catálogo completo pra explorar tudo."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12 text-center"
        >
          <button
            type="button"
            onClick={() => navigate('/catalogo')}
            className="btn-comic bg-kimera-ink text-kimera-cream"
          >
            <LayoutGrid size={18} />
            Ver catálogo completo
          </button>
        </motion.div>
      </div>
    </section>
  )
}
