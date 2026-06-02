import {
  Swords,
  BookOpen,
  Gift,
  KeyRound,
  Gamepad2,
  Tag,
} from 'lucide-react'
import type { Category } from './types'

// Categorias da loja — base para futura navegação por catálogo.
export const categories: Category[] = [
  {
    id: 'figures',
    title: 'Figures e Colecionáveis',
    description: 'Estátuas, action figures e itens raros pra sua estante.',
    icon: Swords,
    accent: '#F97316',
    art: 'figure',
  },
  {
    id: 'mangas',
    title: 'Mangás e HQs',
    description: 'Boxes, volumes avulsos e quadrinhos pra maratonar.',
    icon: BookOpen,
    accent: '#7C3AED',
    art: 'manga',
  },
  {
    id: 'presentes',
    title: 'Presentes Criativos',
    description: 'Ideias únicas pra surpreender qualquer fã.',
    icon: Gift,
    accent: '#EF4444',
    art: 'mug',
  },
  {
    id: 'acessorios',
    title: 'Chaveiros e Acessórios',
    description: 'Detalhes geek pra levar pra todo lugar.',
    icon: KeyRound,
    accent: '#FACC15',
    art: 'keychain',
  },
  {
    id: 'games',
    title: 'Games',
    description: 'Luminárias, gadgets e itens gamer.',
    icon: Gamepad2,
    accent: '#111111',
    art: 'lamp',
  },
  {
    id: 'promocoes',
    title: 'Promoções',
    description: 'Ofertas e edições com preço especial.',
    icon: Tag,
    accent: '#F97316',
    art: 'shirt',
  },
]
