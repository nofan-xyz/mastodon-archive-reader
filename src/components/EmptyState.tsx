import { type ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  message?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 flex items-center justify-center bg-cream border-[3px] border-ink rounded-neo shadow-neo mb-5">
        {icon || <span className="text-4xl">📦</span>}
      </div>
      <h3 className="font-display text-2xl mb-2">{title}</h3>
      {message && (
        <p className="font-body text-ink/60 text-base max-w-md mb-6">{message}</p>
      )}
      {action}
    </div>
  )
}
