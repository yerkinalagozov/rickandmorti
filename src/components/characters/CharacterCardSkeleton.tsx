import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../common/UI/Card'
import { Skeleton } from '../common/UI/Skeleton'

interface CharacterCardSkeletonProps {
  index?: number
}

export const CharacterCardSkeleton: React.FC<CharacterCardSkeletonProps> = ({ 
  index = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Card className="h-full overflow-hidden">
        <div className="relative">
          {/* Image Skeleton */}
          <Skeleton 
            height="192px" 
            variant="rectangular" 
            animation="portal"
            className="w-full"
          />
          
          {/* Favorite Button Skeleton */}
          <div className="absolute top-2 right-2">
            <Skeleton 
              width="32px" 
              height="32px" 
              variant="circular" 
              animation="pulse"
            />
          </div>
          
          {/* Status Badge Skeleton */}
          <div className="absolute bottom-2 left-2">
            <Skeleton 
              width="80px" 
              height="24px" 
              variant="rounded" 
              animation="pulse"
            />
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          {/* Character Name */}
          <Skeleton 
            height="24px" 
            width="70%" 
            variant="text" 
            animation="portal"
          />
          
          {/* Character Details */}
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Skeleton width="60px" height="16px" variant="text" animation="pulse" />
              <Skeleton width="40%" height="16px" variant="text" animation="portal" />
            </div>
            
            <div className="flex space-x-2">
              <Skeleton width="50px" height="16px" variant="text" animation="pulse" />
              <Skeleton width="35%" height="16px" variant="text" animation="portal" />
            </div>
            
            <div className="flex space-x-2">
              <Skeleton width="45px" height="16px" variant="text" animation="pulse" />
              <Skeleton width="50%" height="16px" variant="text" animation="portal" />
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="flex justify-between items-center pt-2">
            <Skeleton width="60px" height="12px" variant="text" animation="pulse" />
            <Skeleton width="16px" height="16px" variant="text" animation="pulse" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}