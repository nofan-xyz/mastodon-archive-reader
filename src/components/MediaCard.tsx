import { useState } from 'react'
import type { MediaItem } from '@/types'
import { MediaModal } from '@/components/MediaModal'
import { ImageIcon, VideoIcon, LinkIcon } from '@/components/ui/Icons'

interface MediaCardProps {
  item: MediaItem
  index: number
}

// Deterministic gradient based on index for placeholder thumbnails
const gradients = [
  'from-pink/40 to-yellow/40',
  'from-blue/40 to-purple/40',
  'from-lime/40 to-pink/40',
  'from-yellow/40 to-blue/40',
  'from-purple/40 to-lime/40',
  'from-pink/40 to-blue/40',
]

const typeBadgeColors: Record<string, string> = {
  image: 'bg-pink',
  video: 'bg-blue text-white',
  gifv: 'bg-purple text-white',
  link: 'bg-lime',
  audio: 'bg-yellow',
}

export function MediaCard({ item, index }: MediaCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const gradient = gradients[index % gradients.length]
  const typeIcon = item.type === 'video' || item.type === 'gifv'
    ? <VideoIcon size={16} />
    : item.type === 'link'
    ? <LinkIcon size={16} />
    : <ImageIcon size={16} />

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`aspect-square overflow-hidden rounded-neo-sm border-[3px] border-ink shadow-neo
                     bg-gradient-to-br ${gradient}
                     hover:shadow-neo-none hover:translate-x-[4px] hover:translate-y-[4px]
                     transition-all duration-150 cursor-pointer
                     flex flex-col items-center justify-center gap-3 p-4 relative`}
      >
        {/* Type badge */}
        <span className={`absolute top-2 left-2 neo-badge text-xs px-2 py-0.5 ${typeBadgeColors[item.type] || 'bg-white'}`}>
          {typeIcon}
          {item.type.toUpperCase()}
        </span>

        {/* Thumbnail or placeholder */}
        {item.url && (item.type === 'image' || item.type === 'gifv') ? (
          <img src={item.url} alt={item.description || item.name || ''} className="w-full h-full object-cover absolute inset-0" />
        ) : (
          <div className="text-ink/30">
            {item.type === 'video' || item.type === 'gifv' ? (
              <VideoIcon size={48} />
            ) : item.type === 'link' ? (
              <LinkIcon size={48} />
            ) : (
              <ImageIcon size={48} />
            )}
          </div>
        )}

        {/* Filename */}
        {item.name && (
          <span className="absolute bottom-2 right-2 font-mono text-xs px-2 py-0.5 bg-white/80 border-[2px] border-ink rounded max-w-[80%] truncate">
            {item.name}
          </span>
        )}
      </button>

      {isOpen && <MediaModal attachment={item} onClose={() => setIsOpen(false)} />}
    </>
  )
}
