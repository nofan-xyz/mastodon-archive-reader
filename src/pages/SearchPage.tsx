import { useMemo, useState } from 'react'
import { useArchive } from '@/context/ArchiveContext'
import { useI18n } from '@/context/LanguageContext'
import { PostCard } from '@/components/PostCard'
import { FilterBar } from '@/components/FilterBar'
import { EmptyState } from '@/components/EmptyState'
import { filterPosts, getAvatarColor } from '@/lib/utils'
import { SearchIcon } from '@/components/ui/Icons'
import type { Post } from '@/types'

type SearchScope = 'posts' | 'likes' | 'bookmarks'

export function SearchPage() {
  const { archive, filter, setFilter } = useArchive()
  const { t } = useI18n()
  const [scope, setScope] = useState<SearchScope>('posts')

  // Determine which dataset to search
  const searchResults = useMemo(() => {
    if (!archive) return []

    if (scope === 'posts') {
      return filterPosts(archive.posts, filter)
    }

    // For likes/bookmarks, filter by query string
    const items = scope === 'likes' ? archive.likes : archive.bookmarks
    if (!filter.query.trim()) return items

    const q = filter.query.toLowerCase()
    return items.filter((item) => item.content.toLowerCase().includes(q))
  }, [archive, filter, scope])

  if (!archive) return null

  const avatarColor = archive.profile
    ? getAvatarColor(archive.profile.username)
    : '#FF6EC7'
  const displayName = archive.profile?.displayName || 'Archive User'
  const username = archive.profile?.username || 'user'

  const scopeTabs: { key: SearchScope; label: string; count: number }[] = [
    { key: 'posts', label: t('nav.posts'), count: archive.posts.length },
    { key: 'likes', label: t('nav.likes'), count: archive.likes.length },
    { key: 'bookmarks', label: t('nav.bookmarks'), count: archive.bookmarks.length },
  ]

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      {/* Title */}
      <div>
        <h1 className="font-display text-4xl mb-1">{t('search.title')}</h1>
        <p className="font-body text-ink/60">{t('search.subtitle')}</p>
      </div>

      {/* Big search input */}
      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-ink/50 pointer-events-none">
          <SearchIcon size={24} />
        </span>
        <input
          type="text"
          value={filter.query}
          onChange={(e) => setFilter({ query: e.target.value })}
          placeholder={t('search.placeholder')}
          autoFocus
          className="neo-input pl-14 py-4 font-body text-lg"
        />
      </div>

      {/* Scope tabs */}
      <div className="flex items-center gap-2">
        {scopeTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setScope(tab.key)}
            className={`neo-badge cursor-pointer transition-all ${
              scope === tab.key
                ? 'bg-yellow shadow-neo-sm'
                : 'bg-white hover:bg-yellow/30'
            }`}
          >
            {tab.label}
            <span className="font-mono text-xs opacity-60">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Filters (only for posts scope) */}
      {scope === 'posts' && (
        <FilterBar
          posts={archive.posts}
          filter={filter}
          onChange={setFilter}
        />
      )}

      {/* Results count */}
      {filter.query && (
        <p className="font-body text-sm text-ink/50">
          {searchResults.length === 1
            ? t('search.resultCount')
            : t('search.resultsCount', { count: searchResults.length })}
          <span className="font-mono font-bold text-ink"> "{filter.query}"</span>
        </p>
      )}

      {/* Results */}
      {searchResults.length > 0 ? (
        <div className="space-y-4">
          {scope === 'posts'
            ? (searchResults as Post[]).map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  displayName={displayName}
                  username={username}
                  avatarColor={avatarColor}
                />
              ))
            : searchResults.map((item: any) => (
                <div
                  key={item.id}
                  className="neo-card p-4 hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
                >
                  <p className="font-body text-sm leading-relaxed line-clamp-3">
                    {item.content}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <time className="font-mono text-xs text-ink/40">
                      {item.published}
                    </time>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-blue hover:underline"
                      >
                        {t('common.viewOriginal')} →
                      </a>
                    )}
                  </div>
                </div>
              ))}
        </div>
      ) : filter.query ? (
        <EmptyState
          icon={<SearchIcon size={40} />}
          title={t('search.noResults')}
          message={t('search.noResultsMessage')}
        />
      ) : (
        <EmptyState
          icon={<SearchIcon size={40} />}
          title={t('search.startTyping')}
          message={t('search.startTypingMessage')}
        />
      )}
    </div>
  )
}
