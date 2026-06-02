import type { ArtKind } from '../data/types'

interface ProductArtProps {
  kind: ArtKind
  accent: string
  className?: string
}

/**
 * Ilustrações SVG originais, em estilo pop-art, para representar os produtos
 * sem usar imagens de personagens/marcas protegidas. Cada arte recebe uma
 * cor de destaque (accent) vinda do produto.
 */
export function ProductArt({ kind, accent, className }: ProductArtProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* fundo halftone sutil */}
      <defs>
        <pattern id={`dots-${kind}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="rgba(17,17,17,0.10)" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#dots-${kind})`} />
      {renderArt(kind, accent)}
    </svg>
  )
}

const ink = '#111111'
const stroke = { stroke: ink, strokeWidth: 4, strokeLinejoin: 'round' as const }

function renderArt(kind: ArtKind, accent: string) {
  switch (kind) {
    case 'figure':
      return (
        <g {...stroke}>
          {/* base */}
          <ellipse cx="100" cy="170" rx="46" ry="10" fill={ink} stroke="none" opacity="0.25" />
          {/* corpo */}
          <path d="M100 48 c-18 0 -28 14 -28 30 l-6 50 c-1 10 6 18 16 18 h36 c10 0 17-8 16-18 l-6-50 c0-16-10-30-28-30Z" fill={accent} />
          {/* cabeça */}
          <circle cx="100" cy="44" r="20" fill="#FACC15" />
          {/* capa */}
          <path d="M128 78 c20 6 26 40 14 70 l-18-6 c8-22 6-44-4-58Z" fill="#7C3AED" />
          {/* braço erguido */}
          <path d="M74 86 l-22-22" strokeLinecap="round" />
          <circle cx="50" cy="62" r="7" fill="#EF4444" />
        </g>
      )
    case 'manga':
      return (
        <g {...stroke}>
          {/* pilha de livros */}
          <rect x="44" y="120" width="112" height="30" rx="4" fill="#7C3AED" />
          <rect x="52" y="92" width="112" height="30" rx="4" fill={accent} />
          <rect x="40" y="64" width="112" height="30" rx="4" fill="#FACC15" />
          {/* lombadas */}
          <line x1="44" y1="135" x2="156" y2="135" />
          <line x1="52" y1="107" x2="164" y2="107" />
          <line x1="40" y1="79" x2="152" y2="79" />
          {/* estrela na capa de cima */}
          <path d="M96 66 l4 9 10 1 -7 7 2 10 -9-5 -9 5 2-10 -7-7 10-1Z" fill="#F97316" strokeWidth="2.5" />
        </g>
      )
    case 'keychain':
      return (
        <g {...stroke}>
          {/* argola */}
          <circle cx="78" cy="58" r="20" fill="none" />
          {/* espada */}
          <path d="M96 80 l40 60" strokeLinecap="round" strokeWidth="9" stroke={accent} />
          <path d="M96 80 l40 60" strokeLinecap="round" />
          <path d="M120 96 l24-14" strokeLinecap="round" strokeWidth="7" />
          {/* corrente */}
          <path d="M88 70 l8 8" strokeLinecap="round" />
        </g>
      )
    case 'mug':
      return (
        <g {...stroke}>
          <rect x="58" y="64" width="74" height="84" rx="10" fill={accent} />
          <path d="M132 84 h16 c10 0 16 8 16 18 s-6 18-16 18 h-16" fill="none" />
          {/* raio na frente */}
          <path d="M98 82 l-12 26 h12 l-6 26 22-34 h-12 l8-18Z" fill="#FACC15" strokeWidth="2.5" />
          {/* vapor */}
          <path d="M80 50 c6-8 -6-14 0-22" fill="none" strokeWidth="3" strokeLinecap="round" />
          <path d="M108 50 c6-8 -6-14 0-22" fill="none" strokeWidth="3" strokeLinecap="round" />
        </g>
      )
    case 'lamp':
      return (
        <g {...stroke}>
          {/* cubo voxel */}
          <path d="M100 46 l44 24 v50 l-44 24 -44-24 v-50Z" fill={accent} />
          <path d="M100 46 l44 24 -44 24 -44-24Z" fill="#FACC15" />
          <path d="M100 94 v50" />
          <path d="M56 70 l44 24 44-24" fill="none" />
          {/* base */}
          <rect x="78" y="150" width="44" height="12" rx="4" fill={ink} />
        </g>
      )
    case 'shirt':
      return (
        <g {...stroke}>
          <path d="M70 56 l-22 16 12 20 16-10 v66 h48 v-66 l16 10 12-20 -22-16 -16 8 a16 12 0 0 1 -32 0Z" fill={accent} />
          {/* estampa raio */}
          <path d="M104 92 l-12 24 h11 l-6 24 22-32 h-11 l8-16Z" fill="#FACC15" strokeWidth="2.5" />
        </g>
      )
    case 'plush':
      return (
        <g {...stroke}>
          {/* corpo */}
          <circle cx="100" cy="112" r="44" fill={accent} />
          {/* orelhas */}
          <path d="M70 78 l-8-24 22 12Z" fill={accent} />
          <path d="M130 78 l8-24 -22 12Z" fill={accent} />
          {/* olhos */}
          <circle cx="86" cy="104" r="6" fill={ink} stroke="none" />
          <circle cx="114" cy="104" r="6" fill={ink} stroke="none" />
          {/* sorriso */}
          <path d="M86 124 q14 14 28 0" fill="none" strokeLinecap="round" />
          {/* bochechas */}
          <circle cx="78" cy="120" r="5" fill="#EF4444" stroke="none" opacity="0.8" />
          <circle cx="122" cy="120" r="5" fill="#EF4444" stroke="none" opacity="0.8" />
        </g>
      )
    case 'game':
    default:
      return (
        <g {...stroke}>
          <rect x="44" y="78" width="112" height="60" rx="26" fill={accent} />
          {/* dpad */}
          <path d="M74 100 v16 M66 108 h16" strokeLinecap="round" strokeWidth="7" />
          {/* botões */}
          <circle cx="126" cy="102" r="6" fill="#FACC15" />
          <circle cx="140" cy="116" r="6" fill="#EF4444" />
        </g>
      )
  }
}
