import { type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export function Input({ className = '', icon, ...props }: InputProps) {
  if (icon) {
    return (
      <div className="relative w-full">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/50 pointer-events-none">
          {icon}
        </span>
        <input
          className={`neo-input pl-12 ${className}`}
          {...props}
        />
      </div>
    )
  }

  return <input className={`neo-input ${className}`} {...props} />
}
