import React from 'react'
import { motion } from 'framer-motion'

interface PortalLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const PortalLoader: React.FC<PortalLoaderProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`portal-loader ${sizeClasses[size]}`}
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        }}
      />
    </div>
  )
}