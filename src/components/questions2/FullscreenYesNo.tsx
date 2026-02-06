import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface FullscreenYesNoProps {
  value: boolean | undefined;
  onChange: (value: boolean) => void;
}

const FullscreenYesNo: React.FC<FullscreenYesNoProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className='grid md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto'>
      {/* No button */}
      <motion.button
        type='button'
        onClick={() => onChange(false)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`flex flex-col items-center gap-4 p-8 md:p-12 rounded-2xl border-2 transition-all duration-300 ${
          value === false
            ? 'border-red-500 bg-red-50 dark:bg-red-950/50 shadow-xl shadow-red-500/20 ring-4 ring-red-500/20'
            : 'border-border hover:border-red-300 dark:hover:border-red-700 hover:shadow-lg'
        }`}>
        <div
          className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            value === false
              ? 'bg-red-500 scale-110'
              : 'bg-secondary group-hover:bg-red-100 dark:group-hover:bg-red-900'
          }`}>
          <X
            className={`w-10 h-10 md:w-12 md:h-12 transition-colors ${
              value === false ? 'text-white' : 'text-muted-foreground'
            }`}
            strokeWidth={3}
          />
        </div>
        <div className='text-center'>
          <span className='text-2xl md:text-3xl font-bold block mb-1'>No</span>
          {value === false && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-sm text-muted-foreground'>
              Selected
            </motion.span>
          )}
        </div>
      </motion.button>

      {/* Yes button */}
      <motion.button
        type='button'
        onClick={() => onChange(true)}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`flex flex-col items-center gap-4 p-8 md:p-12 rounded-2xl border-2 transition-all duration-300 ${
          value === true
            ? 'border-green-500 bg-green-50 dark:bg-green-950/50 shadow-xl shadow-green-500/20 ring-4 ring-green-500/20'
            : 'border-border hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg'
        }`}>
        <div
          className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            value === true
              ? 'bg-green-500 scale-110'
              : 'bg-secondary group-hover:bg-green-100 dark:group-hover:bg-green-900'
          }`}>
          <Check
            className={`w-10 h-10 md:w-12 md:h-12 transition-colors ${
              value === true ? 'text-white' : 'text-muted-foreground'
            }`}
            strokeWidth={3}
          />
        </div>
        <div className='text-center'>
          <span className='text-2xl md:text-3xl font-bold block mb-1'>Yes</span>
          {value === true && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-sm text-muted-foreground'>
              Selected
            </motion.span>
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default FullscreenYesNo;
