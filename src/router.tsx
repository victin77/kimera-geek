import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface RouterValue {
  path: string
  navigate: (to: string) => void
}

const RouterContext = createContext<RouterValue | null>(null)

/** Roteador mínimo (sem dependência externa) usando History API. */
export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (to: string) => {
    const url = new URL(to, window.location.origin)
    if (
      url.pathname !== window.location.pathname ||
      url.search !== window.location.search
    ) {
      window.history.pushState({}, '', to)
      // path guarda só o pathname (a query é lida direto onde precisar)
      setPath(url.pathname)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRouter(): RouterValue {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter deve ser usado dentro de <RouterProvider>')
  return ctx
}
