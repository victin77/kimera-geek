import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../lib/constants'

/** Botão flutuante fixo de WhatsApp (canto inferior direito). */
export function WhatsAppFab() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full border-[3px] border-kimera-ink bg-[#25D366] text-white shadow-comic-lg"
    >
      <MessageCircle size={26} className="relative fill-white" />
    </motion.a>
  )
}
