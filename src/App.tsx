import { ArchiveProvider, useArchive } from '@/context/ArchiveContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { ImportPage } from '@/pages/ImportPage'
import { OverviewPage } from '@/pages/OverviewPage'
import { PostsPage } from '@/pages/PostsPage'
import { MediaPage } from '@/pages/MediaPage'
import { LikesPage } from '@/pages/LikesPage'
import { BookmarksPage } from '@/pages/BookmarksPage'
import { SearchPage } from '@/pages/SearchPage'

function AppContent() {
  const { archive, currentPage } = useArchive()

  // No archive loaded → show import page (full screen)
  if (!archive) {
    return <ImportPage />
  }

  // Archive loaded → show main app shell
  return (
    <div className="h-screen flex flex-col bg-cream overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto neo-scroll">
          {currentPage === 'overview' && <OverviewPage />}
          {currentPage === 'posts' && <PostsPage />}
          {currentPage === 'media' && <MediaPage />}
          {currentPage === 'likes' && <LikesPage />}
          {currentPage === 'bookmarks' && <BookmarksPage />}
          {currentPage === 'search' && <SearchPage />}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <ArchiveProvider>
        <AppContent />
      </ArchiveProvider>
    </LanguageProvider>
  )
}
