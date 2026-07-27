import { type ReactNode } from 'react'
import { Card } from '@/components/ui/Card'

type StatColor = 'lime' | 'blue' | 'pink' | 'purple' | 'yellow'

const colorClasses: Record<StatColor, string> = {
  lime: 'bg-lime',
  blue: 'bg-blue',
  pink: 'bg-pink',
  purple: 'bg-purple',
  yellow: 'bg-yellow',
}

const textColorClasses: Record<StatColor, string> = {
  lime: 'text-ink',
  blue: 'text-white',
  pink: 'text-ink',
  purple: 'text-white',
  yellow: 'text-ink',
}

interface StatCardProps {
  label: string
  value: string | number
  icon: ReactNode
  color: StatColor
}

export function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <Card color="white" hover className="p-5">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 shrink-0 flex items-center justify-center rounded-neo-sm border-[3px] border-ink shadow-neo-sm ${colorClasses[color]} ${textColorClasses[color]}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-display text-3xl leading-none">{value}</p>
          <p className="font-body text-sm text-ink/60 mt-1">{label}</p>
        </div>
      </div>
    </Card>
  )
}
