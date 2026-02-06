import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = 'Type your answer...',
  multiline = false,
}) => {
  if (multiline) {
    return (
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='min-h-[150px] resize-none'
      />
    );
  }

  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className='text-lg'
    />
  );
};

export default TextInput;
