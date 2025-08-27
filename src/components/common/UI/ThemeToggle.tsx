import React from 'react'
import { motion } from 'framer-motion'
import { useThemeStore } from '../../../store/useThemeStore'

export const ThemeToggle: React.FC = () => {
  const { actualTheme, toggleTheme } = useThemeStore()
  
  return (
    <motion.button
      className="relative w-16 h-8 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300"
      style={{
        backgroundColor: actualTheme === 'light' ? 'rgb(var(--color-border))' : 'rgb(var(--color-primary))',
      }}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} theme`}
    >
      {/* Toggle Background Gradient */}
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          actualTheme === 'dark' 
            ? 'bg-gradient-to-r from-primary via-secondary to-accent' 
            : 'bg-gradient-to-r from-border to-textSecondary'
        }`}
      />
      
      {/* Toggle Circle */}
      <motion.div
        className={`relative z-10 w-6 h-6 rounded-full shadow-lg flex items-center justify-center text-sm transition-all duration-300 ${
          actualTheme === 'light' ? 'bg-foreground' : 'bg-background'
        }`}
        animate={{
          x: actualTheme === 'light' ? 0 : 32,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <motion.span
          key={actualTheme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={actualTheme === 'light' ? 'text-accent' : 'text-primary'}
        >
          {actualTheme === 'light' ? '☀️' : '🌙'}
        </motion.span>
      </motion.div>
      
      {/* Glow Effect */}
      {actualTheme === 'dark' && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: 'var(--shadow-portal)',
            opacity: 0.6,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  )
}