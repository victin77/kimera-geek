import { motion } from 'framer-motion'
import { Sparkles, MessagesSquare, ShieldCheck, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Sparkles, title: 'Produtos exclusivos', text: 'Itens únicos que você não acha em qualquer lugar.' },
  { icon: MessagesSquare, title: 'Atendimento personalizado', text: 'A gente te ajuda a achar o presente certo.' },
  { icon: ShieldCheck, title: 'Compra segura', text: 'Negociação transparente e confiável.' },
  { icon: MapPin, title: 'Retirada ou entrega', text: 'Em toda Rondonópolis - MT.' },
]

export function BenefitsBar() {
  return (
    <section className="bg-kimera-ink">
      <div className="section-container grid grid-cols-1 gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b, i) => {
          const Icon = b.icon
          return (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-3 px-2 py-6 lg:px-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-kimera-cream/20 bg-kimera-orange text-kimera-ink">
                <Icon size={22} strokeWidth={2.5} />
              </span>
              <div>
                <p className="font-extrabold text-kimera-cream">{b.title}</p>
                <p className="text-sm font-medium text-kimera-cream/60">{b.text}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
