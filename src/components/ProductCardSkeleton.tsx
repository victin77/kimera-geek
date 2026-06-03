// Placeholder enquanto os produtos reais carregam da API — mantém o layout
// estável (sem flash) e segue o visual comic (borda preta + sombra dura).
export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border-[3px] border-kimera-ink bg-white shadow-comic">
      <div className="aspect-square bg-kimera-ink/10" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-3 w-1/3 rounded bg-kimera-ink/10" />
        <div className="h-4 w-3/4 rounded bg-kimera-ink/15" />
        <div className="mt-2 flex items-center justify-between">
          <div className="h-5 w-1/3 rounded bg-kimera-ink/15" />
          <div className="h-9 w-9 rounded-lg bg-kimera-ink/10" />
        </div>
      </div>
    </div>
  )
}
