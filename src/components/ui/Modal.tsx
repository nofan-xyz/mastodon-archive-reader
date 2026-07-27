import { type ReactNode, useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, children, className = '' }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      onClick={onClose}
    >
      {/* Neo-Brutalism overlay: solid color blocks, not translucent black */}
      <div className="absolute inset-0 bg-ink/80" />

      <div
        className={`relative neo-card max-w-4xl max-h-[85vh] overflow-auto neo-scroll animate-pop-in ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center
                     bg-pink border-[3px] border-ink rounded-neo-sm shadow-neo-sm
                     font-display text-xl cursor-pointer
                     active:translate-x-[2px] active:translate-y-[2px] active:shadow-neo-none
                     transition-all duration-150"
          aria-label="Close"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
