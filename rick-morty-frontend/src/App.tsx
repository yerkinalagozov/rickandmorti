import { Toaster } from 'react-hot-toast'
import { Link, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useThemeStore } from './store/useThemeStore'
import { CharactersPage } from './pages/CharactersPage'
import { SearchPage } from './pages/SearchPage'
import { CharacterDetailPage } from './pages/CharacterDetailPage'

export default function App() {
  const theme = useThemeStore(s => s.theme)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-background text-text">
      <header className="sticky top-0 z-10 bg-foreground shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <img src="/portal.svg" alt="portal" className="w-6 h-6" />
          <h1 className="text-lg font-bold glitch-text">Rick & Morty Explorer</h1>
          <nav className="ml-auto flex gap-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/characters" className="hover:underline">Characters</Link>
            <Link to="/search" className="hover:underline">Search</Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster position="top-right" />
    </div>
  )
}

function Home() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Welcome!</h2>
      <p>Use the navigation to explore characters.</p>
      <a href="/characters" className="neon-button inline-block">Explore Characters</a>
    </div>
  )
}

function NotFound() {
  return <p>Not Found</p>
}
