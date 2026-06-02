import { categories } from '../data/categories'
import { CategoryCard } from './CategoryCard'
import { SectionHeading } from './SectionHeading'

export function Categories() {
  return (
    <section id="categorias" className="relative bg-kimera-cream py-16 lg:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Navegue por aí"
          title={
            <>
              Escolha seu <span className="text-kimera-orange">universo</span>
            </>
          }
          subtitle="Do colecionável raro ao presente perfeito: tem categoria pra cada tipo de fã."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
