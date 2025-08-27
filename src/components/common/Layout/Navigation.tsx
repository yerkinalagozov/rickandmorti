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
              px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
              ${isActive
                ? 'text-primary bg-primary/10 shadow-glow'
                : 'text-textSecondary hover:text-secondary hover:bg-border hover:shadow-md'
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