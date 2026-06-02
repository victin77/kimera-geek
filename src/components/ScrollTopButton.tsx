import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

/** Botão flutuante "voltar ao topo" — aparece depois de rolar um pouco. */
export function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Voltar ao topo"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-5 left-5 z-50 grid h-12 w-12 place-items-center rounded-full border-[3px] border-kimera-ink bg-kimera-yellow text-kimera-ink shadow-comic-lg"
        >
          <ArrowUp size={22} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
