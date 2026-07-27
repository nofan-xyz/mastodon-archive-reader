import { useArchive } from '@/context/ArchiveContext'
import { useI18n } from '@/context/LanguageContext'
import type { PageKey } from '@/types'
import {
  OverviewIcon,
  PostsIcon,
  MediaIcon,
  HeartIcon,
  BookmarkIcon,
  SearchIcon,
} from '@/components/ui/Icons'

export function Sidebar() {
  const { currentPage, setCurrentPage, archive } = useArchive()
  const { t } = useI18n()

  const navItems: { key: PageKey; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { key: 'overview', label: t('nav.overview'), icon: OverviewIcon },
    { key: 'posts', label: t('nav.posts'), icon: PostsIcon },
    { key: 'media', label: t('nav.media'), icon: MediaIcon },
    { key: 'likes', label: t('nav.likes'), icon: HeartIcon },
    { key: 'bookmarks', label: t('nav.bookmarks'), icon: BookmarkIcon },
    { key: 'search', label: t('nav.search'), icon: SearchIcon },
  ]

  const counts: Partial<Record<PageKey, number>> = {
    posts: archive?.posts.length ?? 0,
    media: archive?.mediaItems.length ?? 0,
    likes: archive?.likes.length ?? 0,
    bookmarks: archive?.bookmarks.length ?? 0,
  }

  return (
    <aside className="w-60 shrink-0 bg-cream border-r-[3px] border-ink p-4 flex flex-col gap-1 overflow-y-auto neo-scroll">
      {navItems.map((item) => {
        const isActive = currentPage === item.key
        const Icon = item.icon
        const count = counts[item.key]

        return (
          <button
            key={item.key}
            onClick={() => setCurrentPage(item.key)}
            className={`neo-nav-item ${isActive ? 'neo-nav-item-active' : ''}`}
          >
            <Icon size={22} />
            <span className="flex-1 text-left">{item.label}</span>
            {count !== undefined && (
              <span className={`font-mono text-xs px-2 py-0.5 rounded-full border-[2px] border-ink ${
                isActive ? 'bg-pink' : 'bg-white'
              }`}>
                {count}
              </span>
            )}
          </button>
        )
      })}

      {/* Bottom doodle area */}
      <div className="mt-auto pt-4">
        <div className="neo-card bg-yellow p-3 text-center">
          <p className="font-display text-sm leading-tight">{t('sidebar.yourData')}</p>
          <p className="font-display text-sm leading-tight">{t('sidebar.yourBrowser')}</p>
          <div className="mt-2 text-2xl">🔒</div>
        </div>

        {/* Copyright footer */}
        <div className="mt-3 text-center">
          <div className="flex items-center justify-center gap-1.5 font-body text-xs text-ink/40 flex-wrap">
            <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
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
        </div>
      </div>
    </aside>
  )
}
