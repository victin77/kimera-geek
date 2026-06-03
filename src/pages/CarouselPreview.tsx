import { useEffect, useState } from 'react'

// Fotos reais do Instagram (em public/instagram/)
const IMAGES = [
  '/instagram/chegou.jpg',
  '/instagram/boxnovo.jpg',
  '/instagram/presente.jpg',
  '/instagram/fofo.jpg',
  '/instagram/setup.jpg',
  '/instagram/detalhe.jpg',
]

/** 1 — Coverflow 3D (item central grande, vizinhos girados) */
function Coverflow({ images }: { images: string[] }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % images.length), 2500)
    return () => clearInterval(t)
  }, [images.length])

  return (
    <div className="relative h-72 [perspective:1200px]">
      <div className="relative h-full w-full [transform-style:preserve-3d]">
        {images.map((src, i) => {
          let offset = i - active
          if (offset > images.length / 2) offset -= images.length
          if (offset < -images.length / 2) offset += images.length
          const abs = Math.abs(offset)
          return (
            <img
              key={i}
              src={src}
              alt=""
              className="absolute left-1/2 top-1/2 h-56 w-56 rounded-2xl border-[3px] border-kimera-ink object-cover shadow-comic transition-all duration-700 ease-out"
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * 130}px) translateZ(${-abs * 150}px) rotateY(${offset * -38}deg) scale(${1 - abs * 0.12})`,
                zIndex: 100 - abs,
                opacity: abs > 2 ? 0 : 1,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

/** 2 — Anel 3D giratório (fotos num cilindro que roda sozinho) */
function Ring({ images }: { images: string[] }) {
  const [angle, setAngle] = useState(0)
  useEffect(() => {
    const step = 360 / images.length
    const t = setInterval(() => setAngle((a) => a - step), 2200)
    return () => clearInterval(t)
  }, [images.length])

  const step = 360 / images.length
  return (
    <div className="relative h-72 [perspective:1100px]">
      <div
        className="absolute left-1/2 top-1/2 h-48 w-48 [transform-style:preserve-3d] transition-transform duration-700 ease-out"
        style={{ transform: `translate(-50%, -50%) rotateY(${angle}deg)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="absolute inset-0 h-48 w-48 rounded-2xl border-[3px] border-kimera-ink object-cover shadow-comic [backface-visibility:hidden]"
            style={{ transform: `rotateY(${step * i}deg) translateZ(280px)` }}
          />
        ))}
      </div>
    </div>
  )
}

/** 3 — Esteira infinita inclinada (perspectiva 3D, rola sem parar) */
function MarqueeTilt({ images }: { images: string[] }) {
  const loop = [...images, ...images]
  return (
    <div className="relative h-72 overflow-hidden [perspective:900px]">
      <div className="absolute inset-0 flex items-center justify-center [transform:rotateX(6deg)_rotateY(-14deg)] [transform-style:preserve-3d]">
        <div className="flex animate-marquee gap-4">
          {loop.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="h-48 w-48 shrink-0 rounded-2xl border-[3px] border-kimera-ink object-cover shadow-comic"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/** 4 — Fade com zoom suave (uma foto por vez, troca sozinha) */
function FadeZoom({ images }: { images: string[] }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % images.length), 2800)
    return () => clearInterval(t)
  }, [images.length])

  return (
    <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-2xl border-[3px] border-kimera-ink shadow-comic">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-out ${
            active === i ? 'scale-110 opacity-100' : 'scale-100 opacity-0'
          }`}
        />
      ))}
    </div>
  )
}

const MODELS = [
  { n: 1, name: 'Coverflow 3D', desc: 'Foto central grande, vizinhas giradas em 3D. Troca sozinha.', Comp: Coverflow },
  { n: 2, name: 'Anel giratório 3D', desc: 'Fotos num cilindro que gira sozinho, estilo carrossel de verdade.', Comp: Ring },
  { n: 3, name: 'Esteira inclinada', desc: 'Fileira infinita com perspectiva 3D, rolando sem parar.', Comp: MarqueeTilt },
  { n: 4, name: 'Fade com zoom', desc: 'Uma foto por vez, com transição suave e zoom (estilo slideshow).', Comp: FadeZoom },
]

export function CarouselPreview() {
  return (
    <div className="min-h-screen bg-kimera-ink py-12">
      <div className="section-container">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-kimera-orange">Preview</p>
          <h1 className="font-display text-4xl text-kimera-cream">Modelos de carrossel</h1>
          <p className="mx-auto mt-2 max-w-md text-sm font-semibold text-kimera-cream/60">
            Olhe os modelos rodando com suas fotos do Instagram e me diga o número do que você quer
            (ex.: "quero o modelo 2").
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {MODELS.map(({ n, name, desc, Comp }) => (
            <div key={n} className="overflow-hidden rounded-3xl border-[3px] border-kimera-ink bg-kimera-cream">
              <div className="flex items-center gap-3 border-b-[3px] border-kimera-ink bg-kimera-yellow px-5 py-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg border-2 border-kimera-ink bg-white font-display text-lg text-kimera-ink">
                  {n}
                </span>
                <div>
                  <p className="font-display text-xl leading-none text-kimera-ink">{name}</p>
                  <p className="text-xs font-semibold text-kimera-ink/70">{desc}</p>
                </div>
              </div>
              <div className="p-4">
                <Comp images={IMAGES} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
