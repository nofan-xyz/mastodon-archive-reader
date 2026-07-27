import { useArchive } from '@/context/ArchiveContext'
import { useI18n } from '@/context/LanguageContext'
import { ProfileCard } from '@/components/ProfileCard'
import { StatCard } from '@/components/StatCard'
import { Card } from '@/components/ui/Card'
import {
  PostsIcon,
  MediaIcon,
  HeartIcon,
  BookmarkIcon,
} from '@/components/ui/Icons'
import { formatDate } from '@/lib/utils'

export function OverviewPage() {
  const { archive } = useArchive()
  const { t } = useI18n()

  if (!archive) return null

  const profile = archive.profile
  const stats = [
    { label: t('overview.totalPosts'), value: archive.posts.length, icon: <PostsIcon size={22} />, color: 'lime' as const },
    { label: t('overview.mediaItems'), value: archive.mediaItems.length, icon: <MediaIcon size={22} />, color: 'blue' as const },
    { label: t('overview.likes'), value: archive.likes.length, icon: <HeartIcon size={22} />, color: 'pink' as const },
    { label: t('overview.bookmarks'), value: archive.bookmarks.length, icon: <BookmarkIcon size={22} />, color: 'purple' as const },
  ]

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Page title */}
      <div>
        <h1 className="font-display text-4xl mb-1">{t('overview.title')}</h1>
        <p className="font-body text-ink/60">{t('overview.subtitle')}</p>
      </div>

      {/* Profile card */}
      {profile && <ProfileCard profile={profile} />}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Account info card */}
      {profile && (
        <Card className="p-6">
          <h3 className="font-display text-lg mb-4">{t('overview.accountDetails')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-body text-sm">
            {profile.instance && (
              <InfoRow label={t('overview.instance')} value={profile.instance} mono />
            )}
            {profile.username && (
              <InfoRow label={t('overview.username')} value={`@${profile.username}`} mono />
            )}
            {profile.createdAt && (
              <InfoRow label={t('overview.memberSince')} value={formatDate(profile.createdAt)} />
            )}
            <InfoRow
              label={t('overview.manuallyApproves')}
              value={profile.manuallyApprovesFollowers ? t('common.yes') : t('common.no')}
            />
            <InfoRow
              label={t('overview.discoverable')}
              value={profile.discoverable ? t('common.yes') : t('common.no')}
            />
            {profile.statusesCount !== undefined && (
              <InfoRow label={t('overview.totalStatuses')} value={String(profile.statusesCount)} />
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b-[2px] border-ink/5 last:border-0">
      <span className="text-ink/50">{label}</span>
      <span className={`font-bold ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  )
}
