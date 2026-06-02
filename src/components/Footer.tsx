import { Instagram, MessageCircle, MapPin, Clock, Heart } from 'lucide-react'
import { NAV_LINKS, STORE, whatsappLink } from '../lib/constants'
import { useData } from '../context/DataContext'

export function Footer() {
  const { categories } = useData()
  const year = new Date().getFullYear()
  return (
    <footer id="contato" className="bg-kimera-ink text-kimera-cream">
      <div className="section-container py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* marca */}
          <div>
            <a href="#inicio" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg border-[3px] border-kimera-cream bg-kimera-orange font-display text-xl text-kimera-ink">
                K
              </span>
              <span className="font-display text-2xl tracking-wide">
                KIMERA<span className="text-kimera-orange"> GEEK</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm font-medium text-kimera-cream/65">
              Loja geek com produtos únicos, presentes criativos e atendimento
              próximo. Um espaço acolhedor para toda a comunidade.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={STORE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-lg border-2 border-kimera-cream/30 transition-colors hover:bg-kimera-orange hover:text-kimera-ink"
              >
                <Instagram size={18} />
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-lg border-2 border-kimera-cream/30 transition-colors hover:bg-kimera-orange hover:text-kimera-ink"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* links rápidos */}
          <div>
            <h3 className="font-display text-xl tracking-wide text-kimera-yellow">Links rápidos</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm font-medium text-kimera-cream/65 transition-colors hover:text-kimera-orange">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* categorias */}
          <div>
            <h3 className="font-display text-xl tracking-wide text-kimera-yellow">Categorias</h3>
            <ul className="mt-4 space-y-2">
              {categories.map((c) => (
                <li key={c.id}>
                  <a href="#produtos" className="text-sm font-medium text-kimera-cream/65 transition-colors hover:text-kimera-orange">
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contato */}
          <div>
            <h3 className="font-display text-xl tracking-wide text-kimera-yellow">Contato</h3>
            <ul className="mt-4 space-y-3 text-sm font-medium text-kimera-cream/65">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 shrink-0 text-kimera-orange" />
                <a href={STORE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-kimera-orange">
                  {STORE.address}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={18} className="mt-0.5 shrink-0 text-kimera-orange" />
                <div className="space-y-0.5">
                  {STORE.hoursList.map((h) => (
                    <div key={h.day} className="flex justify-between gap-3">
                      <span>{h.day}</span>
                      <span className={`font-semibold ${h.time === 'Fechado' ? 'text-kimera-red' : 'text-kimera-cream/85'}`}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle size={18} className="mt-0.5 shrink-0 text-kimera-orange" />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-kimera-orange">
                  Atendimento no WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Instagram size={18} className="mt-0.5 shrink-0 text-kimera-orange" />
                <a href={STORE.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-kimera-orange">
                  {STORE.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* rodapé inferior */}
      <div className="border-t-[3px] border-kimera-cream/15">
        <div className="section-container flex flex-col items-center justify-between gap-2 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs font-medium text-kimera-cream/55">
            © {year} Kimera Geek · Rondonópolis - MT. Todos os direitos reservados.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-kimera-cream/55">
            Feito com <Heart size={13} className="fill-kimera-red text-kimera-red" /> para a comunidade geek
          </p>
        </div>
      </div>
    </footer>
  )
}
