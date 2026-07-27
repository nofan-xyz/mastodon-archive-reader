import type { MediaItem } from '@/types'
import { Modal } from '@/components/ui/Modal'
import { ImageIcon, VideoIcon, LinkIcon } from '@/components/ui/Icons'

interface MediaModalProps {
  attachment: MediaItem
  onClose: () => void
}

export function MediaModal({ attachment, onClose }: MediaModalProps) {
  return (
    <Modal isOpen={true} onClose={onClose} className="p-0 overflow-hidden">
      <div className="bg-ink p-4">
        {attachment.type === 'image' || attachment.type === 'gifv' ? (
          attachment.url ? (
            <img
              src={attachment.url}
              alt={attachment.description || attachment.name || ''}
              className="w-full max-h-[70vh] object-contain"
            />
          ) : (
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-pink/30 via-yellow/30 to-blue/30">
              <ImageIcon size={64} className="text-cream/30" />
            </div>
          )
        ) : attachment.type === 'video' ? (
          attachment.url ? (
            <video src={attachment.url} controls preload="auto" className="w-full max-h-[70vh]" />
          ) : (
            <div className="aspect-video flex items-center justify-center">
              <VideoIcon size={64} className="text-cream/30" />
            </div>
          )
        ) : (
          <div className="aspect-video flex items-center justify-center">
            <LinkIcon size={64} className="text-cream/30" />
          </div>
        )}
      </div>

      {/* Info bar */}
      <div className="p-4 bg-cream">
        {attachment.name && (
          <p className="font-mono text-sm font-bold break-all">{attachment.name}</p>
        )}
        {attachment.description && (
          <p className="font-body text-sm text-ink/70 mt-1">{attachment.description}</p>
        )}
        {attachment.url && (
          <p className="font-mono text-xs text-ink/40 mt-2 break-all">{attachment.url}</p>
        )}
        {attachment.width && attachment.height && (
          <p className="font-mono text-xs text-ink/40 mt-1">
            {attachment.width} × {attachment.height}px
          </p>
        )}
      </div>
    </Modal>
  )
}
