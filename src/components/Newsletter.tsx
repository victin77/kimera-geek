import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Check, Zap } from 'lucide-react'
import { whatsappLink } from '../lib/constants'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // Abre o WhatsApp da loja com o e-mail já preenchido — a Kimera salva o contato.
    const msg = `Olá, Kimera Geek! 🚀 Quero receber as novidades e promoções. Meu e-mail para a newsletter é: ${email}`
    window.open(whatsappLink(msg), '_blank', 'noopener,noreferrer')
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section className="relative overflow-hidden bg-kimera-orange py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-halftone bg-dots opacity-60" />
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-kimera-yellow/50 blur-3xl" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl rounded-3xl border-[3px] border-kimera-ink bg-kimera-cream p-8 text-center shadow-comic-lg sm:p-12"
        >
          <span className="comic-tag bg-kimera-purple text-white">
            <Zap size={14} className="fill-white" />
            Newsletter
          </span>
          <h2 className="heading-comic mt-5 text-4xl text-kimera-ink sm:text-5xl">
            Não perca nenhuma <span className="text-kimera-orange">novidade!</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base font-medium text-kimera-ink/70">
            Receba lançamentos, promoções e novidades da Kimera Geek.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Mail size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-kimera-ink/50" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                aria-label="Seu e-mail"
                className="w-full rounded-xl border-[3px] border-kimera-ink bg-white py-3 pl-10 pr-4 font-semibold text-kimera-ink shadow-comic-sm outline-none placeholder:text-kimera-ink/40 focus:shadow-comic"
              />
            </div>
            <button type="submit" className="btn-comic bg-kimera-yellow text-kimera-ink whitespace-nowrap">
              Quero receber
            </button>
          </form>

          <AnimatePresence>
            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-kimera-purple"
              >
                <Check size={16} /> Abrimos o WhatsApp! É só enviar a mensagem pra confirmar. 💬
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
