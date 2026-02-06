import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { StarRating } from '@/components/Sample6/StarRating'; // We'll create this component

interface Question {
  id: string;
  type: 'mcq' | 'rating' | 'yesno' | 'text';
  question: string;
  options?: string[];
  required: boolean;
}

const questions: Question[] = [
  {
    id: 'overall',
    type: 'rating',
    question: 'How would you rate your overall experience?',
    required: true,
  },
  {
    id: 'recommend',
    type: 'yesno',
    question: 'Would you recommend our services to others?',
    required: true,
  },
  {
    id: 'service',
    type: 'mcq',
    question: 'Which service did you receive?',
    options: ['Manicure', 'Pedicure', 'Makeup', 'Other'],
    required: true,
  },
  {
    id: 'improvement',
    type: 'text',
    question: 'How can we improve our service?',
    required: false,
  },
  {
    id: 'staff',
    type: 'rating',
    question: 'Rate the professionalism of our staff',
    required: true,
  },
];

export default function ReviewForm() {
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const validateForm = () => {
    for (const question of questions) {
      if (question.required && !responses[question.id]) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please answer all required questions');
      return;
    }

    // Log the responses
    console.log('Review submitted:', responses);

    // Show thank you message
    setIsSubmitted(true);

    // Reset form after animation
    setTimeout(() => {
      setIsSubmitted(false);
      setResponses({});
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className='w-full max-w-2xl mx-auto'>
        <Card className='bg-green-50 border-green-200'>
          <CardContent className='flex items-center justify-center p-8'>
            <div className='text-center'>
              <div className='text-4xl mb-4'>🎉</div>
              <h3 className='text-xl font-semibold text-green-800'>
                Thank You!
              </h3>
              <p className='text-green-600 mt-2'>
                Your feedback has been received.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-2xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>Share Your Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='space-y-6'>
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='space-y-3'>
                  <Label
                    htmlFor={question.id}
                    className='text-base font-medium'>
                    {question.question}
                    {question.required && (
                      <span className='text-destructive ml-1'>*</span>
                    )}
                  </Label>

                  {question.type === 'rating' && (
                    <StarRating
                      id={question.id}
                      value={responses[question.id] || 0}
                      onChange={(value) =>
                        handleResponseChange(question.id, value)
                      }
                    />
                  )}

                  {question.type === 'yesno' && (
                    <RadioGroup
                      id={question.id}
                      value={responses[question.id] || ''}
                      onValueChange={(value) =>
                        handleResponseChange(question.id, value)
                      }
                      className='flex space-x-4'>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='yes' id={`yes-${question.id}`} />
                        <Label htmlFor={`yes-${question.id}`}>Yes</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='no' id={`no-${question.id}`} />
                        <Label htmlFor={`no-${question.id}`}>No</Label>
                      </div>
                    </RadioGroup>
                  )}

                  {question.type === 'mcq' && question.options && (
                    <RadioGroup
                      value={responses[question.id] || ''}
                      onValueChange={(value) =>
                        handleResponseChange(question.id, value)
                      }>
                      {question.options.map((option) => (
                        <div
                          key={option}
                          className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value={option}
                            id={`${question.id}-${option}`}
                          />
                          <Label htmlFor={`${question.id}-${option}`}>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {question.type === 'text' && (
                    <Input
                      id={question.id}
                      value={responses[question.id] || ''}
                      onChange={(e) =>
                        handleResponseChange(question.id, e.target.value)
                      }
                      placeholder='Your feedback...'
                    />
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}>
                <Button type='submit' className='w-full'>
                  Submit Review
                </Button>
              </motion.div>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
