import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Category } from '../data/types'
import { useRouter } from '../router'

export function CategoryCard({ category, index }: { category: Category; index: number }) {
  const Icon = category.icon
  const { navigate } = useRouter()

  return (
    <motion.button
      type="button"
      onClick={() => navigate(`/catalogo?cat=${encodeURIComponent(category.title)}`)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.96 }}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border-[3px] border-kimera-ink bg-kimera-cream p-5 text-left shadow-comic transition-shadow duration-200 hover:shadow-comic-lg active:shadow-comic-sm"
    >
      {/* respingo pop-art atrás do ícone */}
      <span
        aria-hidden
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 transition-transform duration-300 group-hover:scale-125"
        style={{ backgroundColor: category.accent }}
      />

      <div
        className="grid h-14 w-14 place-items-center rounded-xl border-[3px] border-kimera-ink shadow-comic-sm"
        style={{ backgroundColor: category.accent }}
      >
        <Icon
          size={26}
          className={category.accent === '#FACC15' ? 'text-kimera-ink' : 'text-white'}
          strokeWidth={2.5}
        />
      </div>

      <div className="relative">
        <h3 className="text-lg font-extrabold leading-tight text-kimera-ink">
          {category.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-kimera-ink/65">
          {category.description}
        </p>
      </div>

      <span className="relative mt-auto inline-flex items-center gap-1 text-sm font-bold text-kimera-orange">
        Explorar
        <ArrowUpRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </motion.button>
  )
}
