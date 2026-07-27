import { useRef } from 'react'
import { useArchive } from '@/context/ArchiveContext'
import { useI18n } from '@/context/LanguageContext'
import { SearchIcon, UploadIcon, ShieldIcon, GlobeIcon, DonateIcon } from '@/components/ui/Icons'

export function Header() {
  const { setCurrentPage, importFile, isLoading } = useArchive()
  const { lang, toggleLang, t } = useI18n()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) importFile(file)
    e.target.value = ''
  }

  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4 bg-white border-b-[3px] border-ink">
      {/* Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-11 h-11 flex items-center justify-center bg-lime border-[3px] border-ink rounded-neo-sm shadow-neo-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A23" strokeWidth="2.5" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h10" />
          </svg>
        </div>
        <div>
          <h1 className="font-display text-xl leading-none">{t('header.productName')}</h1>
          <p className="font-mono text-xs text-ink/50 mt-0.5">{t('header.subtitle')}</p>
        </div>
      </div>

      {/* Search bar */}
      <button
        onClick={() => setCurrentPage('search')}
        className="hidden md:flex items-center gap-3 flex-1 max-w-md px-4 py-2.5
                   bg-cream border-[3px] border-ink rounded-neo-sm
                   text-ink/40 font-body text-sm text-left
                   hover:bg-yellow/30 transition-colors duration-150 cursor-pointer"
      >
        <SearchIcon size={18} />
        {t('header.searchPlaceholder')}
      </button>

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Privacy badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-lime/40 border-[3px] border-ink rounded-full">
          <ShieldIcon size={14} />
          <span className="font-body font-bold text-xs">{t('header.privacyBadge')}</span>
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

        {/* Donate button */}
        <a
          href="https://nofan.xyz/overview#donate"
          target="_blank"
          rel="noopener noreferrer"
          className="neo-btn bg-yellow text-ink px-4 py-2.5 text-sm"
        >
          <DonateIcon size={18} />
          <span className="hidden sm:inline">{t('header.donate')}</span>
        </a>

        {/* Import button */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".zip,.json"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="neo-btn bg-pink text-ink px-4 py-2.5 text-sm"
        >
          <UploadIcon size={18} />
          <span className="hidden sm:inline">{isLoading ? t('header.loading') : t('header.newArchive')}</span>
        </button>
      </div>
    </header>
  )
}
