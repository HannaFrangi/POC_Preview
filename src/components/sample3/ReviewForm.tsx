import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Send, CheckCircle2 } from 'lucide-react';

// Question type components
import StarRating from '@/components/questions/StarRating';
import TextInput from '@/components/questions/TextInput';
import MultipleChoice from '@/components/questions/MultipleChoice';
import ScaleRating from '@/components/questions/ScaleRating';
import YesNo from '@/components/questions/YesNo';

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

interface SinglePageReviewFlowProps {
  questions: Question[];
  title?: string;
  description?: string;
  brandColor?: string;
  logoUrl?: string;
  onComplete?: (data: Record<string, any>) => void;
}

const SinglePageReviewFlow: React.FC<SinglePageReviewFlowProps> = ({
  questions,
  title = 'Feedback Form',
  description = "We'd love to hear from you",
  brandColor = '#6366f1',
  logoUrl,
  onComplete,
}) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Clear error for this question
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    let hasErrors = false;

    questions.forEach((question) => {
      if (question.required) {
        const answer = answers[question.id];
        if (answer === undefined || answer === '' || answer === null) {
          newErrors[question.id] = true;
          hasErrors = true;
        }
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error('Missing Required Fields', {
        description: 'Please fill in all required questions.',
      });

      // Scroll to first error
      const firstErrorId = Object.keys(errors)[0];
      if (firstErrorId) {
        const element = document.getElementById(`question-${firstErrorId}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    console.log('Form Data:', answers);

    setIsSubmitted(true);

    toast.success('Thank you! ✨', {
      description: 'Your response has been recorded.',
    });

    if (onComplete) {
      onComplete(answers);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderQuestion = (question: Question, index: number) => {
    const value = answers[question.id];
    const hasError = errors[question.id];

    let questionComponent;
    switch (question.type) {
      case 'star':
        questionComponent = (
          <StarRating
            value={value || 0}
            onChange={(val) => handleAnswer(question.id, val)}
          />
        );
        break;
      case 'text':
        questionComponent = (
          <TextInput
            value={value || ''}
            onChange={(val) => handleAnswer(question.id, val)}
            placeholder='Your answer'
          />
        );
        break;
      case 'textarea':
        questionComponent = (
          <TextInput
            value={value || ''}
            onChange={(val) => handleAnswer(question.id, val)}
            placeholder='Your answer'
            multiline
          />
        );
        break;
      case 'choice':
        questionComponent = (
          <MultipleChoice
            options={question.options || []}
            value={value}
            onChange={(val) => handleAnswer(question.id, val)}
          />
        );
        break;
      case 'scale':
        questionComponent = (
          <ScaleRating
            min={question.min || 1}
            max={question.max || 10}
            value={value}
            onChange={(val) => handleAnswer(question.id, val)}
          />
        );
        break;
      case 'yesno':
        questionComponent = (
          <YesNo
            value={value}
            onChange={(val) => handleAnswer(question.id, val)}
          />
        );
        break;
      default:
        questionComponent = null;
    }

    return (
      <motion.div
        key={question.id}
        id={`question-${question.id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`p-6 md:p-8 rounded-xl border-2 transition-all duration-200 ${
          hasError
            ? 'border-red-500 bg-red-50/50 dark:bg-red-950/20'
            : 'border-border bg-card hover:border-primary/30'
        }`}>
        <div className='space-y-6'>
          {/* Question header */}
          <div>
            <h3 className='text-lg md:text-xl font-semibold flex items-start gap-2'>
              <span className='text-muted-foreground text-base'>
                {index + 1}.
              </span>
              <span className='flex-1'>
                {question.title}
                {question.required && (
                  <span className='text-red-500 ml-1'>*</span>
                )}
              </span>
            </h3>
            {question.description && (
              <p className='text-sm text-muted-foreground mt-2 ml-6'>
                {question.description}
              </p>
            )}
          </div>

          {/* Question input */}
          <div className='ml-6'>{questionComponent}</div>

          {/* Error message */}
          {hasError && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className='text-sm text-red-600 dark:text-red-400 ml-6'>
              This question is required
            </motion.p>
          )}
        </div>
      </motion.div>
    );
  };

  if (isSubmitted) {
    return (
      <div className='min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950'>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className='max-w-2xl w-full text-center space-y-6'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
            className='w-24 h-24 mx-auto bg-green-500 rounded-full flex items-center justify-center'>
            <CheckCircle2 className='w-14 h-14 text-white' strokeWidth={2.5} />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className='space-y-3'>
            <h2 className='text-4xl md:text-5xl font-bold text-green-900 dark:text-green-100'>
              Response Recorded
            </h2>
            <p className='text-lg text-green-700 dark:text-green-300'>
              Thank you for your feedback!
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className='pt-4'>
            <Button
              onClick={() => window.location.reload()}
              variant='outline'
              size='lg'>
              Submit another response
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div
        className='border-b sticky top-0 z-10 bg-background/95 backdrop-blur-sm'
        style={{ borderTopColor: brandColor, borderTopWidth: '8px' }}>
        <div className='max-w-3xl mx-auto px-4 py-6 md:py-8'>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}>
            {logoUrl && <img src={logoUrl} alt='Logo' className='h-12 mb-4' />}
            <h1 className='text-3xl md:text-4xl font-bold mb-2'>{title}</h1>
            <p className='text-lg text-muted-foreground'>{description}</p>
            <div className='mt-4 text-sm text-muted-foreground'>
              <span className='text-red-500'>*</span> Required
            </div>
          </motion.div>
        </div>
      </div>

      {/* Questions */}
      <div className='max-w-3xl mx-auto px-4 py-8 space-y-6'>
        {questions.map((question, index) => renderQuestion(question, index))}

        {/* Submit button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: questions.length * 0.1 + 0.2 }}
          className='pt-4'>
          <Button
            ref={submitButtonRef}
            onClick={handleSubmit}
            size='lg'
            className='gap-2'
            style={{ backgroundColor: brandColor }}>
            <Send className='w-4 h-4' />
            Submit
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: questions.length * 0.1 + 0.4 }}
          className='text-center text-sm text-muted-foreground pt-8 pb-4'>
          Never submit passwords through this form.
        </motion.div>
      </div>
    </div>
  );
};

export default SinglePageReviewFlow;
