import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/characters', label: 'Characters' },
  { path: '/episodes', label: 'Episodes' },
  { path: '/locations', label: 'Locations' },
  { path: '/search', label: 'Search' },
]

export const Navigation: React.FC = () => {
  const location = useLocation()

  return (
    <nav className="hidden md:flex space-x-8">
      {navItems.map(({ path, label }) => {
        const isActive = location.pathname === path
        
        return (
          <Link
            key={path}
            to={path}
            className={`
              px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${isActive
                ? 'text-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/10'
                : 'text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))] hover:bg-[rgb(var(--color-border))]'
              }
            `}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}