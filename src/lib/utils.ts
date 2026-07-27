import type { Post, FilterState } from '@/types'

/**
 * Utility functions for the archive reader.
 */

// ── Date formatting ─────────────────────────────────────

export function formatDate(iso: string): string {
  if (!iso) return 'Unknown date'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTime(iso: string): string {
  if (!iso) return 'Unknown date'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function relativeTime(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const diff = Date.now() - d.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) return `${years}y ago`
  if (months > 0) return `${months}mo ago`
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'just now'
}

// ── Number formatting ───────────────────────────────────

export function formatCount(n: number | undefined): string {
  if (n === undefined || n === null) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

// ── Filtering & sorting ─────────────────────────────────

export function filterPosts(posts: Post[], filter: FilterState): Post[] {
  let result = [...posts]

  // Text search
  if (filter.query.trim()) {
    const q = filter.query.toLowerCase()
    result = result.filter(
      (p) =>
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
    )
  }

  // Year filter
  if (filter.year) {
    result = result.filter((p) => {
      const d = new Date(p.published)
      return !isNaN(d.getTime()) && String(d.getFullYear()) === filter.year
    })
  }

  // Month filter
  if (filter.month) {
    result = result.filter((p) => {
      const d = new Date(p.published)
      return (
        !isNaN(d.getTime()) &&
        String(d.getMonth() + 1).padStart(2, '0') === filter.month
      )
    })
  }

  // Has media filter
  if (filter.hasMedia) {
    result = result.filter((p) => p.attachments.length > 0)
  }

  // Tag filter
  if (filter.tag) {
    result = result.filter((p) => p.tags.includes(filter.tag!))
  }

  // Sort
  result.sort((a, b) => {
    const da = new Date(a.published).getTime()
    const db = new Date(b.published).getTime()
    return filter.sort === 'newest' ? db - da : da - db
  })

  return result
}

// ── Extract available years and tags ────────────────────

export function getAvailableYears(posts: Post[]): string[] {
  const years = new Set<string>()
  for (const p of posts) {
    const d = new Date(p.published)
    if (!isNaN(d.getTime())) years.add(String(d.getFullYear()))
  }
  return Array.from(years).sort((a, b) => b.localeCompare(a))
}

export function getAvailableTags(posts: Post[]): string[] {
  const tags = new Set<string>()
  for (const p of posts) {
    p.tags.forEach((t) => tags.add(t))
  }
  return Array.from(tags).sort()
}

// ── Avatar / placeholder helpers ────────────────────────

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function getAvatarColor(username: string): string {
  const colors = ['#FF6EC7', '#FFD93D', '#4D96FF', '#B9FF66', '#5B57EB']
  let hash = 0
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}
