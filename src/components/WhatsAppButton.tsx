import type { ReactNode } from 'react'
import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../lib/constants'

interface Props {
  /** mensagem pré-preenchida no WhatsApp */
  message?: string
  children?: ReactNode
  /** classes de cor do estado normal (ex.: bg-kimera-cream text-kimera-ink) */
  className?: string
  /** ícone exibido junto ao texto. Passe `null` pra esconder. Padrão: MessageCircle */
  icon?: ReactNode
  /** lado do ícone em relação ao texto. Padrão: 'left' */
  iconPosition?: 'left' | 'right'
  /** callback extra ao clicar (ex.: fechar menu mobile) */
  onClick?: () => void
}

/**
 * Botão de WhatsApp com efeito "bolha verde do centro" no hover.
 * Reutilizável — o verde (#25D366) preenche a partir do meio e o texto vira branco.
 */
export function WhatsAppButton({
  message,
  children = 'Falar no WhatsApp',
  className = 'bg-kimera-cream text-kimera-ink',
  icon = <MessageCircle size={18} />,
  iconPosition = 'left',
  onClick,
}: Props) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`btn-comic group relative overflow-hidden ${className}`}
    >
      {/* bolha verde que expande do centro */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 z-0 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-[#25D366] transition-transform duration-500 ease-out group-hover:scale-100"
      />
      <span className="relative z-10 inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
        {iconPosition === 'left' && icon}
        {children}
        {iconPosition === 'right' && icon}
      </span>
    </a>
  )
}
