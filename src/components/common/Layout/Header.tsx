import React from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from './Navigation'
import { Button } from '../UI/Button'
import { useThemeStore } from '../../../store/useThemeStore'

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <header className="bg-[rgb(var(--color-foreground))] border-b border-[rgb(var(--color-border))] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 portal-loader"></div>
            <h1 className="text-2xl font-bold glitch-text text-[rgb(var(--color-primary))]">
              Rick & Morty
            </h1>
          </Link>
          
          <Navigation />
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}