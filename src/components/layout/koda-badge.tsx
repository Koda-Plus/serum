// Koda Plus agency badge (vault standard). Floating pill bottom-right that reveals
// a contact card on hover/focus. Server component, CSS-only. Lifted above the
// fixed Serum Radio bar. Brand green #26D07C must not change.
export function KodaBadge() {
  return (
    <div className="group fixed bottom-[5.5rem] right-5 z-[55]">
      {/* contact card, revealed on hover/focus, with a transparent hover bridge (pb-3) */}
      <div className="absolute bottom-full right-0 w-max origin-bottom-right translate-y-1 scale-95 pb-3 opacity-0 pointer-events-none transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
        <div className="rounded-2xl border border-white/10 bg-[#0d0f0d]/95 p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <div className="mb-2.5 text-[9px] uppercase tracking-[0.22em] text-zinc-500">
            Wstępny podgląd, zaprojektowane przez
          </div>
          <img src="/brand/koda-plus-logo.svg" alt="Koda Plus" width={104} height={23} className="h-[22px] w-auto" />
          <div className="mt-3.5 space-y-2 text-[12px] text-zinc-300">
            <a href="mailto:remik@koda.plus" className="flex items-center gap-2.5 transition-colors hover:text-white">
              <IconMail className="h-[15px] w-[15px] text-[#26D07C]" />
              remik@koda.plus
            </a>
            <a href="tel:+48665156988" className="flex items-center gap-2.5 transition-colors hover:text-white">
              <IconPhone className="h-[15px] w-[15px] text-[#26D07C]" />
              +48 665 156 988
            </a>
            <a href="https://koda.plus" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-white">
              <IconGlobe className="h-[15px] w-[15px] text-[#26D07C]" />
              koda.plus
            </a>
          </div>
        </div>
      </div>

      {/* collapsed pill */}
      <a
        href="https://koda.plus"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Demo zaprojektowane przez Koda Plus, koda.plus"
        className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0d0f0d]/85 px-3.5 py-2 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-[#26D07C]/40"
      >
        <span className="text-[9px] uppercase tracking-[0.22em] text-zinc-400">Demo by</span>
        <img src="/brand/koda-plus-logo.svg" alt="Koda Plus" width={68} height={15} className="h-[15px] w-auto" />
      </a>
    </div>
  )
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7L12 13L21 7" />
    </svg>
  )
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 4L9 4L11 9L8.5 10.5C9.5 13 11 14.5 13.5 15.5L15 13L20 15L20 19C20 19.5 19.5 20 19 20C10.5 20 4 13.5 4 5C4 4.5 4.5 4 5 4Z" />
    </svg>
  )
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12L21 12" />
      <path d="M12 3C15 7 15 17 12 21C9 17 9 7 12 3Z" />
    </svg>
  )
}
