// Figuras que aparecem em destaque no hero (carrossel).
// Para adicionar mais, coloque o PNG em public/ e inclua aqui.
export interface HeroFigureItem {
  src: string
  name: string
}

export const heroFigures: HeroFigureItem[] = [
  { src: '/hero-figure.webp', name: 'Figure Guerreiro Saiyajin' },
  { src: '/hero-figure-2.webp', name: 'Figure Atleta de Vôlei' },
  { src: '/hero-figure-3.webp', name: 'Figure Guerreiro na Nuvem' },
]
