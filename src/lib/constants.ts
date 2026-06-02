// Informações de contato e marca da Kimera Geek.
// Centralizadas para facilitar troca por dados reais / variáveis de ambiente.

export const STORE = {
  name: 'Kimera Geek',
  city: 'Rondonópolis - MT',
  address: 'Av. Mal. Rondon, N 682 - Centro, Rondonópolis - MT, 78700-075',
  // link para abrir no Google Maps (busca pelo endereço)
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Kimera Geek, Av. Mal. Rondon, 682 - Centro, Rondonópolis - MT, 78700-075'),
  // URL de embed (iframe) do mini mapa — cravada no ponto exato da loja (KIMERA GEEK)
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d536.8238416003805!2d-54.631096099622326!3d-16.473238413995894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9379c9e0ce275595%3A0xff7d2b550541ec31!2sKIMERA%20GEEK!5e0!3m2!1spt-BR!2sbr!4v1780338841425!5m2!1spt-BR!2sbr',
  rating: '4,9',
  reviewsCount: '170+',
  // WhatsApp (66) 99246-0484 — formato internacional, sem máscara
  whatsappNumber: '5566992460484',
  whatsappMessage:
    'Olá, Kimera Geek! Vim pelo site e quero saber mais sobre os produtos. 🚀',
  instagram: 'https://instagram.com/kimerageek',
  instagramHandle: '@kimerageek',
  // resumo curto dos horários
  hours: 'Seg a Sex: 8h30–18h · Sáb: 8h30–12h',
  // horários detalhados por dia
  hoursList: [
    { day: 'Segunda a sexta', time: '08:30 – 18:00' },
    { day: 'Sábado', time: '08:30 – 12:00' },
    { day: 'Domingo', time: 'Fechado' },
  ],
} as const

/** Monta o link wa.me com mensagem pré-preenchida. */
export function whatsappLink(message: string = STORE.whatsappMessage): string {
  return `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Categorias', href: '#categorias' },
  { label: 'Novidades', href: '#novidades' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
] as const
