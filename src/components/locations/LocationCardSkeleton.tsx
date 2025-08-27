import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../common/UI/Card'
import { Skeleton } from '../common/UI/Skeleton'

interface LocationCardSkeletonProps {
  index?: number
}

export const LocationCardSkeleton: React.FC<LocationCardSkeletonProps> = ({ 
  index = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Card className="h-full p-6">
        <div className="space-y-4">
          {/* Location Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Location Name */}
              <Skeleton 
                height="28px" 
                width="75%" 
                variant="text" 
                animation="portal"
              />
              
              {/* Type and Dimension */}
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Skeleton width="40px" height="16px" variant="text" animation="pulse" />
                  <Skeleton width="60%" height="16px" variant="text" animation="portal" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Skeleton width="65px" height="16px" variant="text" animation="pulse" />
                  <Skeleton width="45%" height="16px" variant="text" animation="portal" />
                </div>
              </div>
            </div>
            
            {/* Planet Icon Skeleton */}
            <Skeleton 
              width="32px" 
              height="32px" 
              variant="circular" 
              animation="pulse"
            />
          </div>
          
          {/* Residents Info */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Skeleton width="16px" height="16px" variant="circular" animation="pulse" />
                <Skeleton width="80px" height="16px" variant="text" animation="portal" />
              </div>
              
              <Skeleton width="16px" height="16px" variant="text" animation="pulse" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}