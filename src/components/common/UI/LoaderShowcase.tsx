import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from './Card'
import { Loader } from './Loader'
import { Skeleton } from './Skeleton'
import { CharacterCardSkeleton } from '../../characters/CharacterCardSkeleton'
import { EpisodeCardSkeleton } from '../../episodes/EpisodeCardSkeleton'
import { LocationCardSkeleton } from '../../locations/LocationCardSkeleton'
import { SearchLoader } from '../../search/SearchLoader'
import { PageLoader } from './PageLoader'
import { Button } from './Button'

export const LoaderShowcase: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const loaderVariants = [
    { key: 'portal', name: 'Portal Loader' },
    { key: 'spinner', name: 'Spinner' },
    { key: 'dots', name: 'Dots' },
    { key: 'rick', name: 'Rick\'s Portal Gun' }
  ]

  const skeletonVariants = [
    { key: 'text', name: 'Text Skeleton' },
    { key: 'circular', name: 'Circular Skeleton' },
    { key: 'rectangular', name: 'Rectangular Skeleton' },
    { key: 'rounded', name: 'Rounded Skeleton' }
  ]

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-text glitch-text mb-2">
          Loader Showcase
        </h1>
        <p className="text-textSecondary">
          Rick & Morty themed loading components and skeletons
        </p>
      </div>

      {/* Basic Loaders */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-text">Basic Loaders</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loaderVariants.map((variant) => (
            <div key={variant.key} className="text-center space-y-3">
              <h3 className="text-sm font-medium text-textSecondary">
                {variant.name}
              </h3>
              <Loader variant={variant.key as any} size="md" />
            </div>
          ))}
        </div>
      </Card>

      {/* Skeleton Components */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-text">Skeleton Variants</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skeletonVariants.map((variant) => (
            <div key={variant.key} className="space-y-3">
              <h3 className="text-sm font-medium text-textSecondary text-center">
                {variant.name}
              </h3>
              <div className="space-y-2">
                <Skeleton 
                  variant={variant.key as any} 
                  width="100%" 
                  height={variant.key === 'circular' ? '48px' : '16px'} 
                />
                {variant.key === 'text' && (
                  <>
                    <Skeleton variant="text" width="80%" height="14px" />
                    <Skeleton variant="text" width="60%" height="14px" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Card Skeletons */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-text">Card Skeletons</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-textSecondary mb-3">Character Card</h3>
            <div className="max-w-xs">
              <CharacterCardSkeleton />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-textSecondary mb-3">Episode Card</h3>
            <div className="max-w-md">
              <EpisodeCardSkeleton />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-textSecondary mb-3">Location Card</h3>
            <div className="max-w-sm">
              <LocationCardSkeleton />
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive Demos */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-text">Interactive Demos</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setActiveDemo('search')}
              variant={activeDemo === 'search' ? 'primary' : 'outline'}
            >
              Search Loader
            </Button>
            <Button
              onClick={() => setActiveDemo('page')}
              variant={activeDemo === 'page' ? 'primary' : 'outline'}
            >
              Page Loader
            </Button>
            <Button
              onClick={() => setActiveDemo(null)}
              variant="ghost"
            >
              Clear Demo
            </Button>
          </div>

          <motion.div
            className="min-h-[200px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={activeDemo}
          >
            {activeDemo === 'search' && (
              <SearchLoader query="Rick Sanchez" type="characters" />
            )}
            {activeDemo === 'page' && (
              <PageLoader 
                title="Loading Dimension Data" 
                subtitle="Calibrating portal coordinates..." 
                variant="rick"
              />
            )}
            {!activeDemo && (
              <div className="flex items-center justify-center h-48 text-textSecondary">
                Select a demo to see it in action
              </div>
            )}
          </motion.div>
        </div>
      </Card>
    </div>
  )
}