import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface FullscreenStarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

const FullscreenStarRating: React.FC<FullscreenStarRatingProps> = ({
  value,
  onChange,
  max = 5,
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const labels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='flex gap-3 md:gap-4'>
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= (hoverValue || value);

          return (
            <motion.button
              key={index}
              type='button'
              onClick={() => onChange(starValue)}
              onMouseEnter={() => setHoverValue(starValue)}
              onMouseLeave={() => setHoverValue(0)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className='focus:outline-none focus:ring-4 focus:ring-yellow-400/50 rounded-full p-2 transition-all'>
              <Star
                className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 transition-all duration-200 ${
                  isFilled
                    ? 'fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500 drop-shadow-lg'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            </motion.button>
          );
        })}
      </div>

      <div className='min-h-18 flex flex-col items-center justify-center text-center'>
        {(hoverValue || value) > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='space-y-2'>
            <p className='text-2xl font-semibold'>
              {labels[(hoverValue || value) - 1]}
            </p>
            <p className='text-sm text-muted-foreground'>
              {hoverValue || value} out of {max} stars
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FullscreenStarRating;
