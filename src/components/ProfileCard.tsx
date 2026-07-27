import type { Profile } from '@/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatCount, getInitials, getAvatarColor, formatDate } from '@/lib/utils'
import { LinkIcon } from '@/components/ui/Icons'
import { useI18n } from '@/context/LanguageContext'

interface ProfileCardProps {
  profile: Profile
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const { t } = useI18n()
  const avatarColor = getAvatarColor(profile.username)
  const initials = getInitials(profile.displayName || profile.username)

  // Only build stat blocks for fields that actually exist in the archive
  const profileStats: { label: string; value: string; bg: string }[] = []
  if (profile.statusesCount !== undefined && profile.statusesCount !== null) {
    profileStats.push({ label: t('profile.posts'), value: formatCount(profile.statusesCount), bg: 'bg-lime/40' })
  }
  if (profile.following !== undefined && profile.following !== null) {
    profileStats.push({ label: t('profile.following'), value: formatCount(profile.following), bg: 'bg-pink/40' })
  }
  if (profile.followers !== undefined && profile.followers !== null) {
    profileStats.push({ label: t('profile.followers'), value: formatCount(profile.followers), bg: 'bg-yellow/50' })
  }

  return (
    <Card className="p-6">
      <div className="flex items-start gap-5">
        {/* Avatar */}
        <div
          className="w-20 h-20 shrink-0 flex items-center justify-center rounded-neo border-[3px] border-ink shadow-neo-sm font-display text-2xl"
          style={{ backgroundColor: avatarColor }}
        >
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.displayName}
              className="w-full h-full object-cover rounded-neo-sm"
            />
          ) : (
            initials
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-display text-2xl leading-tight">{profile.displayName}</h2>
            {profile.instance && (
              <Badge color="blue">
                @{profile.instance}
              </Badge>
            )}
          </div>

          <p className="font-mono text-sm text-ink/60 mt-1">@{profile.username}</p>

          {profile.summary && (
            <p className="font-body text-sm text-ink/80 mt-3 leading-relaxed">
              {profile.summary}
            </p>
          )}

          <div className="flex items-center gap-4 mt-3 flex-wrap">
            {profile.url && (
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-sm text-blue font-bold hover:underline"
              >
                <LinkIcon size={14} />
                {t('common.viewOriginalProfile')}
              </a>
            )}
            {profile.createdAt && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ink/50">
                {t('common.since')} {formatDate(profile.createdAt)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats row — only render if at least one stat exists */}
      {profileStats.length > 0 && (
        <div
          className="grid gap-3 mt-6"
          style={{ gridTemplateColumns: `repeat(${profileStats.length}, minmax(0, 1fr))` }}
        >
          {profileStats.map((stat) => (
            <div key={stat.label} className={`p-3 ${stat.bg} border-[3px] border-ink rounded-neo-sm text-center`}>
              <p className="font-display text-2xl leading-none">{stat.value}</p>
              <p className="font-body text-xs text-ink/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
