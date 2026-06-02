import { motion } from 'framer-motion'
import { Gift, Zap, Star } from 'lucide-react'
import { WhatsAppButton } from './WhatsAppButton'

export function PromoBanner() {
  return (
    <section id="novidades" className="bg-kimera-cream py-16 lg:py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border-[3px] border-kimera-ink bg-kimera-ink shadow-comic-lg"
        >
          {/* halftone interno */}
          <div className="pointer-events-none absolute inset-0 bg-halftone-light bg-dots opacity-40" />
          {/* brilhos */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-kimera-orange/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-kimera-purple/40 blur-3xl" />

          <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:p-16">
            <div>
              <span className="comic-tag bg-kimera-yellow text-kimera-ink">
                <Gift size={14} />
                Ideias de presente
              </span>
              <h2 className="heading-comic mt-5 text-4xl text-kimera-cream sm:text-5xl lg:text-6xl">
                Presentes que todo geek <span className="text-kimera-yellow">quer ganhar</span>
              </h2>
              <p className="mt-4 max-w-lg text-lg font-medium text-kimera-cream/75">
                Encontre algo único para surpreender quem ama filmes, animes, games
                e quadrinhos.
              </p>
              <WhatsAppButton
                message="Olá! Quero ideias de presente geek. Pode me ajudar? 🎁"
                className="mt-8 bg-kimera-orange text-kimera-ink"
                icon={<Zap size={18} className="fill-current" />}
                iconPosition="right"
              >
                Ver ideias de presente
              </WhatsAppButton>
            </div>

            {/* composição visual */}
            <div className="relative mx-auto hidden h-56 w-full max-w-xs lg:block">
              <Star className="absolute right-0 top-0 z-10 animate-wiggle text-kimera-yellow" size={28} fill="#FACC15" />
              <motion.div
                style={{ rotate: '-6deg' }}
                className="absolute left-0 top-4 grid h-36 w-36 place-items-center overflow-hidden rounded-2xl border-[3px] border-kimera-ink bg-white shadow-comic animate-float"
              >
                <img
                  src="/promo-senna.webp"
                  alt="Funko Pop do Ayrton Senna"
                  className="h-full w-full object-contain p-1.5"
                />
              </motion.div>
              <motion.div
                style={{ rotate: '8deg' }}
                className="absolute bottom-0 right-2 grid h-36 w-36 place-items-center overflow-hidden rounded-2xl border-[3px] border-kimera-ink bg-white shadow-comic animate-float-slow"
              >
                <img
                  src="/promo-caneca-hogwarts.webp"
                  alt="Caneca caldeirão de Hogwarts (Harry Potter)"
                  className="h-full w-full object-contain p-1.5"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
