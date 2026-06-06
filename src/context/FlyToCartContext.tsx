import { createContext, useCallback, useContext, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

type Target = 'cart' | 'fav'

interface Flight {
  id: number
  to: Target
  from: { x: number; y: number }
  dest: { x: number; y: number }
  image?: string
  accent: string
}

interface FlyToCartValue {
  /** O ícone do carrinho/favoritos se registra como destino da animação. */
  registerTarget: (kind: Target, el: HTMLElement | null) => void
  /** Dispara um "clone" voando do produto até o destino escolhido. */
  flyTo: (kind: Target, origin: DOMRect, opts?: { image?: string; accent?: string }) => void
}

const Ctx = createContext<FlyToCartValue | null>(null)

// metade do tamanho do clone (h-20 w-20 = 80px) — pra centralizar no ponto
const HALF = 40

export function FlyToCartProvider({ children }: { children: ReactNode }) {
  const targets = useRef<Record<Target, HTMLElement | null>>({ cart: null, fav: null })
  const idRef = useRef(0)
  const [flights, setFlights] = useState<Flight[]>([])

  const registerTarget = useCallback((kind: Target, el: HTMLElement | null) => {
    targets.current[kind] = el
  }, [])

  const flyTo = useCallback(
    (kind: Target, origin: DOMRect, opts?: { image?: string; accent?: string }) => {
      const target = targets.current[kind]
      if (!target) return

      // respeita quem prefere menos movimento: só pulsa o ícone
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        bump(target)
        return
      }

      const t = target.getBoundingClientRect()
      const id = ++idRef.current
      setFlights((f) => [
        ...f,
        {
          id,
          to: kind,
          from: { x: origin.left + origin.width / 2, y: origin.top + origin.height / 2 },
          dest: { x: t.left + t.width / 2, y: t.top + t.height / 2 },
          image: opts?.image,
          accent: opts?.accent ?? '#FFC93C',
        },
      ])
    },
    [],
  )

  const handleDone = useCallback((fl: Flight) => {
    setFlights((f) => f.filter((x) => x.id !== fl.id))
    const target = targets.current[fl.to]
    if (target) bump(target)
  }, [])

  return (
    <Ctx.Provider value={{ registerTarget, flyTo }}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
          <AnimatePresence>
            {flights.map((fl) => {
              const dx = fl.dest.x - fl.from.x
              const midX = fl.from.x + dx * 0.5
              // arco suave e proporcional à distância (sobe um pouco e desce)
              const arc = Math.min(150, 70 + Math.abs(dx) * 0.16)
              const isFav = fl.to === 'fav'
              return (
                <motion.div
                  key={fl.id}
                  initial={{
                    x: fl.from.x - HALF,
                    y: fl.from.y - HALF,
                    scale: 0.85,
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={{
                    x: [fl.from.x - HALF, midX - HALF, fl.dest.x - HALF],
                    y: [fl.from.y - HALF, fl.from.y - HALF - arc, fl.dest.y - HALF],
                    scale: [1, 0.78, 0.22],
                    opacity: [1, 1, 0],
                    rotate: isFav ? [0, -3, 4] : [0, -4, 6],
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.33, 0, 0.2, 1],
                    times: [0, 0.5, 1],
                  }}
                  onAnimationComplete={() => handleDone(fl)}
                  className="absolute left-0 top-0 grid h-20 w-20 place-items-center overflow-hidden rounded-2xl border-[3px] border-kimera-ink shadow-comic"
                  style={{ backgroundColor: `${fl.accent}33` }}
                >
                  {fl.image ? (
                    <img src={fl.image} alt="" className="h-full w-full object-cover" />
                  ) : isFav ? (
                    <span className="text-3xl">❤️</span>
                  ) : null}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>,
        document.body,
      )}
    </Ctx.Provider>
  )
}

/** Pulso suave no ícone de destino quando o item "cai" nele. */
function bump(el: HTMLElement) {
  el.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.22)' },
      { transform: 'scale(0.96)' },
      { transform: 'scale(1)' },
    ],
    { duration: 450, easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)' },
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFlyToCart(): FlyToCartValue {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useFlyToCart deve ser usado dentro de <FlyToCartProvider>')
  return ctx
}
