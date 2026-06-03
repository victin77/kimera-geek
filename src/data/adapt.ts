// Converte os dados da API para os tipos que o site já usa.
import { Swords, BookOpen, Gift, KeyRound, Gamepad2, Tag } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Product, Category, ProductBadge, ArtKind } from './types'
import type { ApiProduct, ApiCategory, ApiBadge } from '../lib/api'

// selo do banco -> rótulo que o site exibe
const BADGE_MAP: Record<ApiBadge, ProductBadge> = {
  NOVO: 'NOVO',
  MAIS_VENDIDO: 'MAIS VENDIDO',
  EDICAO_ESPECIAL: 'EDIÇÃO ESPECIAL',
  PROMO: 'PROMO',
}

// nome do ícone (string no banco) -> componente Lucide
const ICON_MAP: Record<string, LucideIcon> = {
  Swords,
  BookOpen,
  Gift,
  KeyRound,
  Gamepad2,
  Tag,
}

// arte SVG de fallback por categoria (quando o produto não tem foto)
const ART_BY_SLUG: Record<string, ArtKind> = {
  'figures-e-colecionaveis': 'figure',
  'mangas-e-hqs': 'manga',
  'presentes-criativos': 'mug',
  'chaveiros-e-acessorios': 'keychain',
  games: 'lamp',
}

function artFor(slug?: string): ArtKind {
  return (slug && ART_BY_SLUG[slug]) || 'figure'
}

export function adaptProduct(p: ApiProduct): Product {
  return {
    id: p.slug || p.id,
    name: p.name,
    category: p.category?.name ?? '',
    price: p.price,
    oldPrice: p.oldPrice ?? undefined,
    badge: p.badge ? BADGE_MAP[p.badge] : undefined,
    art: artFor(p.category?.slug),
    accent: p.accent,
    image: p.images?.[0],
    images: p.images ?? [],
    featured: p.featured,
  }
}

export function adaptCategory(c: ApiCategory): Category {
  return {
    id: c.slug || c.id,
    title: c.name,
    description: c.description ?? '',
    icon: (c.icon && ICON_MAP[c.icon]) || Tag,
    accent: c.accent,
    art: artFor(c.slug),
  }
}
