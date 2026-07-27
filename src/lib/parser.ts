import JSZip from 'jszip'
import type {
  ArchiveData,
  Profile,
  Post,
  LikeEntry,
  BookmarkEntry,
  MediaItem,
  MediaItemType,
  ParseError,
} from '@/types'

/**
 * ActivityPub / Mastodon archive parser.
 * Converts raw archive data into unified frontend models.
 */

// ── Helpers ──────────────────────────────────────────────

/**
 * Extract a string URL from an ActivityPub url field.
 * In ActivityPub, "url" can be:
 *   - A plain string: "https://..."
 *   - An object: { type: "Link", href: "https://...", mediaType: "image/png" }
 *   - An array of either
 * Also handles bare filenames like "avatar.png" from GoToSocial archives.
 */
function extractUrl(urlField: any): string {
  if (!urlField) return ''
  if (typeof urlField === 'string') return urlField
  if (Array.isArray(urlField)) {
    for (const entry of urlField) {
      const extracted = extractUrl(entry)
      if (extracted) return extracted
    }
    return ''
  }
  if (typeof urlField === 'object') {
    return urlField.href || urlField.url || ''
  }
  return ''
}

/**
 * Strip query parameters and fragments from a URL before filename matching.
 * "https://instance.com/file.png?width=400" → "https://instance.com/file.png"
 */
function stripUrlParams(url: string): string {
  const qIdx = url.indexOf('?')
  const hIdx = url.indexOf('#')
  let end = url.length
  if (qIdx >= 0) end = Math.min(end, qIdx)
  if (hIdx >= 0) end = Math.min(end, hIdx)
  return url.substring(0, end)
}

/**
 * Normalize a ZIP-internal path so it starts from "media_attachments/".
 * Mastodon archives may nest files under a username folder (e.g. "nofan-box/media_attachments/..."),
 * so we strip everything before "media_attachments/" to get a canonical key.
 * For files outside media_attachments/ (e.g. "avatar.png"), use the path as-is.
 */
function normalizeMediaPath(path: string): string {
  const cleaned = path.replace(/^\.?\//, '')
  const idx = cleaned.indexOf('media_attachments/')
  if (idx >= 0) return cleaned.substring(idx)
  return cleaned
}

/**
 * Extract the "media_attachments/..." portion from a URL or path found in ActivityPub JSON.
 * URLs look like: https://instance.social/@username/media_attachments/files/116/964/.../original/73ee67216283476b.png
 * We want: media_attachments/files/116/964/.../original/73ee67216283476b.png
 * Returns null if the URL doesn't contain "media_attachments/".
 */
function extractMediaPathFromUrl(url: string): string | null {
  if (!url) return null
  const idx = url.indexOf('media_attachments/')
  if (idx >= 0) return url.substring(idx)
  return null
}

/**
 * Try to resolve an archive URL to a local object URL.
 * Matching strategy (in priority order):
 *  1. Exact normalized media path match (media_attachments/files/.../filename.ext)
 *  2. Filename-only fallback (works for GoToSocial fileserver URLs, bare filenames like "avatar.png", etc.)
 *  3. Exact original URL match (rare, but covers cases where URL == ZIP path)
 */
function resolveMediaUrl(originalUrl: string, mediaUrls: Record<string, string>): string | null {
  if (!originalUrl) return null
  const cleanUrl = stripUrlParams(originalUrl)
  // Strategy 1: extract media_attachments/... path from URL
  const mediaPath = extractMediaPathFromUrl(cleanUrl)
  if (mediaPath && mediaUrls[mediaPath]) return mediaUrls[mediaPath]
  // Strategy 2: filename fallback — works for GoToSocial fileserver URLs, bare filenames, etc.
  const filename = cleanUrl.split('/').pop() || ''
  if (filename && mediaUrls[filename]) return mediaUrls[filename]
  // Strategy 3: exact match (try both cleaned and original)
  if (mediaUrls[cleanUrl]) return mediaUrls[cleanUrl]
  if (mediaUrls[originalUrl]) return mediaUrls[originalUrl]
  return null
}

function stripHtml(html: string): string {
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

function safeHtml(html: string): string {
  // Basic sanitisation: strip script/style tags, keep allowed tags
  const cleaned = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '')
  return cleaned
}

function extractHashtags(html: string): string[] {
  const tags: string[] = []
  // Match Mastodon hashtag links: <a class="hashtag" ...>#<span>tag</span></a>
  const regex = /class="hashtag"[^>]*>#<span>([^<]+)<\/span>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    tags.push(match[1].toLowerCase())
  }
  // Fallback: plain text hashtags
  if (tags.length === 0) {
    const plainRegex = /#(\w+)/g
    while ((match = plainRegex.exec(stripHtml(html))) !== null) {
      tags.push(match[1].toLowerCase())
    }
  }
  return [...new Set(tags)]
}

function extractMentions(html: string): string[] {
  const mentions: string[] = []
  const regex = /class="u-url mention"[^>]*>@<span>([^<]+)<\/span>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    mentions.push(match[1])
  }
  return [...new Set(mentions)]
}

