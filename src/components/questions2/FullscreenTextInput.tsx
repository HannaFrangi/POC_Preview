import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FullscreenTextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  autoFocus?: boolean;
}

const FullscreenTextInput: React.FC<FullscreenTextInputProps> = ({
  value,
  onChange,
  placeholder = 'Type your answer...',
  multiline = false,
  autoFocus = true,
}) => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      // Small delay to ensure smooth animation
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [autoFocus]);

  if (multiline) {
    return (
      <Textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='min-h-[200px] text-lg md:text-xl resize-none border-2 focus:border-primary transition-all'
      />
    );
  }

  return (
    <Input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className='text-xl md:text-2xl h-14 md:h-16 border-2 focus:border-primary transition-all'
    />
  );
};

export default FullscreenTextInput;
