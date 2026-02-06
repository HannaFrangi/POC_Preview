import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  max = 5,
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex gap-2'>
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
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className='focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1'>
              <Star
                className={`w-12 h-12 transition-colors duration-200 ${
                  isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            </motion.button>
          );
        })}
      </div>

      {value > 0 && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-sm text-muted-foreground'>
          {value} out of {max} stars
        </motion.p>
      )}
    </div>
  );
};

export default StarRating;
