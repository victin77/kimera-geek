import { motion } from 'framer-motion'
import { Home, Package, Zap, Star } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { WhatsAppFab } from '../components/WhatsAppFab'
import { useRouter } from '../router'

/** Página 404 — qualquer rota inexistente cai aqui. Estilo pop-art/comic. */
export function NotFound() {
  const { navigate } = useRouter()

  return (
    <div className="flex min-h-screen flex-col bg-kimera-cream">
      <Header />

      <main className="relative flex flex-1 items-center overflow-hidden bg-kimera-orange pt-24 lg:pt-28">
        {/* textura halftone + brilho */}
        <div className="pointer-events-none absolute inset-0 bg-halftone bg-dots opacity-60" />
        <div className="pointer-events-none absolute -left-32 -top-20 h-96 w-96 rounded-full bg-kimera-yellow/50 blur-3xl" />

        <div className="section-container relative grid items-center gap-8 py-12 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-2 lg:py-16">
          {/* Texto (título + descrição).
              No mobile: texto → Gojo → botões (ordem do código).
              No desktop: texto em cima à esquerda, botões logo abaixo, Gojo à direita. */}
          <div className="relative z-10 text-center lg:col-start-1 lg:row-start-1 lg:self-end lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="comic-tag bg-kimera-ink text-kimera-yellow"
            >
              <Zap size={14} className="fill-kimera-yellow" />
              Erro 404
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="heading-comic mt-5 text-5xl text-kimera-cream text-stroke-ink sm:text-6xl lg:text-7xl"
            >
              Ops! Você caiu em{' '}
              <span className="text-kimera-yellow">outra</span>{' '}
              <span className="text-kimera-purple">dimensão</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mx-auto mt-5 max-w-md text-lg font-semibold text-kimera-ink/90 lg:mx-0"
            >
              A página que você procura desapareceu do nosso universo geek. Mas sua
              próxima aventura ainda está esperando por você!
            </motion.p>
          </div>

          {/* Gojo sobre hexágono — no desktop ocupa a coluna direita (2 linhas) */}
          <div className="relative z-10 mx-auto h-[420px] w-full max-w-md sm:h-[520px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[640px]">
            {/* hexágono de fundo */}
            <svg
              viewBox="0 0 200 200"
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[6px_8px_0_rgba(17,17,17,0.25)] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]"
            >
              <defs>
                <pattern id="hex404Dots" width="12" height="12" patternUnits="userSpaceOnUse">
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
              <polygon points="50,6 150,6 196,100 150,194 50,194 4,100" fill="url(#hex404Dots)" />
            </svg>

            {/* Gojo (PNG transparente) — centralizado no hexágono.
                Centralização fica no container (grid), e o animate-float só na
                imagem, pra não conflitarem na mesma propriedade `transform`. */}
            <div className="absolute inset-0 z-20 grid place-items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
              >
                <img
                  src="/gojo-404.webp"
                  alt="Personagem geek confuso procurando a página"
                  className="h-[360px] w-auto animate-float drop-shadow-[6px_10px_0_rgba(17,17,17,0.18)] sm:h-[470px] lg:h-[580px]"
                />
              </motion.div>
            </div>

            {/* balão de interrogação */}
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: -6 }}
              transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.6 }}
              className="absolute right-2 top-4 z-30 grid h-16 w-16 place-items-center rounded-full border-[3px] border-kimera-ink bg-kimera-cream shadow-comic-lg sm:h-20 sm:w-20"
            >
              <span className="font-display text-4xl text-kimera-orange sm:text-5xl">?</span>
            </motion.div>

            {/* estrelinhas comic */}
            <Star
              className="absolute left-2 top-10 z-30 animate-wiggle text-kimera-yellow drop-shadow-[2px_2px_0_#111]"
              size={34}
              fill="#FACC15"
              strokeWidth={2}
            />
            <Star
              className="absolute bottom-8 left-6 z-30 animate-float text-kimera-yellow drop-shadow-[2px_2px_0_#111]"
              size={26}
              fill="#FACC15"
              strokeWidth={2}
            />
          </div>

          {/* Botões + nota — no mobile ficam abaixo do Gojo; no desktop voltam
              pra coluna esquerda, logo abaixo do texto */}
          <div className="relative z-10 text-center lg:col-start-1 lg:row-start-2 lg:self-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:items-start lg:justify-start"
            >
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn-comic w-full bg-kimera-yellow text-kimera-ink sm:w-auto"
              >
                <Home size={18} />
                Voltar ao início
              </button>
              <button
                type="button"
                onClick={() => navigate('/catalogo')}
                className="btn-comic w-full bg-kimera-cream text-kimera-ink sm:w-auto"
              >
                <Package size={18} />
                Explorar produtos
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-kimera-ink/80"
            >
              <Star size={18} className="fill-kimera-purple text-kimera-ink" strokeWidth={1.5} />
              Nenhum colecionável foi perdido durante essa missão.
            </motion.p>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  )
}
