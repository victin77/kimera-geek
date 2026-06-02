import { motion } from 'framer-motion'
import { Star, Users, Sparkles, MessageCircle, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { STORE } from '../lib/constants'
import { WhatsAppButton } from './WhatsAppButton'

const highlights: { icon: LucideIcon; label: string }[] = [
  { icon: Star, label: '4,9 estrelas no Google' },
  { icon: Users, label: '+170 avaliações' },
  { icon: Sparkles, label: 'Produtos únicos' },
  { icon: MessageCircle, label: 'Atendimento pelo WhatsApp' },
]

export function AboutStore() {
  return (
    <section id="sobre" className="bg-kimera-purple py-16 lg:py-24">
      <div className="section-container grid items-center gap-12 lg:grid-cols-2">
        {/* visual da loja (placeholder ilustrado) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* mini mapa interativo do Google Maps */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-[3px] border-kimera-ink bg-kimera-cream shadow-comic-lg">
            <iframe
              title="Localização da Kimera Geek no mapa"
              src={STORE.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
          </div>

          {/* selo flutuante 4,9 */}
          <motion.div
            style={{ rotate: '-8deg' }}
            className="absolute -right-3 -top-4 z-10 flex items-center gap-2 rounded-2xl border-[3px] border-kimera-ink bg-kimera-yellow px-4 py-2 shadow-comic animate-float"
          >
            <Star size={20} className="fill-kimera-ink text-kimera-ink" />
            <span className="font-display text-2xl leading-none text-kimera-ink">{STORE.rating}</span>
          </motion.div>

          {/* endereço clicável (abre no Google Maps) */}
          <a
            href={STORE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-start gap-2 rounded-xl border-[3px] border-kimera-ink bg-kimera-cream px-4 py-3 shadow-comic transition-transform hover:-translate-y-0.5"
          >
            <MapPin size={20} className="mt-0.5 shrink-0 text-kimera-orange" strokeWidth={2.5} />
            <span className="text-sm font-bold leading-snug text-kimera-ink">
              {STORE.address}
            </span>
          </a>
        </motion.div>

        {/* texto */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="comic-tag bg-kimera-yellow text-kimera-ink">Sobre a loja</span>
          <h2 className="heading-comic mt-5 text-4xl text-kimera-cream sm:text-5xl lg:text-6xl">
            Mais que uma loja. <span className="text-kimera-yellow">Um espaço para fãs.</span>
          </h2>
          <p className="mt-5 text-lg font-medium leading-relaxed text-kimera-cream/85">
            A Kimera Geek nasceu para reunir quem ama cultura pop, colecionáveis e
            presentes fora do comum. Em Rondonópolis, somos reconhecidos pelo
            atendimento próximo, variedade de produtos e por criar um ambiente
            acolhedor para todo mundo.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {highlights.map((h, i) => {
              const Icon = h.icon
              return (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="flex items-center gap-3 rounded-xl border-[3px] border-kimera-ink bg-kimera-cream px-4 py-3 shadow-comic-sm"
                >
                  <Icon size={20} className="shrink-0 text-kimera-orange" strokeWidth={2.5} />
                  <span className="text-sm font-extrabold text-kimera-ink">{h.label}</span>
                </motion.div>
              )
            })}
          </div>

          <WhatsAppButton className="mt-8 bg-kimera-orange text-kimera-ink">
            Falar com a Kimera
          </WhatsAppButton>
        </motion.div>
      </div>
    </section>
  )
}