function mapMediaType(mime: string): MediaItemType {
  if (mime.startsWith('image/')) return 'image'
  if (mime.startsWith('video/')) return 'video'
  if (mime.startsWith('audio/')) return 'audio'
  return 'link'
}

// ── Profile parser ──────────────────────────────────────

function parseActor(data: any): Profile {
  const attachments = data.attachment || []
  const followers = attachments.find((a: any) => a.name === 'followers')?.value
  const following = attachments.find((a: any) => a.name === 'following')?.value

  // GoToSocial stores icon/image as { type: "Image", url: "avatar.png" }
  // Standard Mastodon may use full URLs. extractUrl handles both.
  const avatarUrl = data.icon ? extractUrl(data.icon.url) : undefined
  const headerUrl = data.image ? extractUrl(data.image.url) : undefined

  return {
    username: data.preferredUsername || data.username || 'unknown',
    displayName: data.name || data.preferredUsername || 'Unknown User',
    avatar: avatarUrl,
    header: headerUrl,
    summary: data.summary ? stripHtml(data.summary) : undefined,
    url: extractUrl(data.url) || undefined,
    followers: followers ? parseInt(followers, 10) : undefined,
    following: following ? parseInt(following, 10) : undefined,
    statusesCount: data.statementsCount || data.outboxTotal || undefined,
    instance: data.url ? new URL(extractUrl(data.url) || data.url).hostname : undefined,
    createdAt: data.published,
    manuallyApprovesFollowers: data.manuallyApprovesFollowers,
    discoverable: data.discoverable,
  }
}

// ── Outbox parser ───────────────────────────────────────

function parseOutbox(data: any): Post[] {
  const posts: Post[] = []
  const items = data.orderedItems || data.items || []

  for (const item of items) {
    const type = item.type || 'other'
    const published = item.published || ''
    const obj = item.object

    // Skip non-Create / non-Announce activities for the timeline
    if (type !== 'Create' && type !== 'Announce' && type !== 'Update') {
      // Still capture likes/announces counts if available
      continue
    }

    const activityObj = typeof obj === 'string' ? null : obj
    if (!activityObj) continue

    const content = activityObj.content ? stripHtml(activityObj.content) : ''
    const contentHtml = activityObj.content ? safeHtml(activityObj.content) : ''

    const attachments: MediaItem[] = (activityObj.attachment || []).map((att: any) => ({
      type: mapMediaType(att.mediaType || att.type || 'link'),
      url: extractUrl(att.url),
      previewUrl: extractUrl(att.previewUrl) || undefined,
      name: att.name || att.summary,
      description: att.description,
      width: att.width,
      height: att.height,
    }))

    posts.push({
      id: activityObj.id || item.id || crypto.randomUUID(),
      type: type === 'Announce' ? 'Announce' : 'Create',
      content,
      contentHtml,
      published,
      url: extractUrl(activityObj.url) || extractUrl(item.url) || undefined,
      inReplyTo: activityObj.inReplyTo,
      attachments,
      tags: extractHashtags(activityObj.content || ''),
      mentions: extractMentions(activityObj.content || ''),
      repliesCount: activityObj.repliesCount,
      reblogsCount: activityObj.reblogsCount,
      favouritesCount: activityObj.favouritesCount || activityObj.likesCount,
      sensitive: activityObj.sensitive,
      summary: activityObj.summary,
    })
  }

  return posts
}

// ── Likes parser ────────────────────────────────────────

function parseLikes(data: any): LikeEntry[] {
  const items = data.orderedItems || data.items || []
  return items
    .map((item: any) => {
      const obj = typeof item.object === 'string' ? { id: item.object } : item.object || {}
      return {
        id: obj.id || item.id || crypto.randomUUID(),
        content: obj.content ? stripHtml(obj.content) : '',
        contentHtml: obj.content ? safeHtml(obj.content) : '',
        published: item.published || obj.published || '',
        actor: obj.attributedTo || item.actor,
        url: extractUrl(obj.url) || (typeof item.object === 'string' ? item.object : '') || undefined,
      }
    })
    .filter((e: LikeEntry) => e.content || e.url)
}

// ── Bookmarks parser ────────────────────────────────────

function parseBookmarks(data: any): BookmarkEntry[] {
  const items = data.orderedItems || data.items || []
  return items
    .map((item: any) => {
      const obj = typeof item.object === 'string' ? { id: item.object } : item.object || {}
      return {
        id: obj.id || item.id || crypto.randomUUID(),
        content: obj.content ? stripHtml(obj.content) : '',
        contentHtml: obj.content ? safeHtml(obj.content) : '',
        published: item.published || obj.published || '',
        actor: obj.attributedTo || item.actor,
        url: extractUrl(obj.url) || (typeof item.object === 'string' ? item.object : '') || undefined,
      }
    })
    .filter((e: BookmarkEntry) => e.content || e.url)
}

// ── Main entry: parse ZIP ───────────────────────────────

