import React from 'react';
import { motion } from 'framer-motion';

interface ScaleRatingProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const ScaleRating: React.FC<ScaleRatingProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className='space-y-6'>
      <div className='flex justify-between text-sm text-muted-foreground px-2'>
        <span>Not likely</span>
        <span>Very likely</span>
      </div>

      <div className='flex gap-2 flex-wrap justify-center'>
        {numbers.map((num) => {
          const isSelected = value === num;

          return (
            <motion.button
              key={num}
              type='button'
              onClick={() => onChange(num)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-lg font-semibold transition-all duration-200 ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}>
              {num}
            </motion.button>
          );
        })}
      </div>

      {value !== undefined && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center text-sm text-muted-foreground'>
          You selected: {value}
        </motion.p>
      )}
    </div>
  );
};

export default ScaleRating;
