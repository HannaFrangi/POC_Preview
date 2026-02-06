// components/ui/star-rating.tsx
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  maxStars?: number;
  disabled?: boolean;
}

export function StarRating({
  value,
  onChange,
  maxStars = 5,
  disabled = false,
}: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className='flex gap-1'>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <motion.button
            key={index}
            type='button'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => !disabled && onChange(starValue)}
            onMouseEnter={() => !disabled && setHover(starValue)}
            onMouseLeave={() => !disabled && setHover(0)}
            className={cn(
              'p-1 transition-colors',
              disabled && 'cursor-not-allowed opacity-50',
            )}
            aria-label={`Rate ${starValue} out of ${maxStars}`}>
            <Star
              className={cn(
                'h-8 w-8',
                starValue <= (hover || value)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200',
              )}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
