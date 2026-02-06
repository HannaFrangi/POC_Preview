import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
}

export function StarRating({ id, value, onChange }: StarRatingProps) {
  const handleClick = (index: number) => {
    onChange(index + 1);
  };

  return (
    <div className='flex space-x-1' key={id}>
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          type='button'
          onClick={() => handleClick(index)}
          className='focus:outline-none focus:ring-2 focus:ring-primary rounded-full'>
          <StarIcon
            className={cn(
              'w-8 h-8',
              index < value
                ? 'fill-primary text-primary'
                : 'text-muted-foreground',
            )}
          />
        </button>
      ))}
    </div>
  );
}
