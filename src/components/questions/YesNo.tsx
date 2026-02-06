import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface YesNoProps {
  value: boolean | undefined;
  onChange: (value: boolean) => void;
}

const YesNo: React.FC<YesNoProps> = ({ value, onChange }) => {
  return (
    <div className='flex gap-4 justify-center'>
      <motion.button
        type='button'
        onClick={() => onChange(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-3 px-8 py-6 rounded-xl border-2 transition-all duration-200 ${
          value === false
            ? 'border-red-500 bg-red-50 dark:bg-red-950'
            : 'border-border hover:border-red-300'
        }`}>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            value === false ? 'bg-red-500' : 'bg-secondary'
          }`}>
          <X
            className={`w-6 h-6 ${
              value === false ? 'text-white' : 'text-muted-foreground'
            }`}
          />
        </div>
        <span className='text-lg font-semibold'>No</span>
      </motion.button>

      <motion.button
        type='button'
        onClick={() => onChange(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-3 px-8 py-6 rounded-xl border-2 transition-all duration-200 ${
          value === true
            ? 'border-green-500 bg-green-50 dark:bg-green-950'
            : 'border-border hover:border-green-300'
        }`}>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            value === true ? 'bg-green-500' : 'bg-secondary'
          }`}>
          <Check
            className={`w-6 h-6 ${
              value === true ? 'text-white' : 'text-muted-foreground'
            }`}
          />
        </div>
        <span className='text-lg font-semibold'>Yes</span>
      </motion.button>
    </div>
  );
};

export default YesNo;
