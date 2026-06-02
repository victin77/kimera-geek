import type { Product } from './types'

// Produtos fictícios — substituíveis por API/banco posteriormente.
// Nada de marcas/personagens protegidos: nomes e artes são genéricos.
export const products: Product[] = [
  // ===== Figures e Colecionáveis =====
  { id: 'figure-saiyajin', name: 'Figure Guerreiro Saiyajin', category: 'Figures e Colecionáveis', price: 189.9, oldPrice: 229.9, badge: 'EDIÇÃO ESPECIAL', art: 'figure', accent: '#F97316' },
  { id: 'figure-feiticeiro', name: 'Figure Feiticeiro Colecionável', category: 'Figures e Colecionáveis', price: 209.9, badge: 'EDIÇÃO ESPECIAL', art: 'figure', accent: '#7C3AED' },
  { id: 'figure-cavaleiro-dourado', name: 'Figure Cavaleiro Dourado', category: 'Figures e Colecionáveis', price: 259.9, art: 'figure', accent: '#FACC15' },
  { id: 'figure-ninja-sombras', name: 'Figure Ninja das Sombras', category: 'Figures e Colecionáveis', price: 179.9, badge: 'NOVO', art: 'figure', accent: '#111111' },
  { id: 'figure-robo-batalha', name: 'Figure Robô de Batalha', category: 'Figures e Colecionáveis', price: 299.9, badge: 'EDIÇÃO ESPECIAL', art: 'figure', accent: '#EF4444' },
  { id: 'figure-piloto-estelar', name: 'Figure Piloto Estelar', category: 'Figures e Colecionáveis', price: 219.9, art: 'figure', accent: '#7C3AED' },
  { id: 'figure-cacadora', name: 'Figure Caçadora de Demônios', category: 'Figures e Colecionáveis', price: 189.9, badge: 'MAIS VENDIDO', art: 'figure', accent: '#EF4444' },
  { id: 'figure-mago-anciao', name: 'Figure Mago Ancião', category: 'Figures e Colecionáveis', price: 169.9, art: 'figure', accent: '#F97316' },

  // ===== Mangás e HQs =====
  { id: 'box-manga-aventura', name: 'Box Mangá Aventura Vol. 1', category: 'Mangás e HQs', price: 149.9, badge: 'MAIS VENDIDO', art: 'manga', accent: '#7C3AED' },
  { id: 'box-manga-acao-2', name: 'Box Mangá Ação Vol. 2', category: 'Mangás e HQs', price: 159.9, art: 'manga', accent: '#F97316' },
  { id: 'hq-herois-cidade', name: 'HQ Heróis da Cidade', category: 'Mangás e HQs', price: 39.9, badge: 'NOVO', art: 'manga', accent: '#EF4444' },
  { id: 'manga-romance-escolar', name: 'Mangá Romance Escolar', category: 'Mangás e HQs', price: 24.9, art: 'manga', accent: '#FACC15' },
  { id: 'box-manga-fantasia', name: 'Box Mangá Fantasia Completo', category: 'Mangás e HQs', price: 349.9, badge: 'EDIÇÃO ESPECIAL', art: 'manga', accent: '#7C3AED' },
  { id: 'hq-viloes-renegados', name: 'HQ Vilões Renegados', category: 'Mangás e HQs', price: 44.9, art: 'manga', accent: '#111111' },

  // ===== Presentes Criativos =====
  { id: 'caneca-heroi-noturno', name: 'Caneca Herói Noturno', category: 'Presentes Criativos', price: 49.9, art: 'mug', accent: '#111111' },
  { id: 'caneca-programador', name: 'Caneca Café do Programador', category: 'Presentes Criativos', price: 44.9, art: 'mug', accent: '#F97316' },
  { id: 'caneca-magica', name: 'Caneca Mágica Termossensível', category: 'Presentes Criativos', price: 59.9, badge: 'MAIS VENDIDO', art: 'mug', accent: '#7C3AED' },
  { id: 'camiseta-universo-geek', name: 'Camiseta Universo Geek', category: 'Presentes Criativos', price: 79.9, badge: 'NOVO', art: 'shirt', accent: '#F97316' },
  { id: 'camiseta-pixel-art', name: 'Camiseta Pixel Art', category: 'Presentes Criativos', price: 79.9, art: 'shirt', accent: '#FACC15' },
  { id: 'camiseta-cacador', name: 'Camiseta Caçador', category: 'Presentes Criativos', price: 84.9, badge: 'NOVO', art: 'shirt', accent: '#EF4444' },
  { id: 'pelucia-criatura-mistica', name: 'Pelúcia Criatura Mística', category: 'Presentes Criativos', price: 99.9, badge: 'MAIS VENDIDO', art: 'plush', accent: '#EF4444' },
  { id: 'pelucia-mascote', name: 'Pelúcia Mascote Fofo', category: 'Presentes Criativos', price: 69.9, art: 'plush', accent: '#FACC15' },
  { id: 'pelucia-dragao', name: 'Pelúcia Dragão Bebê', category: 'Presentes Criativos', price: 109.9, badge: 'EDIÇÃO ESPECIAL', art: 'plush', accent: '#7C3AED' },

  // ===== Chaveiros e Acessórios =====
  { id: 'chaveiro-espada', name: 'Chaveiro Espada Demoníaca', category: 'Chaveiros e Acessórios', price: 29.9, badge: 'NOVO', art: 'keychain', accent: '#EF4444' },
  { id: 'chaveiro-escudo', name: 'Chaveiro Escudo Heroico', category: 'Chaveiros e Acessórios', price: 24.9, art: 'keychain', accent: '#F97316' },
  { id: 'chaveiro-cristal', name: 'Chaveiro Cristal Mágico', category: 'Chaveiros e Acessórios', price: 19.9, badge: 'NOVO', art: 'keychain', accent: '#7C3AED' },
  { id: 'chaveiro-nave', name: 'Chaveiro Nave Espacial', category: 'Chaveiros e Acessórios', price: 27.9, art: 'keychain', accent: '#111111' },
  { id: 'kit-chaveiros', name: 'Kit 3 Chaveiros Geek', category: 'Chaveiros e Acessórios', price: 49.9, oldPrice: 69.9, badge: 'PROMO', art: 'keychain', accent: '#FACC15' },

  // ===== Games =====
  { id: 'luminaria-pixel', name: 'Luminária Pixel Game', category: 'Games', price: 89.9, oldPrice: 119.9, badge: 'PROMO', art: 'lamp', accent: '#FACC15' },
  { id: 'luminaria-lua', name: 'Luminária Lua Gamer', category: 'Games', price: 119.9, art: 'lamp', accent: '#7C3AED' },
  { id: 'luminaria-neon', name: 'Luminária Logo Neon', category: 'Games', price: 99.9, oldPrice: 139.9, badge: 'PROMO', art: 'lamp', accent: '#EF4444' },
  { id: 'controle-retro', name: 'Controle Retrô Colecionável', category: 'Games', price: 149.9, badge: 'NOVO', art: 'game', accent: '#F97316' },
  { id: 'headset-gamer', name: 'Headset Gamer Geek', category: 'Games', price: 249.9, badge: 'MAIS VENDIDO', art: 'game', accent: '#111111' },
  { id: 'mousepad-xl', name: 'Mousepad XL Universo', category: 'Games', price: 69.9, art: 'game', accent: '#7C3AED' },
]

/** Formata número como preço em Real brasileiro. */
export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

/** Busca um produto pelo id. */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

/** Busca produtos por nome ou categoria (case-insensitive). */
export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
  )
}

/** Lista de categorias únicas presentes nos produtos. */
export const productCategories: string[] = Array.from(
  new Set(products.map((p) => p.category)),
)
