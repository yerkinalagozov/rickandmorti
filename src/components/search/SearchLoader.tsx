import React from 'react'
import { motion } from 'framer-motion'
import { Loader } from '../common/UI/Loader'

interface SearchLoaderProps {
  query?: string
  type?: 'characters' | 'episodes' | 'locations' | 'all'
}

export const SearchLoader: React.FC<SearchLoaderProps> = ({
  query,
  type = 'all'
}) => {
  const getSearchMessage = () => {
    if (query) {
      switch (type) {
        case 'characters':
          return `Searching for characters: "${query}"`
        case 'episodes':
          return `Searching for episodes: "${query}"`
        case 'locations':
          return `Searching for locations: "${query}"`
        default:
          return `Searching multiverse for: "${query}"`
      }
    }
    return 'Scanning the multiverse...'
  }

  const getSearchIcon = () => {
    switch (type) {
      case 'characters':
        return '👨‍🔬'
      case 'episodes':
        return '📺'
      case 'locations':
        return '🌍'
      default:
        return '🔍'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Portal Scanner */}
      <div className="relative mb-6">
        <Loader variant="portal" size="lg" />
        
        {/* Scanning Rings */}
        <motion.div
          className="absolute inset-0 border-2 border-primary/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute inset-0 border-2 border-secondary/30 rounded-full"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Search Info */}
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-center space-x-2 text-2xl mb-2">
          <motion.span
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            {getSearchIcon()}
          </motion.span>
          <span className="text-xl">🔍</span>
        </div>
        
        <h3 className="text-lg font-medium text-text">
          {getSearchMessage()}
        </h3>
        
        <p className="text-sm text-textSecondary max-w-md">
          Traversing infinite dimensions to find the perfect match...
        </p>
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-1 mt-4">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                y: [-4, 0, -4],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}