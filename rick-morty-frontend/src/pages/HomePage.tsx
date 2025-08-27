import React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="portal-loader mx-auto mb-8"></div>
      
      <h1 className="text-5xl font-bold mb-6 glitch-text text-[rgb(var(--color-primary))]">
        Welcome to the Multiverse
      </h1>
      
      <p className="text-xl text-[rgb(var(--color-text-secondary))] mb-12 max-w-2xl mx-auto">
        Explore the vast Rick and Morty universe. Discover characters, episodes, and locations
        from across infinite dimensions.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Link
          to="/characters"
          className="p-6 bg-[rgb(var(--color-foreground))] rounded-lg border border-[rgb(var(--color-border))] hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="text-4xl mb-4">👨‍🔬</div>
          <h3 className="text-xl font-semibold mb-2">Characters</h3>
          <p className="text-[rgb(var(--color-text-secondary))]">
            Meet the crazy cast of characters from Rick's adventures
          </p>
        </Link>
        
        <Link
          to="/episodes"
          className="p-6 bg-[rgb(var(--color-foreground))] rounded-lg border border-[rgb(var(--color-border))] hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="text-4xl mb-4">📺</div>
          <h3 className="text-xl font-semibold mb-2">Episodes</h3>
          <p className="text-[rgb(var(--color-text-secondary))]">
            Browse through all the episodes and their details
          </p>
        </Link>
        
        <Link
          to="/locations"
          className="p-6 bg-[rgb(var(--color-foreground))] rounded-lg border border-[rgb(var(--color-border))] hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="text-xl font-semibold mb-2">Locations</h3>
          <p className="text-[rgb(var(--color-text-secondary))]">
            Discover planets and dimensions across the multiverse
          </p>
        </Link>
      </div>
      
      <div className="mt-12">
        <Link to="/characters" className="neon-button text-lg">
          Start Exploring
        </Link>
      </div>
    </div>
  )
}

export default HomePage