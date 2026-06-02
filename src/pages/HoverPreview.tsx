import { ArrowLeft, MessageCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { useRouter } from '../router'

const GREEN = '#25D366'

interface HoverItem {
  n: number
  label: string
  desc: string
  /** classes aplicadas na camada verde que entra no hover */
  fillClass: string
  /** estrutura especial (ex.: bolha) em vez da camada inset-0 padrão */
  custom?: ReactNode
  /** texto branqueia mais devagar (pra fills longos, ex.: água) */
  slowText?: boolean
}

const items: HoverItem[] = [
  {
    n: 1,
    label: 'Fade simples',
    desc: 'O verde aparece suavemente por cima.',
    fillClass: 'inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100',
  },
  {
    n: 2,
    label: 'Preenche da esquerda',
    desc: 'O verde cresce da esquerda pra direita.',
    fillClass:
      'inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100',
  },
  {
    n: 3,
    label: 'Preenche de baixo',
    desc: 'O verde sobe de baixo pra cima.',
    fillClass:
      'inset-0 origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100',
  },
  {
    n: 4,
    label: 'Abre do centro',
    desc: 'O verde abre do meio pros lados.',
    fillClass:
      'inset-0 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100',
  },
  {
    n: 5,
    label: 'Bolha do centro',
    desc: 'Um círculo verde expande do meio.',
    fillClass: '',
    custom: (
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 z-0 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-100"
        style={{ backgroundColor: GREEN }}
      />
    ),
  },
  {
    n: 6,
    label: 'Desliza diagonal',
    desc: 'O verde entra deslizando do canto.',
    fillClass:
      'inset-0 -translate-x-full -translate-y-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0',
  },
  {
    n: 7,
    label: 'Enchendo de água 💧',
    desc: 'O verde sobe como água, com a superfície ondulando até encher.',
    fillClass: '',
    slowText: true,
    custom: (
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-0 h-0 transition-[height] duration-700 ease-out group-hover:h-full"
        style={{ backgroundColor: GREEN }}
      >
        {/* superfície ondulada da água */}
        <svg
          className="absolute -top-[7px] left-0 h-3 w-[200%] animate-marquee"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          fill={GREEN}
        >
          <path d="M0 20 Q150 0 300 20 T600 20 T900 20 T1200 20 L1200 40 L0 40 Z" />
        </svg>
      </span>
    ),
  },
]

export function HoverPreview() {
  const { navigate } = useRouter()

  return (
    <div className="min-h-screen bg-kimera-orange">
      <div className="pointer-events-none fixed inset-0 bg-halftone bg-dots opacity-40" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="btn-comic mb-6 bg-kimera-cream text-sm text-kimera-ink"
        >
          <ArrowLeft size={16} />
          Voltar pro site
        </button>

        <div className="rounded-2xl border-[3px] border-kimera-ink bg-kimera-cream p-6 shadow-comic">
          <span className="comic-tag bg-kimera-purple text-white">Prévia de hover</span>
          <h1 className="heading-comic mt-3 text-4xl text-kimera-ink sm:text-5xl">
            Botão "Falar no WhatsApp" — verde no hover
          </h1>
          <p className="mt-3 max-w-2xl font-medium text-kimera-ink/70">
            Passe o mouse em cada botão pra ver a animação de ficar verde. Me diga o
            <strong> número</strong> da que você curtir que eu aplico no botão da home.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.n}
              className="flex flex-col items-center gap-4 rounded-2xl border-[3px] border-kimera-ink bg-kimera-cream p-6 shadow-comic"
            >
              <div className="flex items-center gap-2 self-start">
                <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-kimera-ink bg-kimera-yellow font-display text-base leading-none">
                  {it.n}
                </span>
                <span className="font-extrabold uppercase tracking-wide text-kimera-ink">
                  {it.label}
                </span>
              </div>

              {/* botão de exemplo */}
              <div className="grid w-full place-items-center py-6">
                <button
                  type="button"
                  className="btn-comic group relative overflow-hidden bg-white text-kimera-ink"
                >
                  {it.custom ?? (
                    <span
                      aria-hidden
                      className={`absolute z-0 ${it.fillClass}`}
                      style={{ backgroundColor: GREEN }}
                    />
                  )}
                  <span
                    className={`relative z-10 inline-flex items-center gap-2 transition-colors group-hover:text-white ${
                      it.slowText ? 'duration-700' : 'duration-300'
                    }`}
                  >
                    <MessageCircle size={18} />
                    Falar no WhatsApp
                  </span>
                </button>
              </div>

              <p className="self-start text-sm font-medium text-kimera-ink/65">{it.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm font-semibold text-kimera-ink/80">
          Página só de teste — não faz parte do site final. 😉
        </p>
      </div>
    </div>
  )
}
