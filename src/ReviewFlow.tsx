import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

// Question type components
import StarRating from '@/components/questions/StarRating';
import TextInput from '@/components/questions/TextInput';
import MultipleChoice from '@/components/questions/MultipleChoice';
import ScaleRating from '@/components/questions/ScaleRating';
import YesNo from '@/components/questions/YesNo';
import { toast } from 'sonner';

export interface Question {
  id: string;
  type: 'star' | 'text' | 'textarea' | 'choice' | 'scale' | 'yesno';
  title: string;
  description?: string;
  required?: boolean;
  options?: string[]; // for multiple choice
  min?: number; // for scale
  max?: number; // for scale
}

interface ReviewFlowProps {
  questions: Question[];
  title?: string;
  description?: string;
  onComplete?: (data: Record<string, any>) => void;
}

const ReviewFlow: React.FC<ReviewFlowProps> = ({
  questions,
  title = 'Share Your Feedback',
  description = 'Your feedback helps us improve our service',
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  // const { toast } = useToast()
  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;
  const hasAnswer =
    answers[currentQuestion.id] !== undefined &&
    answers[currentQuestion.id] !== '';

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Validate at least one field is filled
    const hasAtLeastOneAnswer =
      Object.keys(answers).length > 0 &&
      Object.values(answers).some(
        (val) => val !== undefined && val !== '' && val !== null
      );

    if (!hasAtLeastOneAnswer) {
      toast.error('Oops!', {
        description: 'Please answer at least one question before submitting.',
      });
      return;
    }

    console.log('Review Data:', answers);

    toast.success('Thank you! ✨', {
      description: 'Your feedback has been submitted successfully.',
    });

    if (onComplete) {
      onComplete(answers);
    }
  };

  const renderQuestion = () => {
    const question = currentQuestion;
    const value = answers[question.id];

    switch (question.type) {
      case 'star':
        return (
          <StarRating
            value={value || 0}
            onChange={(val) => handleAnswer(question.id, val)}
          />
        );
      case 'text':
        return (
          <TextInput
            value={value || ''}
            onChange={(val) => handleAnswer(question.id, val)}
            placeholder='Type your answer...'
          />
        );
      case 'textarea':
        return (
          <TextInput
            value={value || ''}
            onChange={(val) => handleAnswer(question.id, val)}
            placeholder='Type your answer...'
            multiline
          />
        );
      case 'choice':
        return (
          <MultipleChoice
            options={question.options || []}
            value={value}
            onChange={(val) => handleAnswer(question.id, val)}
          />
        );
      case 'scale':
        return (
          <ScaleRating
            min={question.min || 1}
            max={question.max || 10}
            value={value}
            onChange={(val) => handleAnswer(question.id, val)}
          />
        );
      case 'yesno':
        return (
          <YesNo
            value={value}
            onChange={(val) => handleAnswer(question.id, val)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='w-full max-w-2xl mx-auto p-4'>
      <Card className='border-2'>
        <CardHeader>
          <CardTitle className='text-2xl'>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>

          {/* Progress bar */}
          <div className='pt-4'>
            <div className='flex justify-between text-sm text-muted-foreground mb-2'>
              <span>
                Question {currentStep + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className='h-2' />
          </div>

          {/* Stepper dots */}
          <div className='flex justify-center gap-2 pt-4'>
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-8 bg-primary'
                    : index < currentStep
                      ? 'w-2 bg-primary/50'
                      : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className='min-h-[300px]'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className='space-y-6'>
              <div>
                <h3 className='text-xl font-semibold mb-2'>
                  {currentQuestion.title}
                  {currentQuestion.required && (
                    <span className='text-destructive ml-1'>*</span>
                  )}
                </h3>
                {currentQuestion.description && (
                  <p className='text-sm text-muted-foreground'>
                    {currentQuestion.description}
                  </p>
                )}
              </div>

              <div className='py-4'>{renderQuestion()}</div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className='flex justify-between items-center pt-8 border-t mt-8'>
            <Button
              variant='outline'
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className='gap-2'>
              <ChevronLeft className='w-4 h-4' />
              Previous
            </Button>

            {!isLastQuestion ? (
              <Button onClick={handleNext} className='gap-2'>
                Next
                <ChevronRight className='w-4 h-4' />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className='gap-2 bg-green-600 hover:bg-green-700'>
                <Check className='w-4 h-4' />
                Submit Review
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewFlow;
