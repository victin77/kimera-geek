import { motion } from 'framer-motion'
import { Instagram, Heart, Sparkles } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { ProductArt } from './ProductArt'
import { STORE } from '../lib/constants'
import type { ArtKind } from '../data/types'

// posts fictícios do feed
const posts: { art: ArtKind; accent: string; tag: string }[] = [
  { art: 'figure', accent: '#F97316', tag: 'Chegou!' },
  { art: 'manga', accent: '#7C3AED', tag: 'Box novo' },
  { art: 'mug', accent: '#FACC15', tag: 'Presente' },
  { art: 'plush', accent: '#EF4444', tag: 'Fofura' },
  { art: 'lamp', accent: '#111111', tag: 'Setup' },
  { art: 'keychain', accent: '#F97316', tag: 'Detalhe' },
]

export function InstagramSection() {
  return (
    <section className="bg-kimera-ink py-16 lg:py-24">
      <div className="section-container">
        <SectionHeading
          tone="cream"
          eyebrow="Comunidade"
          title={
            <>
              Acompanhe a <span className="text-kimera-orange">Kimera Geek</span>
            </>
          }
          subtitle="Novidades, lançamentos e produtos incríveis chegando primeiro no nosso Instagram."
        />

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {posts.map((p, i) => (
            <motion.a
              key={i}
              href={STORE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.96 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border-[3px] border-kimera-ink bg-white shadow-comic"
              style={{ backgroundColor: `${p.accent}22` }}
            >
              <ProductArt kind={p.art} accent={p.accent} className="h-full w-full transition-transform duration-300 group-hover:scale-105" />
              <span className="comic-tag absolute left-2 top-2 bg-kimera-cream text-kimera-ink">
                {p.tag}
              </span>
              <div className="absolute inset-0 grid place-items-center bg-kimera-ink/0 opacity-0 transition-all duration-300 group-hover:bg-kimera-ink/50 group-hover:opacity-100">
                <Heart size={32} className="fill-white text-white" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 text-center"
        >
          <a
            href={STORE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-comic bg-kimera-orange text-kimera-ink"
          >
            <Instagram size={18} />
            Seguir no Instagram
          </a>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-kimera-cream/70">
            <Sparkles size={16} className="text-kimera-yellow" />
            Um espaço geek acolhedor, criativo e feito para todo mundo.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
