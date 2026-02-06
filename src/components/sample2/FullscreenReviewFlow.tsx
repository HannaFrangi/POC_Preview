import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

// Question type components
import FullscreenStarRating from '../questions2/FullscreenStarRating';
import FullscreenTextInput from '../questions2/FullscreenTextInput';
import FullscreenMultipleChoice from '../questions2/FullscreenMultipleChoice';
import FullscreenScaleRating from '../questions2/FullscreenScaleRating';
import FullscreenYesNo from '../questions2/FullscreenYesNo';

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

interface FullscreenReviewFlowProps {
  questions: Question[];
  title?: string;
  description?: string;
  brandColor?: string; // Custom brand color
  onComplete?: (data: Record<string, any>) => void;
  onClose?: () => void;
}

const FullscreenReviewFlow: React.FC<FullscreenReviewFlowProps> = ({
  questions,
  title = "We'd love your feedback",
  description = 'Help us improve by answering a few questions',
  brandColor = '#6366f1', // Default indigo
  onComplete,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;
  const hasAnswer =
    answers[currentQuestion.id] !== undefined &&
    answers[currentQuestion.id] !== '' &&
    answers[currentQuestion.id] !== null;

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && hasAnswer && !isLastQuestion) {
      handleNext();
    }
  };

  const handleSubmit = () => {
    const hasAtLeastOneAnswer =
      Object.keys(answers).length > 0 &&
      Object.values(answers).some(
        (val) => val !== undefined && val !== '' && val !== null,
      );

    if (!hasAtLeastOneAnswer) {
      toast.error('Oops!', {
        description: 'Please answer at least one question before submitting.',
      });
      return;
    }

    console.log('Review Data:', answers);

    setIsSubmitted(true);

    toast.success('Thank you! ✨', {
      description: 'Your feedback has been submitted successfully.',
    });

    if (onComplete) {
      onComplete(answers);
    }

    // Auto-close after 3 seconds
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 3000);
  };

  const renderQuestion = () => {
    const question = currentQuestion;
    const value = answers[question.id];

    switch (question.type) {
      case 'star':
        return (
          <FullscreenStarRating
            value={value || 0}
            onChange={(val) => handleAnswer(question.id, val)}
          />
        );
      case 'text':
        return (
          <FullscreenTextInput
            value={value || ''}
            onChange={(val) => handleAnswer(question.id, val)}
            placeholder='Type your answer...'
          />
        );
      case 'textarea':
        return (
          <FullscreenTextInput
            value={value || ''}
            onChange={(val) => handleAnswer(question.id, val)}
            placeholder='Share your thoughts...'
            multiline
          />
        );
      case 'choice':
        return (
          <FullscreenMultipleChoice
            options={question.options || []}
            value={value}
            onChange={(val) => handleAnswer(question.id, val)}
          />
        );
      case 'scale':
        return (
          <FullscreenScaleRating
            min={question.min || 1}
            max={question.max || 10}
            value={value}
            onChange={(val) => handleAnswer(question.id, val)}
          />
        );
      case 'yesno':
        return (
          <FullscreenYesNo
            value={value}
            onChange={(val) => handleAnswer(question.id, val)}
          />
        );
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950'>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className='text-center space-y-6'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
            className='w-24 h-24 mx-auto bg-green-500 rounded-full flex items-center justify-center'>
            <Check className='w-14 h-14 text-white' strokeWidth={3} />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}>
            <h2 className='text-4xl font-bold text-green-900 dark:text-green-100 mb-2'>
              Thank You! 🎉
            </h2>
            <p className='text-lg text-green-700 dark:text-green-300'>
              Your feedback helps us improve
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div
      className='fixed inset-0 z-50 bg-background overflow-hidden'
      onKeyDown={handleKeyPress}>
      {/* Progress bar - fixed at top */}
      <motion.div
        className='fixed top-0 left-0 right-0 h-2 bg-muted z-50'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <motion.div
          className='h-full transition-all duration-500 ease-out'
          style={{
            width: `${progress}%`,
            backgroundColor: brandColor,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </motion.div>

      {/* Main content area */}
      <div className='h-full flex flex-col'>
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className='px-6 md:px-12 pt-12 pb-6'>
          <div className='max-w-3xl mx-auto'>
            <div className='flex items-center gap-3 mb-2'>
              <Sparkles className='w-6 h-6' style={{ color: brandColor }} />
              <span className='text-sm font-medium text-muted-foreground'>
                Question {currentStep + 1} of {questions.length}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Question area - scrollable when content overflows */}
        <div className='flex-1 min-h-0 overflow-y-auto'>
          <div className='min-h-full flex items-center justify-center px-6 md:px-12 pb-32'>
            <div className='w-full max-w-3xl py-4'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className='space-y-8'>
                  {/* Question text */}
                  <div className='space-y-3'>
                    <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight'>
                      {currentQuestion.title}
                      {currentQuestion.required && (
                        <span className='text-destructive ml-2'>*</span>
                      )}
                    </h2>
                    {currentQuestion.description && (
                      <p className='text-lg md:text-xl text-muted-foreground'>
                        {currentQuestion.description}
                      </p>
                    )}
                  </div>

                  {/* Answer input */}
                  <div className='pt-4'>{renderQuestion()}</div>

                  {/* Helper text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className='text-sm text-muted-foreground'>
                    {!isLastQuestion && hasAnswer && (
                      <>
                        Press{' '}
                        <kbd className='px-2 py-1 bg-muted rounded text-xs font-mono'>
                          Enter ↵
                        </kbd>{' '}
                        to continue
                      </>
                    )}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Navigation - fixed at bottom */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border'>
          <div className='max-w-3xl mx-auto px-6 md:px-12 py-6'>
            <div className='flex items-center justify-between gap-4'>
              {/* Previous button */}
              <Button
                variant='ghost'
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className='gap-2'
                size='lg'>
                <ArrowLeft className='w-4 h-4' />
                <span className='hidden sm:inline'>Previous</span>
              </Button>

              {/* Progress dots */}
              <div className='flex gap-2'>
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentStep ? 'w-8' : 'w-2'
                    }`}
                    style={{
                      backgroundColor:
                        index <= currentStep ? brandColor : 'hsl(var(--muted))',
                      opacity: index <= currentStep ? 1 : 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Next/Submit button */}
              {!isLastQuestion ? (
                <Button
                  onClick={handleNext}
                  disabled={currentQuestion.required && !hasAnswer}
                  className='gap-2'
                  size='lg'
                  style={{ backgroundColor: brandColor }}>
                  <span className='hidden sm:inline'>Next</span>
                  <span className='sm:hidden'>OK</span>
                  <ArrowRight className='w-4 h-4' />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className='gap-2 bg-green-600 hover:bg-green-700'
                  size='lg'>
                  <Check className='w-4 h-4' />
                  Submit
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FullscreenReviewFlow;
