import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Transition, TargetAndTransition, Variants } from 'framer-motion'
import { heroFigures } from '../data/figures'

export type FigureAnim =
  | 'slideX'
  | 'slideY'
  | 'fadeScale'
  | 'popBounce'
  | 'flip3d'
  | 'whoosh'
  | 'zoomTeleport'
  | 'glitch'
  | 'wipe'
  | 'spin'

interface AnimSpec {
  initial: TargetAndTransition
  animate: TargetAndTransition
  exit: TargetAndTransition
  transition?: Transition
}

// Catálogo de animações de entrada/saída.
export const anims: Record<FigureAnim, AnimSpec> = {
  slideX: {
    initial: { x: '55%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-55%', opacity: 0 },
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
  slideY: {
    initial: { y: '60%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-60%', opacity: 0 },
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
  fadeScale: {
    initial: { scale: 0.6, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.6, opacity: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  popBounce: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'spring', stiffness: 260, damping: 14 },
  },
  flip3d: {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
  whoosh: {
    initial: { x: '90%', skewX: -14, opacity: 0 },
    animate: { x: 0, skewX: 0, opacity: 1 },
    exit: { x: '-90%', skewX: 14, opacity: 0 },
    transition: { duration: 0.45, ease: [0.5, 0, 0.2, 1] },
  },
  zoomTeleport: {
    initial: { scale: 1.8, opacity: 0, filter: 'blur(10px)' },
    animate: { scale: 1, opacity: 1, filter: 'blur(0px)' },
    exit: { scale: 0.3, opacity: 0, filter: 'blur(10px)' },
    transition: { duration: 0.55, ease: 'easeInOut' },
  },
  glitch: {
    initial: { opacity: 0, x: -12, skewX: 8 },
    animate: { opacity: 1, x: [12, -8, 5, 0], skewX: [6, -4, 2, 0] },
    exit: { opacity: 0, x: 12, skewX: -8 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  wipe: {
    initial: { clipPath: 'inset(0 100% 0 0)' },
    animate: { clipPath: 'inset(0 0% 0 0)' },
    exit: { clipPath: 'inset(0 0 0 100%)' },
    transition: { duration: 0.55, ease: 'easeInOut' },
  },
  spin: {
    initial: { rotate: -160, scale: 0.4, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1 },
    exit: { rotate: 160, scale: 0.4, opacity: 0 },
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
}

interface Props {
  anim: FigureAnim
  /** tempo (ms) que cada figura fica na tela antes de trocar */
  interval?: number
  className?: string
  /** mostra o hexágono atrás (padrão: true) */
  hexagon?: boolean
}

/**
 * Carrossel de figuras do hero: troca automática com a animação escolhida,
 * todas encaixadas na mesma moldura (mesmo tamanho), com efeito de subir no hover.
 */
export function FigureCarousel({
  anim,
  interval = 3000,
  className = '',
  hexagon = true,
}: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % heroFigures.length),
      interval,
    )
    return () => clearInterval(id)
  }, [interval])

  const spec = anims[anim]
  const fig = heroFigures[index]
  const variants: Variants = {
    enter: spec.initial,
    center: spec.animate,
    exit: spec.exit,
  }

  return (
    <div
      className={`relative grid place-items-center ${className}`}
      style={anim === 'flip3d' ? { perspective: 1000 } : undefined}
    >
      {hexagon && (
        <svg
          viewBox="0 0 200 200"
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[5px_7px_0_rgba(17,17,17,0.22)]"
        >
          <defs>
            <pattern id={`pv-${anim}`} width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.4" fill="rgba(17,17,17,0.16)" />
            </pattern>
          </defs>
          <polygon
            points="50,6 150,6 196,100 150,194 50,194 4,100"
            fill="#FACC15"
            stroke="#111111"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <polygon points="50,6 150,6 196,100 150,194 50,194 4,100" fill={`url(#pv-${anim})`} />
        </svg>
      )}

      {/* figura (sobe no hover) */}
      <motion.div
        whileHover={{ y: -16 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="relative z-10 h-full w-full"
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={fig.src}
            alt={fig.name}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={spec.transition}
            className="absolute inset-0 m-auto h-full w-full object-contain object-bottom drop-shadow-[6px_10px_0_rgba(17,17,17,0.15)]"
          />
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
