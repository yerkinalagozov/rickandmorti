import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../common/UI/Card'
import { Skeleton } from '../common/UI/Skeleton'

interface EpisodeCardSkeletonProps {
  index?: number
}

export const EpisodeCardSkeleton: React.FC<EpisodeCardSkeletonProps> = ({ 
  index = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Card className="h-full p-6">
        <div className="flex items-start space-x-4">
          {/* Episode Number Circle */}
          <div className="flex-shrink-0">
            <Skeleton 
              width="60px" 
              height="60px" 
              variant="circular" 
              animation="portal"
            />
          </div>
          
          <div className="flex-1 space-y-3">
            {/* Episode Title */}
            <Skeleton 
              height="24px" 
              width="80%" 
              variant="text" 
              animation="portal"
            />
            
            {/* Episode Code */}
            <Skeleton 
              height="16px" 
              width="40%" 
              variant="text" 
              animation="pulse"
            />
            
            {/* Air Date */}
            <div className="flex items-center space-x-2">
              <Skeleton width="16px" height="16px" variant="circular" animation="pulse" />
              <Skeleton width="120px" height="16px" variant="text" animation="portal" />
            </div>
            
            {/* Characters Count */}
            <div className="flex items-center space-x-2">
              <Skeleton width="16px" height="16px" variant="circular" animation="pulse" />
              <Skeleton width="100px" height="16px" variant="text" animation="portal" />
            </div>
          </div>
          
          {/* Arrow Skeleton */}
          <div className="flex-shrink-0">
            <Skeleton width="16px" height="16px" variant="text" animation="pulse" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}