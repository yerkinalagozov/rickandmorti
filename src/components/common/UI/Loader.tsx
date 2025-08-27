import React from 'react'
import { motion } from 'framer-motion'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'portal' | 'spinner' | 'dots' | 'rick'
  message?: string
  className?: string
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  variant = 'portal',
  message,
  className = ''
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6'
      case 'md':
        return 'w-12 h-12'
      case 'lg':
        return 'w-20 h-20'
      case 'xl':
        return 'w-32 h-32'
      default:
        return 'w-12 h-12'
    }
  }

  const renderLoader = () => {
    switch (variant) {
      case 'portal':
        return (
          <div className={`${getSizeClasses()} portal-loader mx-auto`} />
        )

      case 'spinner':
        return (
          <motion.div
            className={`${getSizeClasses()} border-4 border-border border-t-primary rounded-full mx-auto`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )

      case 'dots':
        return (
          <div className="flex space-x-2 mx-auto">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            ))}
          </div>
        )

      case 'rick':
        return (
          <motion.div className="mx-auto relative">
            {/* Rick's Portal Gun Laser */}
            <motion.div
              className={`${getSizeClasses()} relative`}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-secondary" />
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-accent border-l-pink" />
            </motion.div>
            
            {/* Center Portal */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1,
                repeat: Infinity
              }}
            />
          </motion.div>
        )

      default:
        return <div className={`${getSizeClasses()} portal-loader mx-auto`} />
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      {renderLoader()}
      
      {message && (
        <motion.p
          className="mt-4 text-textSecondary text-center font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  )
}