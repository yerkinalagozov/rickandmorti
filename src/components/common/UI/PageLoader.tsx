import React from 'react'
import { motion } from 'framer-motion'
import { Loader } from './Loader'

interface PageLoaderProps {
  title?: string
  subtitle?: string
  variant?: 'portal' | 'spinner' | 'dots' | 'rick'
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  title = "Loading...",
  subtitle = "Please wait while we traverse the multiverse",
  variant = 'portal'
}) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      {/* Background Portal Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <div className="portal-loading w-full h-full" />
      </motion.div>

      {/* Main Loader */}
      <div className="relative z-10">
        <Loader variant={variant} size="xl" />
        
        {/* Loading Text */}
        <motion.div
          className="text-center mt-8 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-text">
            {title}
          </h2>
          <p className="text-textSecondary max-w-md mx-auto">
            {subtitle}
          </p>
          
          {/* Progress Dots */}
          <div className="flex justify-center space-x-1 mt-6">
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-primary rounded-full opacity-30"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.1
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}