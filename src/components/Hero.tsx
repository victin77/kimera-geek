import { motion } from 'framer-motion'
import { ArrowRight, Star, Zap } from 'lucide-react'
import { STORE } from '../lib/constants'
import { FigureCarousel } from './FigureCarousel'
import { WhatsAppButton } from './WhatsAppButton'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-kimera-orange pt-24 lg:pt-28"
    >
      {/* textura halftone */}
      <div className="pointer-events-none absolute inset-0 bg-halftone bg-dots opacity-60" />
      {/* brilho radial */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-kimera-yellow/50 blur-3xl" />

      <div className="section-container relative grid items-center gap-4 pb-0 pt-8 sm:gap-8 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-2">
        {/* Texto — no mobile fica em cima; no desktop, coluna esquerda (linha de cima) */}
        <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:self-end">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="comic-tag bg-kimera-ink text-kimera-yellow"
          >
            <Zap size={14} className="fill-kimera-yellow" />
            Loja geek em Rondonópolis
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="heading-comic mt-5 text-5xl text-kimera-cream text-stroke-ink sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Seu universo geek <span className="text-kimera-yellow">começa aqui!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 max-w-md text-lg font-semibold text-kimera-ink/90"
          >
            Colecionáveis, presentes criativos e produtos únicos para quem vive a
            cultura pop.
          </motion.p>
        </div>

        {/* Figuras (animes) — no mobile sobem pra cima dos botões;
            no desktop ocupam a coluna direita (as 2 linhas) */}
        <div className="relative z-10 mx-auto h-[440px] w-full max-w-xl sm:h-[560px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[740px]">
          {/* hexágono de fundo */}
          <svg
            viewBox="0 0 200 200"
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[6px_8px_0_rgba(17,17,17,0.25)] sm:h-[470px] sm:w-[470px] lg:h-[560px] lg:w-[560px]"
          >
            <defs>
              <pattern id="hexDots" width="12" height="12" patternUnits="userSpaceOnUse">
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
            <polygon points="50,6 150,6 196,100 150,194 50,194 4,100" fill="url(#hexDots)" />
          </svg>

          {/* carrossel de figuras (Fade + Scale) — ancorado na base do laranja */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="absolute inset-x-0 bottom-0 z-20 mx-auto flex w-fit justify-center"
          >
            <FigureCarousel
              anim="fadeScale"
              interval={4000}
              hexagon={false}
              className="h-[440px] w-[340px] sm:h-[560px] sm:w-[420px] lg:h-[680px] lg:w-[540px]"
            />
          </motion.div>

          {/* balão "itens geek" */}
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: -8 }}
            transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.6 }}
            className="absolute bottom-2 right-2 z-30 rounded-2xl border-[3px] border-kimera-ink bg-kimera-cream px-4 py-2 text-center shadow-comic-lg"
          >
            <p className="font-display text-2xl text-kimera-orange leading-none">+1000</p>
            <p className="text-xs font-bold uppercase text-kimera-ink">itens geek</p>
          </motion.div>
        </div>

        {/* Botões + prova social — no mobile descem pra baixo das figuras;
            no desktop voltam pra coluna esquerda, abaixo do texto */}
        <div className="relative z-10 lg:col-start-1 lg:row-start-2 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <a href="#produtos" className="btn-comic bg-kimera-ink text-kimera-cream">
              Explorar produtos
              <ArrowRight size={18} />
            </a>
            <WhatsAppButton className="bg-kimera-cream text-kimera-ink" />
          </motion.div>

          {/* prova social rápida */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border-[3px] border-kimera-ink bg-kimera-cream px-4 py-2.5 shadow-comic sm:inline-flex sm:w-auto sm:justify-start"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-kimera-yellow text-kimera-ink" strokeWidth={1.5} />
              ))}
            </div>
            <p className="text-sm font-bold text-kimera-ink">
              {STORE.rating} no Google · <span className="text-kimera-ink/60">+170 avaliações</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* divisão inferior estilo HQ */}
      <div className="relative">
        <svg
          className="block w-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 60 L0 20 L120 38 L240 14 L360 40 L480 16 L600 42 L720 18 L840 40 L960 14 L1080 40 L1200 16 L1320 38 L1440 18 L1440 60 Z"
            fill="#FFFDF7"
          />
        </svg>
      </div>
    </section>
  )
}
