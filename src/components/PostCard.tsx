import type { Post } from '@/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MediaModal } from '@/components/MediaModal'
import { useState } from 'react'
import { formatDate, formatCount, relativeTime } from '@/lib/utils'
import { useI18n } from '@/context/LanguageContext'
import {
  ChatIcon,
  RepeatIcon,
  HeartIcon,
  LinkIcon,
} from '@/components/ui/Icons'

interface PostCardProps {
  post: Post
  displayName?: string
  username?: string
  avatarColor?: string
}

export function PostCard({ post, displayName = 'Archive User', username = 'user', avatarColor = '#FF6EC7' }: PostCardProps) {
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null)
  const { t } = useI18n()

  const isAnnounce = post.type === 'Announce'
  const hasMedia = post.attachments.length > 0
  const imageAttachments = post.attachments.filter((a) => a.type === 'image' || a.type === 'gifv')
  const videoAttachments = post.attachments.filter((a) => a.type === 'video')
  const linkAttachments = post.attachments.filter((a) => a.type === 'link')

  return (
    <>
      <Card hover className="p-5">
        {/* Author header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-neo-sm border-[3px] border-ink shadow-neo-sm font-display text-sm"
            style={{ backgroundColor: avatarColor }}
          >
            {displayName.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-body font-bold text-base truncate">{displayName}</span>
              {isAnnounce && (
                <Badge color="blue" className="text-xs">
                  <RepeatIcon size={12} /> {t('post.boosted')}
                </Badge>
              )}
            </div>
            <span className="font-mono text-xs text-ink/50">@{username}</span>
          </div>
          <time className="font-mono text-xs text-ink/50 shrink-0" title={formatDate(post.published)}>
            {relativeTime(post.published)}
          </time>
        </div>

        {/* Content warning / summary */}
        {post.summary && (
          <div className="mb-3 p-3 bg-yellow/30 border-[3px] border-ink rounded-neo-sm">
            <p className="font-body font-bold text-sm">⚠️ {post.summary}</p>
          </div>
        )}

        {/* Content */}
        {post.contentHtml ? (
          <div
            className="font-body text-base leading-relaxed prose-custom"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        ) : (
          <p className="font-body text-base leading-relaxed">{post.content}</p>
        )}

        {/* Hashtags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <Badge key={tag} color="lime" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Media previews */}
        {imageAttachments.length > 0 && (
          <div className={`grid gap-2 mt-4 ${imageAttachments.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {imageAttachments.map((att, i) => (
              <button
                key={i}
                onClick={() => setSelectedMedia(i)}
                className="aspect-square overflow-hidden rounded-neo-sm border-[3px] border-ink shadow-neo-sm
                           bg-gradient-to-br from-pink/40 via-yellow/40 to-blue/40
                           hover:shadow-neo-none hover:translate-x-[2px] hover:translate-y-[2px]
                           transition-all duration-150 cursor-pointer
                           flex items-center justify-center"
              >
                {att.url ? (
                  <img src={att.url} alt={att.description || att.name || ''} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <p className="font-mono text-xs text-ink/50">{att.name || 'image'}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Video previews */}
        {videoAttachments.length > 0 && (
          <div className="grid gap-2 mt-4">
            {videoAttachments.map((att, i) => (
              <div key={i} className="rounded-neo-sm border-[3px] border-ink shadow-neo-sm overflow-hidden bg-ink">
                {att.url ? (
                  <video src={att.url} controls className="w-full max-h-80" />
                ) : (
                  <div className="aspect-video flex items-center justify-center">
                    <p className="font-mono text-xs text-cream/50">{att.name || 'video'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Link cards */}
        {linkAttachments.length > 0 && (
          <div className="space-y-2 mt-4">
            {linkAttachments.map((att, i) => (
              <a
                key={i}
                href={att.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-cream border-[3px] border-ink rounded-neo-sm shadow-neo-sm
                           hover:shadow-neo-none hover:translate-x-[2px] hover:translate-y-[2px]
                           transition-all duration-150"
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-blue border-[3px] border-ink rounded-neo-sm text-white">
                  <LinkIcon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-bold text-sm truncate">{att.name || att.url}</p>
                  <p className="font-mono text-xs text-ink/50 truncate">{att.url}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Interaction footer */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t-[2px] border-ink/10">
          <div className="flex items-center gap-1.5 font-mono text-sm text-ink/60">
            <ChatIcon size={16} />
            {formatCount(post.repliesCount)}
          </div>
          <div className="flex items-center gap-1.5 font-mono text-sm text-ink/60">
            <RepeatIcon size={16} />
            {formatCount(post.reblogsCount)}
          </div>
          <div className="flex items-center gap-1.5 font-mono text-sm text-ink/60">
            <HeartIcon size={16} />
            {formatCount(post.favouritesCount)}
          </div>
          {post.url && (
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto font-mono text-xs text-ink/40 hover:text-blue"
            >
              {formatDate(post.published)}
            </a>
          )}
        </div>
      </Card>

      {/* Media viewer modal */}
      {selectedMedia !== null && imageAttachments[selectedMedia] && (
        <MediaModal
          attachment={imageAttachments[selectedMedia]}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </>
  )
}
