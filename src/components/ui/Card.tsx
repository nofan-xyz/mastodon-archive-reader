import { type HTMLAttributes, type ReactNode } from 'react'

type CardColor = 'white' | 'pink' | 'yellow' | 'blue' | 'lime' | 'purple' | 'ink'

const colorClasses: Record<CardColor, string> = {
  white: 'bg-white text-ink',
  pink: 'bg-pink text-ink',
  yellow: 'bg-yellow text-ink',
  blue: 'bg-blue text-white',
  lime: 'bg-lime text-ink',
  purple: 'bg-purple text-white',
  ink: 'bg-ink text-cream',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  color?: CardColor
  hover?: boolean
  children: ReactNode
}

export function Card({
  color = 'white',
  hover = false,
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`neo-card ${colorClasses[color]} ${
        hover
          ? 'transition-all duration-150 hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px]'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