export async function parseZipFile(file: File): Promise<{ data: ArchiveData; errors: ParseError[] }> {
  const errors: ParseError[] = []
  const mediaUrls: Record<string, string> = {}

  const zip = await JSZip.loadAsync(file)

  // Collect all media files into object URLs
  const mediaExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'mp4', 'webm', 'mov', 'mp3', 'ogg']
  const mediaPromises: Promise<void>[] = []

  zip.forEach((relativePath, zipEntry) => {
    const ext = relativePath.split('.').pop()?.toLowerCase() || ''
    if (mediaExtensions.includes(ext) && !zipEntry.dir) {
      mediaPromises.push(
        zipEntry.async('blob').then((blob) => {
          const objectUrl = URL.createObjectURL(blob)
          // Primary key: normalized path starting from "media_attachments/"
          const normalizedPath = normalizeMediaPath(relativePath)
          mediaUrls[normalizedPath] = objectUrl
          // Fallback key: filename only (for loose matching)
          const filename = relativePath.split('/').pop() || ''
          if (filename && !mediaUrls[filename]) {
            mediaUrls[filename] = objectUrl
          }
        })
      )
    }
  })

  await Promise.all(mediaPromises)

  // Parse JSON files
  let profile: Profile | null = null
  let posts: Post[] = []
  let likes: LikeEntry[] = []
  let bookmarks: BookmarkEntry[] = []

  // actor.json
  const actorFile = zip.file(/actor\.json$/i)[0]
  if (actorFile) {
    try {
      const content = await actorFile.async('text')
      profile = parseActor(JSON.parse(content))
    } catch (e) {
      errors.push({ file: 'actor.json', message: 'Failed to parse profile data' })
    }
  } else {
    errors.push({ file: 'actor.json', message: 'actor.json not found in archive' })
  }

  // outbox.json
  const outboxFile = zip.file(/outbox\.json$/i)[0]
  if (outboxFile) {
    try {
      const content = await outboxFile.async('text')
      posts = parseOutbox(JSON.parse(content))
    } catch (e) {
      errors.push({ file: 'outbox.json', message: 'Failed to parse outbox data' })
    }
  } else {
    errors.push({ file: 'outbox.json', message: 'outbox.json not found in archive' })
  }

  // likes.json
  const likesFile = zip.file(/likes\.json$/i)[0]
  if (likesFile) {
    try {
      const content = await likesFile.async('text')
      likes = parseLikes(JSON.parse(content))
    } catch (e) {
      errors.push({ file: 'likes.json', message: 'Failed to parse likes data' })
    }
  }

  // bookmarks.json
  const bookmarksFile = zip.file(/bookmarks\.json$/i)[0]
  if (bookmarksFile) {
    try {
      const content = await bookmarksFile.async('text')
      bookmarks = parseBookmarks(JSON.parse(content))
    } catch (e) {
      errors.push({ file: 'bookmarks.json', message: 'Failed to parse bookmarks data' })
    }
  }

  // Remap media attachment URLs to local object URLs
  const allMediaItems: MediaItem[] = []
  for (const post of posts) {
    for (const att of post.attachments) {
      const localUrl = resolveMediaUrl(att.url, mediaUrls)
      if (localUrl) {
        att.url = localUrl
        if (att.previewUrl) att.previewUrl = localUrl
      }
      allMediaItems.push(att)
    }
  }

  // Remap profile avatar and header images
  if (profile) {
    if (profile.avatar) {
      const avatarLocal = resolveMediaUrl(profile.avatar, mediaUrls)
      if (avatarLocal) profile.avatar = avatarLocal
    }
    if (profile.header) {
      const headerLocal = resolveMediaUrl(profile.header, mediaUrls)
      if (headerLocal) profile.header = headerLocal
    }
  }

  return {
    data: {
      profile,
      posts,
      likes,
      bookmarks,
      mediaItems: allMediaItems,
      mediaUrls,
    },
    errors,
  }
}

// ── Parse individual JSON files ─────────────────────────

export async function parseJsonFile(file: File): Promise<{ data: ArchiveData; errors: ParseError[] }> {
  const errors: ParseError[] = []
  const text = await file.text()
  let json: any

  try {
    json = JSON.parse(text)
  } catch {
    return {
      data: { profile: null, posts: [], likes: [], bookmarks: [], mediaItems: [], mediaUrls: {} },
      errors: [{ file: file.name, message: 'Invalid JSON format' }],
    }
  }

  const name = file.name.toLowerCase()
  let profile: Profile | null = null
  let posts: Post[] = []
  let likes: LikeEntry[] = []
  let bookmarks: BookmarkEntry[] = []

  if (name.includes('actor')) {
    profile = parseActor(json)
  } else if (name.includes('outbox')) {
    posts = parseOutbox(json)
  } else if (name.includes('like')) {
    likes = parseLikes(json)
  } else if (name.includes('bookmark')) {
    bookmarks = parseBookmarks(json)
  } else {
    errors.push({ file: file.name, message: 'Unrecognized JSON file type' })
  }

  return {
    data: { profile, posts, likes, bookmarks, mediaItems: [], mediaUrls: {} },
    errors,
  }
}
