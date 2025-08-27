import React from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from './Navigation'
import { ThemeToggle } from '../UI/ThemeToggle'

export const Header: React.FC = () => {
  return (
    <header className="bg-foreground border-b border-border shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 portal-loader"></div>
            <h1 className="text-2xl font-bold font-orbitron glitch-text text-primary group-hover:text-secondary transition-colors duration-300">
              Rick & Morty
            </h1>
          </Link>
          
          <Navigation />
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}