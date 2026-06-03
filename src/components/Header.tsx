import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Heart, ShoppingBag, MessageCircle } from 'lucide-react'
import { NAV_LINKS } from '../lib/constants'
import { useStore } from '../context/StoreContext'
import { useRouter } from '../router'
import { SearchPanel } from './SearchPanel'
import { CartDrawer } from './CartDrawer'
import { FavoritesDrawer } from './FavoritesDrawer'
import { WhatsAppButton } from './WhatsAppButton'

type Drawer = 'cart' | 'fav' | null

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [drawer, setDrawer] = useState<Drawer>(null)
  const { favoriteCount, cartCount } = useStore()
  const { navigate, path } = useRouter()

  // clica num link do menu: se não estiver na home, volta pra home e rola até a seção
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    setMenuOpen(false)
    setSearchOpen(false)
    // destrava o scroll do body imediatamente (o menu mobile o travava)
    document.body.style.overflow = ''
    const id = href.slice(1)
    const scrollToSection = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    // espera o menu fechar / a home montar antes de rolar
    setTimeout(scrollToSection, path !== '/' ? 120 : 80)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // trava o scroll quando o menu mobile abre
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const toggleMenu = () =>
    setMenuOpen((v) => {
      if (!v) setSearchOpen(false)
      return !v
    })
  const toggleSearch = () =>
    setSearchOpen((v) => {
      if (!v) setMenuOpen(false)
      return !v
    })

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b-[3px] border-kimera-ink bg-kimera-cream shadow-comic-sm'
          : 'border-b-[3px] border-transparent bg-kimera-cream'
      }`}
    >
      <div className="section-container flex h-20 items-center justify-between gap-3 lg:h-24">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault()
            setMenuOpen(false)
            navigate('/')
          }}
          className="flex shrink-0 items-center"
          aria-label="Kimera Geek — ir para o início"
        >
          <img src="/favicon.png" alt="Kimera Geek" className="h-[72px] w-auto lg:h-[88px]" />
        </a>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative rounded-lg px-3 py-2 text-sm font-bold text-kimera-ink transition-colors hover:text-kimera-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-1">
          <IconButton label="Buscar" onClick={toggleSearch} active={searchOpen}>
            <Search size={18} />
          </IconButton>
          <IconButton label="Favoritos" onClick={() => setDrawer('fav')} badge={favoriteCount}>
            <Heart size={18} />
          </IconButton>
          <IconButton label="Carrinho" onClick={() => setDrawer('cart')} badge={cartCount}>
            <ShoppingBag size={18} />
          </IconButton>

          <WhatsAppButton
            className="ml-1 hidden bg-kimera-orange px-4 py-2 text-sm text-kimera-ink sm:inline-flex"
            icon={<MessageCircle size={16} />}
          >
            WhatsApp
          </WhatsAppButton>

          {/* Hamburguer mobile (animado) */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            className="ml-1 grid h-10 w-10 place-items-center rounded-lg border-[3px] border-kimera-ink bg-white shadow-comic-sm lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <motion.span
                animate={menuOpen ? { rotate: 45, top: 7 } : { rotate: 0, top: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-kimera-ink"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-kimera-ink"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, top: 7 } : { rotate: 0, top: 14 }}
                transition={{ duration: 0.25 }}
                className="absolute left-0 top-[14px] block h-0.5 w-5 rounded-full bg-kimera-ink"
              />
            </span>
          </button>
        </div>
      </div>

      {/* Painel de busca */}
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t-[3px] border-kimera-ink bg-kimera-cream lg:hidden"
          >
            <div className="section-container flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="rounded-lg px-3 py-3 text-base font-bold text-kimera-ink transition-colors hover:bg-kimera-yellow/40"
                >
                  {link.label}
                </motion.a>
              ))}
              <WhatsAppButton
                className="mt-2 w-full bg-kimera-orange text-kimera-ink"
                onClick={() => setMenuOpen(false)}
              >
                Chamar no WhatsApp
              </WhatsAppButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Drawers */}
      <CartDrawer open={drawer === 'cart'} onClose={() => setDrawer(null)} />
      <FavoritesDrawer open={drawer === 'fav'} onClose={() => setDrawer(null)} />
    </header>
  )
}

function IconButton({
  children,
  label,
  onClick,
  badge,
  active,
}: {
  children: React.ReactNode
  label: string
  onClick?: () => void
  badge?: number
  active?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`relative grid h-10 w-10 place-items-center rounded-lg text-kimera-ink transition-colors ${
        active ? 'bg-kimera-yellow' : 'hover:bg-kimera-yellow/50'
      }`}
    >
      {children}
      {typeof badge === 'number' && badge > 0 && (
        <motion.span
          key={badge}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full border border-kimera-ink bg-kimera-red px-1 text-[10px] font-bold text-white"
        >
          {badge}
        </motion.span>
      )}
    </button>
  )
}
