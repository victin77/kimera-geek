import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  /** alinhamento do bloco */
  align?: 'left' | 'center'
  /** cor do título */
  tone?: 'ink' | 'cream'
}

/** Cabeçalho de seção padronizado, estilo HQ, com animação de entrada. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'ink',
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      {eyebrow && (
        <span
          className={`comic-tag mb-4 ${
            tone === 'cream' ? 'bg-kimera-yellow text-kimera-ink' : 'bg-kimera-purple text-white'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`heading-comic text-4xl sm:text-5xl lg:text-6xl ${
          tone === 'cream' ? 'text-kimera-cream' : 'text-kimera-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg font-medium ${
            tone === 'cream' ? 'text-kimera-cream/80' : 'text-kimera-ink/70'
          } ${isCenter ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
