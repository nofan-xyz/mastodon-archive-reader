import { UploadZone } from '@/components/UploadZone'
import { ShieldIcon, GlobeIcon } from '@/components/ui/Icons'
import { useI18n } from '@/context/LanguageContext'

export function ImportPage() {
  const { t, lang, toggleLang } = useI18n()
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-cream bg-dots flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center bg-lime border-[3px] border-ink rounded-neo-sm shadow-neo-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A23" strokeWidth="2.5" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h10" />
            </svg>
          </div>
          <h1 className="font-display text-xl">{t('header.productName')}</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-lime/40 border-[3px] border-ink rounded-full">
            <ShieldIcon size={16} />
            <span className="font-body font-bold text-sm">{t('header.privacyBadge')}</span>
          </div>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border-[3px] border-ink rounded-neo-sm shadow-neo-sm
                       hover:shadow-neo-none hover:translate-x-[2px] hover:translate-y-[2px]
                       active:shadow-neo-none active:translate-x-[2px] active:translate-y-[2px]
                       transition-all duration-100 cursor-pointer"
            title={lang === 'en' ? '切换到中文' : 'Switch to English'}
          >
            <GlobeIcon size={18} />
            <span className="font-mono font-bold text-sm">{lang === 'en' ? 'EN' : '中'}</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="text-center mb-10 max-w-3xl">
          <p className="font-mono text-sm text-ink/50 uppercase tracking-widest mb-3">
            {t('import.kicker')}
          </p>
          <h2 className="font-display text-5xl md:text-7xl leading-none mb-4">
            {t('import.title')}
          </h2>
          <p className="font-body text-lg text-ink/70 max-w-xl mx-auto">
            {t('import.subtitle')}
          </p>
        </div>

        {/* Upload zone */}
        <UploadZone />

        {/* File type info */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-pink border-[3px] border-ink rounded-neo-sm shadow-neo-sm">
            <span className="font-mono text-sm font-bold">actor.json</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue border-[3px] border-ink rounded-neo-sm shadow-neo-sm">
            <span className="font-mono text-sm font-bold text-white">outbox.json</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-lime border-[3px] border-ink rounded-neo-sm shadow-neo-sm">
            <span className="font-mono text-sm font-bold">likes.json</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple border-[3px] border-ink rounded-neo-sm shadow-neo-sm">
            <span className="font-mono text-sm font-bold text-white">bookmarks.json</span>
          </div>
        </div>

        <p className="mt-6 font-body text-sm text-ink/40 text-center max-w-lg">
          {t('import.exportHint')}
        </p>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 px-6">
        <p className="font-mono text-xs text-ink/30 mb-2">
          {t('import.footer')}
        </p>
        <div className="flex items-center justify-center gap-2 font-body text-xs text-ink/40">
          <span>{t('footer.copyright', { year })}</span>
          <a
            href="https://nofan.xyz/@twoheart"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-pink hover:underline"
          >
            twoheart
          </a>
          <span>·</span>
          <span>
            {t('footer.loveFrom')} <span className="font-bold">nofan</span> 💜
          </span>
        </div>
      </footer>
    </div>
  )
}
