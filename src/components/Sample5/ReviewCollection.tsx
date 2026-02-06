// components/review-collection.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from './StarRating';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    type: 'starRating',
    question: 'How would you rate your overall experience?',
    required: true,
  },
  {
    id: 2,
    type: 'multipleChoice',
    question: 'Which aspect did you like the most?',
    options: ['Ease of Use', 'Design', 'Features', 'Performance', 'Support'],
    required: true,
  },
  {
    id: 3,
    type: 'yesNo',
    question: 'Would you recommend us to others?',
    required: true,
  },
  {
    id: 4,
    type: 'multipleChoice',
    question: 'How often do you use our product?',
    options: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'First Time'],
    required: true,
  },
  {
    id: 5,
    type: 'textInput',
    question: 'Any additional feedback or suggestions? (Optional)',
    required: false,
  },
];

type ReviewAnswers = {
  [key: number]: string | number | boolean | null;
};

export function ReviewCollection() {
  const [answers, setAnswers] = useState<ReviewAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (
    questionId: number,
    value: string | number | boolean,
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate required questions
    const missingRequired = QUESTIONS.filter(
      (q) =>
        q.required &&
        (answers[q.id] === undefined ||
          answers[q.id] === null ||
          answers[q.id] === ''),
    );

    if (missingRequired.length > 0) {
      toast.error('Missing required fields', {
        description: `Please answer: ${missingRequired.map((q) => q.question).join(', ')}`,
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Review submitted:', answers);
      setIsSubmitting(false);
      setIsSubmitted(true);

      toast.success('Thank you for your feedback!', {
        description: 'Your review has been submitted successfully.',
      });
    }, 1500);
  };

  const resetForm = () => {
    setAnswers({});
    setIsSubmitted(false);
  };

  return (
    <AnimatePresence mode='wait'>
      {isSubmitted ? (
        <motion.div
          key='success'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}>
          <Card className='w-full max-w-2xl mx-auto'>
            <CardHeader>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className='mx-auto mb-4'>
                <CheckCircle2 className='h-16 w-16 text-green-500' />
              </motion.div>
              <CardTitle className='text-center text-2xl'>
                Thank You! 🎉
              </CardTitle>
              <CardDescription className='text-center'>
                Your feedback helps us improve our service.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='text-center text-muted-foreground'>
                <p>
                  We appreciate you taking the time to share your experience.
                </p>
                <p>Your review has been recorded successfully.</p>
              </div>
              <div className='bg-muted p-4 rounded-lg'>
                <h4 className='font-semibold mb-2'>Summary of your review:</h4>
                <ul className='space-y-1 text-sm'>
                  {QUESTIONS.slice(0, -1).map((q) => (
                    <li key={q.id} className='flex justify-between'>
                      <span className='text-muted-foreground'>
                        {q.question}:
                      </span>
                      <span className='font-medium'>
                        {answers[q.id]?.toString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={resetForm} variant='outline' className='w-full'>
                Submit Another Review
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          key='form'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}>
          <Card className='w-full max-w-2xl mx-auto'>
            <CardHeader>
              <CardTitle>Share Your Experience</CardTitle>
              <CardDescription>
                Please answer the following questions to help us improve
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-8'>
              {QUESTIONS.map((q, index) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='space-y-4'>
                  <div className='space-y-2'>
                    <Label className='text-base'>
                      {q.question}
                      {q.required && (
                        <span className='text-destructive ml-1'>*</span>
                      )}
                    </Label>

                    {q.type === 'starRating' && (
                      <StarRating
                        value={(answers[q.id] as number) || 0}
                        onChange={(value) => handleAnswer(q.id, value)}
                      />
                    )}

                    {q.type === 'multipleChoice' && (
                      <RadioGroup
                        value={(answers[q.id] as string) || ''}
                        onValueChange={(value) => handleAnswer(q.id, value)}
                        className='flex flex-wrap gap-2'>
                        {q.options?.map((option) => (
                          <div
                            key={option}
                            className='flex items-center space-x-2'>
                            <RadioGroupItem
                              value={option}
                              id={`${q.id}-${option}`}
                            />
                            <Label
                              htmlFor={`${q.id}-${option}`}
                              className='cursor-pointer'>
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {q.type === 'yesNo' && (
                      <RadioGroup
                        value={(answers[q.id] as string) || ''}
                        onValueChange={(value) => handleAnswer(q.id, value)}
                        className='flex gap-4'>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='Yes' id={`${q.id}-yes`} />
                          <Label
                            htmlFor={`${q.id}-yes`}
                            className='cursor-pointer'>
                            Yes
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='No' id={`${q.id}-no`} />
                          <Label
                            htmlFor={`${q.id}-no`}
                            className='cursor-pointer'>
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    )}

                    {q.type === 'textInput' && (
                      <Textarea
                        value={(answers[q.id] as string) || ''}
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                        placeholder='Share any additional thoughts...'
                        className='min-h-[100px]'
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </CardContent>

            <CardFooter className='flex flex-col gap-4'>
              <div className='flex items-center justify-between w-full text-sm text-muted-foreground'>
                <span>
                  {
                    Object.keys(answers).filter((k) => answers[Number(k)])
                      .length
                  }{' '}
                  of {QUESTIONS.length} answered
                </span>
                <span>* Required</span>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className='w-full'
                size='lg'>
                {isSubmitting ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Submitting...
                  </>
                ) : (
                  'Submit Review'
                )}
              </Button>

              <p className='text-xs text-center text-muted-foreground'>
                Your feedback is anonymous and will be used to improve our
                services.
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
