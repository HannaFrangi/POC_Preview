import { motion } from 'framer-motion';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function ReviewForm() {
  return (
    <div className='max-w-2xl mx-auto py-10 space-y-8 px-4'>
      <header className='text-center space-y-2'>
        <h1 className='text-3xl font-bold'>Product Review</h1>
        <p className='text-muted-foreground'>We value your feedback!</p>
      </header>

      {/* Q1: Star Rating */}
      <motion.div {...fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Overall Rating</CardTitle>
          </CardHeader>
          <CardContent className='flex gap-2'>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className='w-8 h-8 cursor-pointer hover:text-yellow-400 text-gray-300 transition-colors'
              />
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Q2: MCQ */}
      <motion.div {...fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>How did you hear about us?</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue='social'>
              {['Social Media', 'Friend', 'Advertisement', 'Other'].map(
                (opt) => (
                  <div key={opt} className='flex items-center space-x-2 py-1'>
                    <RadioGroupItem value={opt.toLowerCase()} id={opt} />
                    <Label htmlFor={opt}>{opt}</Label>
                  </div>
                ),
              )}
            </RadioGroup>
          </CardContent>
        </Card>
      </motion.div>

      {/* Q3: Yes/No (Thumbs) */}
      <motion.div {...fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Would you recommend us?</CardTitle>
          </CardHeader>
          <CardContent className='flex gap-4'>
            <Button variant='outline' className='flex-1 gap-2'>
              <ThumbsUp className='w-4 h-4' /> Yes
            </Button>
            <Button variant='outline' className='flex-1 gap-2'>
              <ThumbsDown className='w-4 h-4' /> No
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Q4: Text Area */}
      <motion.div {...fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>What can we improve?</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder='Tell us your thoughts...' />
          </CardContent>
        </Card>
      </motion.div>

      <Button className='w-full size-lg text-lg'>Submit Review</Button>
    </div>
  );
}
