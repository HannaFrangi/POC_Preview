import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';

interface FullscreenMultipleChoiceProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const FullscreenMultipleChoice: React.FC<FullscreenMultipleChoiceProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className='space-y-3 md:space-y-4'>
      {options.map((option, index) => {
        const isSelected = value === option;
        const letter = String.fromCharCode(65 + index); // A, B, C, D...

        return (
          <motion.button
            key={index}
            type='button'
            onClick={() => onChange(option)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-4 md:p-6 rounded-xl border-2 text-left transition-all duration-200 group ${
              isSelected
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                : 'border-border hover:border-primary/50 hover:bg-accent/50'
            }`}>
            <div className='flex items-center gap-4'>
              {/* Letter badge */}
              <div
                className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-bold text-lg transition-all ${
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground group-hover:bg-primary/20'
                }`}>
                {letter}
              </div>

              {/* Option text */}
              <span className='flex-1 font-medium text-base md:text-lg'>
                {option}
              </span>

              {/* Selected indicator */}
              {isSelected ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className='flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center'>
                  <Check
                    className='w-5 h-5 text-primary-foreground'
                    strokeWidth={3}
                  />
                </motion.div>
              ) : (
                <ChevronRight className='w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity' />
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default FullscreenMultipleChoice;
