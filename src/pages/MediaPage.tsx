import { useMemo } from 'react'
import { useArchive } from '@/context/ArchiveContext'
import { useI18n } from '@/context/LanguageContext'
import { MediaCard } from '@/components/MediaCard'
import { EmptyState } from '@/components/EmptyState'
import { MediaIcon } from '@/components/ui/Icons'
import { Badge } from '@/components/ui/Badge'

export function MediaPage() {
  const { archive } = useArchive()
  const { t } = useI18n()

  const mediaByType = useMemo(() => {
    if (!archive) return { all: [], images: [], videos: [], links: [] }
    const all = archive.mediaItems
    return {
      all,
      images: all.filter((m) => m.type === 'image' || m.type === 'gifv'),
      videos: all.filter((m) => m.type === 'video'),
      links: all.filter((m) => m.type === 'link'),
    }
  }, [archive])

  if (!archive) return null

  if (mediaByType.all.length === 0) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="font-display text-4xl mb-1">{t('media.title')}</h1>
        <EmptyState
          icon={<MediaIcon size={40} />}
          title={t('media.empty')}
          message={t('media.emptyMessage')}
        />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Title + counts */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-4xl mb-1">{t('media.title')}</h1>
          <p className="font-body text-ink/60">
            {t('media.count', { count: mediaByType.all.length })}
          </p>
        </div>
        <div className="flex gap-2">
          {mediaByType.images.length > 0 && (
            <Badge color="pink">{mediaByType.images.length} {t('media.images')}</Badge>
          )}
          {mediaByType.videos.length > 0 && (
            <Badge color="blue">{mediaByType.videos.length} {t('media.videos')}</Badge>
          )}
          {mediaByType.links.length > 0 && (
            <Badge color="lime">{mediaByType.links.length} {t('media.links')}</Badge>
          )}
        </div>
      </div>

      {/* Media grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaByType.all.map((item, index) => (
          <MediaCard key={`${item.url}-${index}`} item={item} index={index} />
        ))}
      </div>
    </div>
  )
}
