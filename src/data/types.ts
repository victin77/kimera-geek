import type { LucideIcon } from 'lucide-react'

/** Tipos de arte/ilustração SVG usados nos cards (evita imagens protegidas). */
export type ArtKind =
  | 'figure'
  | 'manga'
  | 'keychain'
  | 'mug'
  | 'lamp'
  | 'shirt'
  | 'plush'
  | 'game'

export type ProductBadge = 'NOVO' | 'MAIS VENDIDO' | 'EDIÇÃO ESPECIAL' | 'PROMO'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  oldPrice?: number
  badge?: ProductBadge
  art: ArtKind
  /** cor de destaque (hex) usada na ilustração e no card */
  accent: string
}

export interface Category {
  id: string
  title: string
  description: string
  icon: LucideIcon
  accent: string
  art: ArtKind
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  location: string
  accent: string
}
