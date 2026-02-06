import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface MultipleChoiceProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className='space-y-3'>
      {options.map((option, index) => {
        const isSelected = value === option;

        return (
          <motion.button
            key={index}
            type='button'
            onClick={() => onChange(option)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              isSelected
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}>
            <div className='flex items-center justify-between'>
              <span className='font-medium'>{option}</span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className='w-6 h-6 rounded-full bg-primary flex items-center justify-center'>
                  <Check className='w-4 h-4 text-primary-foreground' />
                </motion.div>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default MultipleChoice;
