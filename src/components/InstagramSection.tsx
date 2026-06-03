import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Sparkles } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { STORE } from '../lib/constants'

// Fotos reais do Instagram (em public/instagram/)
const IMAGES = [
  '/instagram/chegou.jpg',
  '/instagram/boxnovo.jpg',
  '/instagram/presente.jpg',
  '/instagram/fofo.jpg',
  '/instagram/setup.jpg',
  '/instagram/detalhe.jpg',
]

/** Anel 3D giratório: as fotos ficam num cilindro que gira sozinho, parando em cada uma. */
function Ring3D({ images }: { images: string[] }) {
  const [angle, setAngle] = useState(0)
  const [big, setBig] = useState(false)

  // tamanho/raio responsivos (sm+ = maior)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const update = () => setBig(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // gira sozinho, snapando em cada foto
  useEffect(() => {
    const step = 360 / images.length
    const t = setInterval(() => setAngle((a) => a - step), 2400)
    return () => clearInterval(t)
  }, [images.length])

  const step = 360 / images.length
  const size = big ? 300 : 196
  const radius = big ? 360 : 235

  return (
    <div className="relative h-80 [perspective:2000px] sm:h-[26rem]">
      <div
        className="absolute left-1/2 top-1/2 [transform-style:preserve-3d] transition-transform duration-1000 ease-out"
        style={{
          width: size,
          height: size,
          transform: `translate(-50%, -50%) rotateY(${angle}deg)`,
        }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Kimera Geek no Instagram ${i + 1}`}
            loading="lazy"
            className="absolute inset-0 rounded-2xl border-[3px] border-kimera-ink object-cover shadow-comic [backface-visibility:hidden]"
            style={{
              width: size,
              height: size,
              transform: `rotateY(${step * i}deg) translateZ(${radius}px)`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function InstagramSection() {
  return (
    <section className="overflow-hidden bg-kimera-ink py-16 lg:py-24">
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

        <div className="mt-8 sm:mt-12">
          <Ring3D images={IMAGES} />
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
