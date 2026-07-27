import { useArchive } from '@/context/ArchiveContext'
import { useI18n } from '@/context/LanguageContext'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/EmptyState'
import { BookmarkIcon, LinkIcon } from '@/components/ui/Icons'
import { relativeTime, formatDateTime } from '@/lib/utils'

export function BookmarksPage() {
  const { archive } = useArchive()
  const { t } = useI18n()

  if (!archive) return null

  const bookmarks = archive.bookmarks

  if (bookmarks.length === 0) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="font-display text-4xl mb-1">{t('bookmarks.title')}</h1>
        <EmptyState
          icon={<BookmarkIcon size={40} />}
          title={t('bookmarks.empty')}
          message={t('bookmarks.emptyMessage')}
        />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="font-display text-4xl mb-1">{t('bookmarks.title')}</h1>
        <p className="font-body text-ink/60">
          {t('bookmarks.count', { count: bookmarks.length })}
        </p>
      </div>

      <div className="space-y-3">
        {bookmarks.map((bm) => (
          <Card key={bm.id} hover className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-purple border-[3px] border-ink rounded-neo-sm shadow-neo-sm text-white">
                <BookmarkIcon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                {bm.actor && (
                  <p className="font-mono text-xs text-ink/50 mb-1">
                    {bm.actor.replace(/^https?:\/\//, '').split('/')[0]}
                  </p>
                )}
                <p className="font-body text-sm leading-relaxed line-clamp-3">
                  {bm.content}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <time className="font-mono text-xs text-ink/40" title={formatDateTime(bm.published)}>
                    {relativeTime(bm.published)}
                  </time>
                  {bm.url && (
                    <a
                      href={bm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-blue hover:underline"
                    >
                      <LinkIcon size={12} />
                      {t('common.viewOriginal')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
