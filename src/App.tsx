import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { BenefitsBar } from './components/BenefitsBar'
import { Categories } from './components/Categories'
import { FeaturedProducts } from './components/FeaturedProducts'
import { PromoBanner } from './components/PromoBanner'
import { AboutStore } from './components/AboutStore'
import { Testimonials } from './components/Testimonials'
import { InstagramSection } from './components/InstagramSection'
import { Newsletter } from './components/Newsletter'
import { Footer } from './components/Footer'
import { WhatsAppFab } from './components/WhatsAppFab'
import { Preview } from './pages/Preview'
import { HoverPreview } from './pages/HoverPreview'
import { CarouselPreview } from './pages/CarouselPreview'
import { Catalog } from './pages/Catalog'
import { ProductDetail } from './pages/ProductDetail'
import { NotFound } from './pages/NotFound'
import { StoreProvider } from './context/StoreContext'
import { FlyToCartProvider } from './context/FlyToCartContext'
import { DataProvider } from './context/DataContext'
import { ScrollTopButton } from './components/ScrollTopButton'
import { RouterProvider, useRouter } from './router'

function Home() {
  return (
    <div className="min-h-screen bg-kimera-cream">
      <Header />
      <main>
        <Hero />
        <BenefitsBar />
        <Categories />
        <FeaturedProducts />
        <PromoBanner />
        <AboutStore />
        <Testimonials />
        <InstagramSection />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}

function Routes() {
  const { path } = useRouter()
  const clean = path.replace(/\/+$/, '')

  // Prévia de animações: SALVA, mas acessível APENAS em desenvolvimento.
  if (import.meta.env.DEV) {
    if (clean === '/preview' || window.location.search.includes('preview')) return <Preview />
    if (clean === '/preview-hover') return <HoverPreview />
    if (clean === '/preview-carousel') return <CarouselPreview />
  }

  if (clean === '/catalogo') return <Catalog />

  if (clean.startsWith('/produto/')) {
    const id = decodeURIComponent(clean.slice('/produto/'.length))
    return <ProductDetail id={id} />
  }

  // raiz → home; qualquer outra rota desconhecida → 404
  if (clean === '' || clean === '/') return <Home />

  return <NotFound />
}

export default function App() {
  return (
    <RouterProvider>
      <DataProvider>
        <StoreProvider>
          <FlyToCartProvider>
            <Routes />
            <ScrollTopButton />
          </FlyToCartProvider>
        </StoreProvider>
      </DataProvider>
    </RouterProvider>
  )
}
