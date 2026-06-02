import { ArrowLeft } from 'lucide-react'
import { FigureCarousel } from '../components/FigureCarousel'
import type { FigureAnim } from '../components/FigureCarousel'

interface PreviewItem {
  anim: FigureAnim
  n: number
  label: string
  desc: string
  search: string
}

const items: PreviewItem[] = [
  { anim: 'slideX', n: 1, label: 'Slide lateral', desc: 'Sai por um lado, o próximo entra pelo outro.', search: 'slide transition framer motion' },
  { anim: 'slideY', n: 2, label: 'Slide vertical', desc: 'O atual sobe e some, o próximo surge de baixo.', search: 'vertical slide carousel' },
  { anim: 'fadeScale', n: 3, label: 'Fade + Scale', desc: 'Some encolhendo, aparece crescendo. Bem clean.', search: 'fade scale transition' },
  { anim: 'popBounce', n: 4, label: 'Pop bounce (mola)', desc: 'Salta pra dentro com efeito elástico.', search: 'spring pop in animation' },
  { anim: 'flip3d', n: 5, label: 'Flip 3D', desc: 'Gira como uma carta virando e revela o próximo.', search: 'card flip rotateY 3d' },
  { anim: 'whoosh', n: 6, label: 'Whoosh anime', desc: 'Voa rápido com inclinação, estilo linha de velocidade.', search: 'anime speed lines slide blur' },
  { anim: 'zoomTeleport', n: 7, label: 'Zoom teleporte', desc: 'Dá zoom com blur e some, o próximo foca de longe.', search: 'zoom blur teleport transition' },
  { anim: 'glitch', n: 8, label: 'Glitch', desc: 'Distorção rápida tipo falha de vídeo. Vibe gamer.', search: 'glitch image transition' },
  { anim: 'wipe', n: 9, label: 'Cortina / wipe', desc: 'Uma faixa cruza cobrindo a troca. Editorial/HQ.', search: 'clip-path wipe reveal' },
  { anim: 'spin', n: 10, label: 'Rodopio', desc: 'Entra girando e crescendo, sai girando e encolhendo.', search: 'rotate scale spin in' },
]

export function Preview() {
  return (
    <div className="min-h-screen bg-kimera-orange">
      <div className="pointer-events-none fixed inset-0 bg-halftone bg-dots opacity-40" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* topo */}
        <a
          href="/"
          className="btn-comic mb-6 inline-flex bg-kimera-cream text-sm text-kimera-ink"
        >
          <ArrowLeft size={16} />
          Voltar pro site
        </a>

        <div className="rounded-2xl border-[3px] border-kimera-ink bg-kimera-cream p-6 shadow-comic">
          <span className="comic-tag bg-kimera-purple text-white">Prévia de animações</span>
          <h1 className="heading-comic mt-3 text-4xl text-kimera-ink sm:text-5xl">
            Escolha a transição do hero
          </h1>
          <p className="mt-3 max-w-2xl font-medium text-kimera-ink/70">
            Cada card troca suas 3 figures automaticamente com uma animação
            diferente. Passe o mouse em cima pra ver o efeito de <strong>subir</strong>.
            Quando decidir, me diga o <strong>número/nome</strong> (pode misturar
            entrada de uma com saída de outra) e o <strong>tempo</strong> de cada
            figure na tela.
          </p>
        </div>

        {/* grade de animações */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.anim}
              className="flex flex-col overflow-hidden rounded-2xl border-[3px] border-kimera-ink bg-kimera-cream shadow-comic"
            >
              <div className="flex items-center gap-2 border-b-[3px] border-kimera-ink bg-kimera-yellow px-4 py-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-kimera-ink bg-kimera-cream font-display text-base leading-none">
                  {it.n}
                </span>
                <span className="font-extrabold uppercase tracking-wide text-kimera-ink">
                  {it.label}
                </span>
              </div>

              <div className="relative bg-kimera-orange/15">
                <div className="pointer-events-none absolute inset-0 bg-halftone bg-dots opacity-30" />
                <FigureCarousel anim={it.anim} interval={2600 + it.n * 150} className="relative h-[320px] w-full" />
              </div>

              <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="text-sm font-medium text-kimera-ink/70">{it.desc}</p>
                <code className="mt-auto rounded bg-kimera-ink/10 px-2 py-1 text-xs text-kimera-ink/70">
                  buscar: {it.search}
                </code>
              </div>
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
