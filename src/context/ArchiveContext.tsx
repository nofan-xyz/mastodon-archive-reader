import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { ArchiveData, PageKey, FilterState, ParseError } from '@/types'
import { mockArchive } from '@/lib/mockData'
import { parseZipFile, parseJsonFile } from '@/lib/parser'

interface ArchiveContextValue {
  // Data
  archive: ArchiveData | null
  isLoading: boolean
  errors: ParseError[]
  // Navigation
  currentPage: PageKey
  setCurrentPage: (page: PageKey) => void
  // Import
  importFile: (file: File) => Promise<void>
  loadDemo: () => void
  reset: () => void
  // Filters
  filter: FilterState
  setFilter: (partial: Partial<FilterState>) => void
}

const defaultFilter: FilterState = {
  query: '',
  year: null,
  month: null,
  hasMedia: false,
  tag: null,
  sort: 'newest',
}

const ArchiveContext = createContext<ArchiveContextValue | null>(null)

export function ArchiveProvider({ children }: { children: ReactNode }) {
  const [archive, setArchive] = useState<ArchiveData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<ParseError[]>([])
  const [currentPage, setCurrentPage] = useState<PageKey>('overview')
  const [filter, setFilterState] = useState<FilterState>(defaultFilter)

  const importFile = useCallback(async (file: File) => {
    setIsLoading(true)
    setErrors([])
    try {
      const isZip = file.name.toLowerCase().endsWith('.zip')
      const result = isZip ? await parseZipFile(file) : await parseJsonFile(file)
      setArchive(result.data)
      setErrors(result.errors)
      setCurrentPage('overview')
    } catch (err) {
      setErrors([{ file: file.name, message: err instanceof Error ? err.message : 'Unknown error' }])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadDemo = useCallback(() => {
    setArchive(mockArchive)
    setErrors([])
    setCurrentPage('overview')
  }, [])

  const reset = useCallback(() => {
    setArchive(null)
    setErrors([])
    setFilterState(defaultFilter)
    setCurrentPage('overview')
  }, [])

  const setFilter = useCallback((partial: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...partial }))
  }, [])

  return (
    <ArchiveContext.Provider
      value={{
        archive,
        isLoading,
        errors,
        currentPage,
        setCurrentPage,
        importFile,
        loadDemo,
        reset,
        filter,
        setFilter,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  )
}

export function useArchive(): ArchiveContextValue {
  const ctx = useContext(ArchiveContext)
  if (!ctx) throw new Error('useArchive must be used within ArchiveProvider')
  return ctx
}
