import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  icon: LucideIcon
  /** badge ao lado do título (ex.: quantidade) */
  count?: number
  children: ReactNode
  footer?: ReactNode
}

/** Painel lateral (desliza da direita) reutilizado por carrinho e favoritos. */
export function Drawer({ open, onClose, title, icon: Icon, count, children, footer }: DrawerProps) {
  // trava o scroll do body enquanto aberto
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          {/* fundo escuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-kimera-ink/55"
          />

          {/* painel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l-[3px] border-kimera-ink bg-kimera-cream shadow-comic-lg"
          >
            {/* cabeçalho */}
            <div className="flex items-center justify-between border-b-[3px] border-kimera-ink bg-kimera-yellow px-5 py-4">
              <div className="flex items-center gap-2">
                <Icon size={22} className="text-kimera-ink" strokeWidth={2.5} />
                <h2 className="font-display text-2xl leading-none tracking-wide text-kimera-ink">
                  {title}
                </h2>
                {typeof count === 'number' && count > 0 && (
                  <span className="grid h-6 min-w-6 place-items-center rounded-full border-2 border-kimera-ink bg-kimera-orange px-1.5 text-xs font-extrabold text-kimera-ink">
                    {count}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="grid h-9 w-9 place-items-center rounded-lg border-2 border-kimera-ink bg-kimera-cream shadow-comic-sm transition-transform active:scale-90"
              >
                <X size={18} />
              </button>
            </div>

            {/* conteúdo rolável */}
            <div className="flex-1 overflow-y-auto p-5">{children}</div>

            {/* rodapé fixo */}
            {footer && (
              <div className="border-t-[3px] border-kimera-ink bg-white p-5">{footer}</div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
