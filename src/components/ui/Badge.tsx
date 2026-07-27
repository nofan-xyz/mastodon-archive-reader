import { type ReactNode } from 'react'

type BadgeColor = 'pink' | 'yellow' | 'blue' | 'lime' | 'purple' | 'white' | 'ink'

const colorClasses: Record<BadgeColor, string> = {
  pink: 'bg-pink text-ink',
  yellow: 'bg-yellow text-ink',
  blue: 'bg-blue text-white',
  lime: 'bg-lime text-ink',
  purple: 'bg-purple text-white',
  white: 'bg-white text-ink',
  ink: 'bg-ink text-cream',
}

interface BadgeProps {
  color?: BadgeColor
  children: ReactNode
  className?: string
}

export function Badge({ color = 'white', children, className = '' }: BadgeProps) {
  return (
    <span className={`neo-badge ${colorClasses[color]} ${className}`}>
      {children}
    </span>
  )
}
