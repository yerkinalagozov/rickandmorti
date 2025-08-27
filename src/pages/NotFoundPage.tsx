import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="portal-loader mx-auto mb-8"></div>
      
      <h1 className="text-6xl font-bold mb-6 glitch-text text-[rgb(var(--color-primary))]">
        404
      </h1>
      
      <h2 className="text-2xl font-semibold mb-4">
        Looks like you're lost in the multiverse!
      </h2>
      
      <p className="text-[rgb(var(--color-text-secondary))] mb-8">
        This dimension doesn't exist... or maybe Rick destroyed it.
      </p>
      
      <Link to="/" className="neon-button">
        Return to Earth C-137
      </Link>
    </div>
  )
}

export default NotFoundPage