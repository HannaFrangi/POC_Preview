import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FullscreenScaleRatingProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const FullscreenScaleRating: React.FC<FullscreenScaleRatingProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className='space-y-8'>
      <div className='flex justify-between text-base md:text-lg text-muted-foreground px-2'>
        <span className='font-medium'>Not likely</span>
        <span className='font-medium'>Very likely</span>
      </div>

      <div className='grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3'>
        {numbers.map((num) => {
          const isSelected = value === num;
          const isHovered = hoverValue === num;

          return (
            <motion.button
              key={num}
              type='button'
              onClick={() => onChange(num)}
              onMouseEnter={() => setHoverValue(num)}
              onMouseLeave={() => setHoverValue(null)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: num * 0.03 }}
              className={`aspect-square rounded-xl font-bold text-xl md:text-2xl transition-all duration-200 ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-xl scale-110 ring-4 ring-primary/30'
                  : isHovered
                    ? 'bg-primary/80 text-primary-foreground shadow-lg'
                    : 'bg-secondary hover:bg-secondary/80 hover:shadow-md'
              }`}>
              {num}
            </motion.button>
          );
        })}
      </div>

      {value !== undefined && value !== null && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center space-y-2'>
          <p className='text-2xl md:text-3xl font-bold'>{value}</p>
          <p className='text-sm md:text-base text-muted-foreground'>
            You selected {value} out of {max}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default FullscreenScaleRating;
