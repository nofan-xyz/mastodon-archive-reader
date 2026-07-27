import { type ButtonHTMLAttributes, type ReactNode } from 'react'

type Variant = 'pink' | 'yellow' | 'blue' | 'lime' | 'purple' | 'white' | 'ink'

const variantClasses: Record<Variant, string> = {
  pink: 'bg-pink text-ink',
  yellow: 'bg-yellow text-ink',
  blue: 'bg-blue text-white',
  lime: 'bg-lime text-ink',
  purple: 'bg-purple text-white',
  white: 'bg-white text-ink',
  ink: 'bg-ink text-cream',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({
  variant = 'white',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  }

  return (
    <button
      className={`neo-btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
