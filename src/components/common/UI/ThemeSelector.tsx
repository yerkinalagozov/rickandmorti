import React from 'react'
import { motion } from 'framer-motion'
import { useThemeStore } from '../../../store/useThemeStore'
import { Card } from './Card'

export const ThemeSelector: React.FC = () => {
  const { theme, actualTheme, setTheme } = useThemeStore()
  
  const themeOptions = [
    {
      value: 'light' as const,
      label: 'Light',
      description: 'Rick\'s Lab - Bright scientific environment',
      icon: '☀️',
      preview: 'bg-gradient-to-br from-slate-100 to-blue-50 border-2 border-blue-200'
    },
    {
      value: 'dark' as const,
      label: 'Dark', 
      description: 'Space Dimension - Deep cosmic themes',
      icon: '🌙',
      preview: 'bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-primary'
    },
    {
      value: 'system' as const,
      label: 'System',
      description: 'Auto-detect based on your device settings',
      icon: '⚙️',
      preview: 'bg-gradient-to-br from-slate-400 to-slate-600 border-2 border-secondary'
    }
  ]

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text mb-2">Theme Preferences</h3>
        <p className="text-sm text-textSecondary">
          Choose your preferred theme or let the system decide
        </p>
        {theme === 'system' && (
          <p className="text-xs text-secondary mt-1">
            Currently using: {actualTheme} (detected from system)
          </p>
        )}
      </div>

      <div className="grid gap-3">
        {themeOptions.map((option) => (
          <motion.button
            key={option.value}
            className={`
              relative p-4 rounded-lg border-2 text-left transition-all duration-300
              ${theme === option.value 
                ? 'border-primary shadow-glow bg-primary/5' 
                : 'border-border hover:border-secondary hover:shadow-md'
              }
            `}
            onClick={() => setTheme(option.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start space-x-4">
              {/* Theme Preview */}
              <div 
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${option.preview}`}
              >
                {option.icon}
              </div>
              
              {/* Theme Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className={`font-medium ${theme === option.value ? 'text-primary' : 'text-text'}`}>
                    {option.label}
                  </h4>
                  {theme === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                  )}
                </div>
                <p className="text-sm text-textSecondary mt-1">
                  {option.description}
                </p>
              </div>
            </div>

            {/* Selection indicator */}
            {theme === option.value && (
              <motion.div
                layoutId="theme-selection"
                className="absolute inset-0 rounded-lg border-2 border-primary bg-primary/10"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>
      
      {/* Theme transition preview */}
      <div className="mt-6 p-3 rounded-lg bg-border/50">
        <div className="flex items-center space-x-2 text-xs text-textSecondary">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          <span>Theme changes are saved automatically and sync across tabs</span>
        </div>
      </div>
    </Card>
  )
}