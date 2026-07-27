import { useMemo } from 'react'
import { useArchive } from '@/context/ArchiveContext'
import { useI18n } from '@/context/LanguageContext'
import { PostCard } from '@/components/PostCard'
import { FilterBar } from '@/components/FilterBar'
import { EmptyState } from '@/components/EmptyState'
import { filterPosts, getAvatarColor } from '@/lib/utils'
import { PostsIcon } from '@/components/ui/Icons'

export function PostsPage() {
  const { archive, filter, setFilter } = useArchive()
  const { t } = useI18n()

  const posts = useMemo(() => {
    if (!archive) return []
    return filterPosts(archive.posts, filter)
  }, [archive, filter])

  if (!archive) return null

  const avatarColor = archive.profile
    ? getAvatarColor(archive.profile.username)
    : '#FF6EC7'
  const displayName = archive.profile?.displayName || 'Archive User'
  const username = archive.profile?.username || 'user'

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      {/* Title */}
      <div>
        <h1 className="font-display text-4xl mb-1">{t('posts.title')}</h1>
        <p className="font-body text-ink/60">
          {posts.length === 1
            ? t('posts.countOne')
            : t('posts.count', { count: posts.length })}
        </p>
      </div>

      {/* Filter bar */}
      <FilterBar
        posts={archive.posts}
        filter={filter}
        onChange={setFilter}
      />

      {/* Posts list */}
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              displayName={displayName}
              username={username}
              avatarColor={avatarColor}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<PostsIcon size={40} />}
          title={t('posts.empty')}
          message={t('posts.emptyMessage')}
        />
      )}
    </div>
  )
}
