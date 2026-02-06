import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import FullscreenReviewFlow, { type Question } from './FullscreenReviewFlow';

const FullscreenReviewExample = () => {
  const [showReview, setShowReview] = useState(false);

  // Example: Customer Satisfaction Survey
  const satisfactionQuestions: Question[] = [
    {
      id: 'overall_experience',
      type: 'star',
      title: 'How would you rate your overall experience?',
      description: 'Your honest feedback helps us improve',
      required: true,
    },
    {
      id: 'ease_of_use',
      type: 'scale',
      title: 'How easy was it to use our product?',
      description: 'Rate from 1 (very difficult) to 10 (very easy)',
      min: 1,
      max: 10,
    },
    {
      id: 'favorite_feature',
      type: 'choice',
      title: 'What feature did you find most valuable?',
      options: [
        'User Interface',
        'Performance & Speed',
        'Customer Support',
        'Pricing',
        'Integration Options',
        'Documentation',
      ],
    },
    {
      id: 'recommend',
      type: 'yesno',
      title: 'Would you recommend us to a friend or colleague?',
    },
    {
      id: 'improvements',
      type: 'textarea',
      title: 'What could we do better?',
      description: 'Share any suggestions or areas for improvement',
    },
  ];

  // Example: Product Review
  const productQuestions: Question[] = [
    {
      id: 'quality',
      type: 'star',
      title: 'How would you rate the product quality?',
      required: true,
    },
    {
      id: 'meets_expectations',
      type: 'yesno',
      title: 'Did the product meet your expectations?',
    },
    {
      id: 'price_rating',
      type: 'scale',
      title: 'How would you rate the value for money?',
      min: 1,
      max: 5,
    },
    {
      id: 'review',
      type: 'textarea',
      title: 'Tell us about your experience',
      description: 'Write a brief review of the product',
    },
  ];

  // Example: Event Feedback
  const eventQuestions: Question[] = [
    {
      id: 'event_rating',
      type: 'star',
      title: 'How would you rate this event?',
    },
    {
      id: 'organization',
      type: 'scale',
      title: 'How well was the event organized?',
      description: 'Rate from 1 to 10',
      min: 1,
      max: 10,
    },
    {
      id: 'best_part',
      type: 'choice',
      title: 'What was the best part of the event?',
      options: [
        'Keynote Speakers',
        'Networking Opportunities',
        'Workshop Sessions',
        'Venue & Facilities',
        'Food & Refreshments',
        'Overall Atmosphere',
      ],
    },
    {
      id: 'attend_again',
      type: 'yesno',
      title: 'Would you attend a similar event in the future?',
    },
    {
      id: 'comments',
      type: 'textarea',
      title: 'Any additional comments or suggestions?',
    },
  ];

  const handleComplete = (data: Record<string, any>) => {
    console.log('Fullscreen Review submitted:', data);
    // Handle the submission (e.g., send to API)
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950'>
      <ThemeToggle />

      {/* Landing page */}
      {!showReview ? (
        <div className='min-h-screen flex items-center justify-center p-6'>
          <div className='max-w-2xl w-full text-center space-y-8'>
            <div className='space-y-4'>
              <div className='inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full'>
                <Sparkles className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
                <span className='text-sm font-medium text-indigo-700 dark:text-indigo-300'>
                  Fullscreen Review Flow
                </span>
              </div>

              <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent'>
                Beautiful Surveys
              </h1>

              <p className='text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto'>
                Immersive, Google Forms-style review experience with smooth
                animations
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-4 pt-8'>
              <Button
                size='lg'
                onClick={() => setShowReview(true)}
                className='h-auto py-6 px-8 flex flex-col gap-2 bg-indigo-600 hover:bg-indigo-700'>
                <span className='text-lg font-semibold'>Customer Survey</span>
                <span className='text-xs opacity-80'>5 questions • 2 min</span>
              </Button>

              <Button
                size='lg'
                variant='outline'
                onClick={() => setShowReview(true)}
                className='h-auto py-6 px-8 flex flex-col gap-2 border-2'>
                <span className='text-lg font-semibold'>Product Review</span>
                <span className='text-xs opacity-80'>4 questions • 1 min</span>
              </Button>

              <Button
                size='lg'
                variant='outline'
                onClick={() => setShowReview(true)}
                className='h-auto py-6 px-8 flex flex-col gap-2 border-2'>
                <span className='text-lg font-semibold'>Event Feedback</span>
                <span className='text-xs opacity-80'>5 questions • 2 min</span>
              </Button>
            </div>

            <div className='pt-8 space-y-4'>
              <h3 className='text-sm font-semibold text-muted-foreground uppercase tracking-wide'>
                Features
              </h3>
              <div className='flex flex-wrap justify-center gap-3'>
                {[
                  'Fullscreen immersive design',
                  'Keyboard navigation',
                  'Progress tracking',
                  'Dark mode support',
                  'Smooth animations',
                  'Mobile responsive',
                ].map((feature) => (
                  <span
                    key={feature}
                    className='px-4 py-2 bg-background/60 backdrop-blur-sm border border-border rounded-full text-sm'>
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FullscreenReviewFlow
          questions={satisfactionQuestions}
          title="We'd love your feedback"
          description='Help us improve by answering a few questions'
          brandColor='#6366f1' // Indigo
          onComplete={handleComplete}
          onClose={() => setShowReview(false)}
        />
      )}
    </div>
  );
};

export default FullscreenReviewExample;
