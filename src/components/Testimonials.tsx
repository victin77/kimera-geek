import { testimonials } from '../data/testimonials'
import { TestimonialCard } from './TestimonialCard'
import { SectionHeading } from './SectionHeading'

export function Testimonials() {
  // mostra os 4 primeiros em destaque
  const featured = testimonials.slice(0, 4)
  return (
    <section className="relative bg-kimera-cream py-16 lg:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Prova social"
          title={
            <>
              O que nossa <span className="text-kimera-orange">comunidade</span> diz
            </>
          }
          subtitle="Avaliações reais de quem já é da turma Kimera Geek."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
