import { useState, useRef, useCallback } from 'react'
import { useArchive } from '@/context/ArchiveContext'
import { useI18n } from '@/context/LanguageContext'
import { UploadIcon } from '@/components/ui/Icons'
import { Button } from '@/components/ui/Button'

export function UploadZone() {
  const { importFile, isLoading, loadDemo, errors } = useArchive()
  const { t } = useI18n()
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (file) importFile(file)
    },
    [importFile]
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) importFile(file)
    e.target.value = ''
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full max-w-2xl cursor-pointer transition-all duration-200
          border-[4px] border-dashed border-ink rounded-neo-lg
          ${isDragging ? 'bg-pink scale-[1.02] shadow-neo-lg' : 'bg-yellow shadow-neo'}
          p-10 md:p-14 text-center`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".zip,.json"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4">
          <div className={`w-20 h-20 flex items-center justify-center rounded-neo border-[3px] border-ink transition-transform duration-200 ${
            isDragging ? 'bg-white scale-110 animate-wiggle' : 'bg-white'
          }`}>
            <UploadIcon size={40} />
          </div>

          <div>
            <h3 className="font-display text-2xl md:text-3xl mb-2">
              {isLoading ? t('upload.parsing') : t('upload.dropHere')}
            </h3>
            <p className="font-body text-ink/70 text-base">
              {isLoading
                ? t('upload.extracting')
                : t('upload.dragDrop')}
            </p>
          </div>

          {!isLoading && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              <span className="font-mono text-xs text-ink/60">{t('upload.supports')}</span>
              <code className="font-mono text-xs px-2 py-0.5 bg-white border-[2px] border-ink rounded">.zip</code>
              <code className="font-mono text-xs px-2 py-0.5 bg-white border-[2px] border-ink rounded">.json</code>
            </div>
          )}
        </div>
      </div>

      {/* Error messages */}
      {errors.length > 0 && (
        <div className="w-full max-w-2xl space-y-2">
          {errors.map((err, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 bg-pink border-[3px] border-ink rounded-neo-sm shadow-neo-sm"
            >
              <span className="text-xl shrink-0">⚠️</span>
              <div>
                <p className="font-body font-bold text-sm">{err.file}</p>
                <p className="font-body text-sm text-ink/70">{err.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Demo button */}
      <div className="flex flex-col items-center gap-3">
        <p className="font-body text-ink/50 text-sm">{t('upload.noArchive')}</p>
        <Button variant="lime" size="md" onClick={loadDemo} disabled={isLoading}>
          ✨ {t('upload.demoData')}
        </Button>
      </div>
    </div>
  )
}
