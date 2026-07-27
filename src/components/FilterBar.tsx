import type { FilterState } from '@/types'
import { getAvailableYears, getAvailableTags } from '@/lib/utils'
import type { Post } from '@/types'
import { CalendarIcon, ImageIcon, StarIcon } from '@/components/ui/Icons'
import { useI18n } from '@/context/LanguageContext'

interface FilterBarProps {
  posts: Post[]
  filter: FilterState
  onChange: (partial: Partial<FilterState>) => void
  showSort?: boolean
}

export function FilterBar({ posts, filter, onChange, showSort = true }: FilterBarProps) {
  const { t } = useI18n()
  const years = getAvailableYears(posts)
  const tags = getAvailableTags(posts)

  const toggleYear = (year: string) => {
    onChange({ year: filter.year === year ? null : year })
  }

  const toggleTag = (tag: string) => {
    onChange({ tag: filter.tag === tag ? null : tag })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Sort */}
      {showSort && (
        <button
          onClick={() => onChange({ sort: filter.sort === 'newest' ? 'oldest' : 'newest' })}
          className="neo-btn bg-white text-ink px-3 py-1.5 text-sm"
        >
          {filter.sort === 'newest' ? `↓ ${t('filter.newestFirst')}` : `↑ ${t('filter.oldestFirst')}`}
        </button>
      )}

      {/* Year filters */}
      {years.length > 0 && (
        <div className="flex items-center gap-1.5">
          <CalendarIcon size={16} className="text-ink/50" />
          {years.map((year) => (
            <button
              key={year}
              onClick={() => toggleYear(year)}
              className={`neo-badge text-xs cursor-pointer transition-all ${
                filter.year === year
                  ? 'bg-yellow shadow-neo-sm'
                  : 'bg-white hover:bg-yellow/30'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {/* Has media toggle */}
      <button
        onClick={() => onChange({ hasMedia: !filter.hasMedia })}
        className={`neo-badge text-xs cursor-pointer transition-all ${
          filter.hasMedia
            ? 'bg-pink shadow-neo-sm'
            : 'bg-white hover:bg-pink/30'
        }`}
      >
        <ImageIcon size={12} />
        {t('filter.withMedia')}
      </button>

      {/* Tag filters (show top 5) */}
      {tags.length > 0 && (
        <div className="flex items-center gap-1.5">
          <StarIcon size={16} className="text-ink/50" />
          {tags.slice(0, 5).map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`neo-badge text-xs cursor-pointer transition-all ${
                filter.tag === tag
                  ? 'bg-lime shadow-neo-sm'
                  : 'bg-white hover:bg-lime/30'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
