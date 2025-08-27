import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[rgb(var(--color-foreground))] border-t border-[rgb(var(--color-border))] mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-[rgb(var(--color-text-secondary))] text-sm">
            © 2024 Rick & Morty Explorer. Data from{' '}
            <a
              href="https://rickandmortyapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(var(--color-primary))] hover:underline"
            >
              Rick and Morty API
            </a>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-[rgb(var(--color-text-secondary))] text-sm">
              Made with ⚛️ React & 💚 by developers
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}