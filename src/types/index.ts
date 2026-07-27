/**
 * ActivityPub Archive Reader — Data Models
 * Unified frontend types, decoupled from raw ActivityPub structure.
 */

export type MediaItemType = 'image' | 'video' | 'link' | 'gifv' | 'audio'

export interface MediaItem {
  type: MediaItemType
  url: string
  previewUrl?: string
  name?: string
  description?: string
  width?: number
  height?: number
}

export interface Post {
  id: string
  type: 'Create' | 'Announce' | 'Like' | 'Follow' | 'Update' | 'Delete' | 'other'
  content: string
  contentHtml?: string
  published: string
  url?: string
  inReplyTo?: string
  attachments: MediaItem[]
  tags: string[]
  mentions: string[]
  repliesCount?: number
  reblogsCount?: number
  favouritesCount?: number
  sensitive?: boolean
  summary?: string
}

export interface Profile {
  username: string
  displayName: string
  avatar?: string
  header?: string
  summary?: string
  url?: string
  followers?: number
  following?: number
  statusesCount?: number
  instance?: string
  createdAt?: string
  manuallyApprovesFollowers?: boolean
  discoverable?: boolean
}

export interface LikeEntry {
  id: string
  content: string
  contentHtml?: string
  published: string
  actor?: string
  url?: string
}

export interface BookmarkEntry {
  id: string
  content: string
  contentHtml?: string
  published: string
  actor?: string
  url?: string
}

export interface ArchiveData {
  profile: Profile | null
  posts: Post[]
  likes: LikeEntry[]
  bookmarks: BookmarkEntry[]
  mediaItems: MediaItem[]
  // Map from archive-relative path → object URL for local media
  mediaUrls: Record<string, string>
}

export type PageKey =
  | 'overview'
  | 'posts'
  | 'media'
  | 'likes'
  | 'bookmarks'
  | 'search'

export type SortOrder = 'newest' | 'oldest'

export interface FilterState {
  query: string
  year: string | null
  month: string | null
  hasMedia: boolean
  tag: string | null
  sort: SortOrder
}

export interface ParseError {
  file: string
  message: string
}
