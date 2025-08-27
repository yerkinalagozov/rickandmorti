import React from 'react'
import { motion } from 'framer-motion'
import { LocationCard } from './LocationCard'
import { PortalLoader } from '../common/UI/PortalLoader'
import type { Location } from '../../types/location'

interface LocationListProps {
  locations: Location[]
  loading?: boolean
  error?: string | null
}

export const LocationList: React.FC<LocationListProps> = ({
  locations,
  loading = false,
  error = null
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <PortalLoader size="lg" />
        <p className="mt-4 text-[rgb(var(--color-text-secondary))]">
          Scanning dimensions and realities...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🌌</div>
        <h3 className="text-xl font-semibold text-[rgb(var(--color-text))] mb-2">
          Portal Coordinates Lost!
        </h3>
        <p className="text-[rgb(var(--color-text-secondary))] text-center max-w-md">
          {error}
        </p>
      </div>
    )
  }

  if (locations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-[rgb(var(--color-text))] mb-2">
          No Locations Found
        </h3>
        <p className="text-[rgb(var(--color-text-secondary))] text-center max-w-md">
          Try adjusting your filters to discover locations from other dimensions.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {locations.map((location, index) => (
        <LocationCard
          key={location.id}
          location={location}
          index={index}
        />
      ))}
    </motion.div>
  )
}