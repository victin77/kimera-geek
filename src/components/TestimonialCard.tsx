import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import type { Testimonial } from '../data/types'

export function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial
  index: number
}) {
  const initial = testimonial.author.charAt(0)
  return (
    <motion.figure
      initial={{ opacity: 0, y: 28, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.08 }}
      whileHover={{ y: -6, rotate: -1 }}
      className="relative flex h-full flex-col rounded-2xl border-[3px] border-kimera-ink bg-white p-6 shadow-comic"
    >
      {/* balão de aspas */}
      <span
        aria-hidden
        className="absolute -top-4 left-6 grid h-10 w-10 place-items-center rounded-full border-[3px] border-kimera-ink text-white shadow-comic-sm"
        style={{ backgroundColor: testimonial.accent }}
      >
        <Quote size={18} className="fill-current" />
      </span>

      <div className="mt-3 flex gap-0.5" aria-label="5 de 5 estrelas">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={18} className="fill-kimera-yellow text-kimera-ink" strokeWidth={1.5} />
        ))}
      </div>

      <blockquote className="mt-3 flex-1 text-base font-semibold leading-snug text-kimera-ink">
        “{testimonial.quote}”
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3">
        <span
          className="grid h-10 w-10 place-items-center rounded-full border-2 border-kimera-ink font-display text-lg text-white"
          style={{ backgroundColor: testimonial.accent }}
        >
          {initial}
        </span>
        <div className="leading-tight">
          <p className="text-sm font-extrabold text-kimera-ink">{testimonial.author}</p>
          <p className="text-xs font-medium text-kimera-ink/60">{testimonial.location}</p>
        </div>
      </figcaption>
    </motion.figure>
  )
}
