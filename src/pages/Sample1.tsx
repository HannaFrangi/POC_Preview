import ThemeToggle from '@/components/ThemeToggle';
import ReviewFlow, { type Question } from '../ReviewFlow';

const ReviewExample = () => {
  // Example 1: Service Review
  const serviceQuestions: Question[] = [
    {
      id: 'satisfaction',
      type: 'star',
      title: 'How satisfied are you with our service?',
      description: 'Rate your overall experience',
      required: true,
    },
    {
      id: 'recommendation',
      type: 'scale',
      title: 'How likely are you to recommend us?',
      description: 'On a scale of 1-10',
      min: 1,
      max: 10,
    },
    {
      id: 'feature',
      type: 'choice',
      title: 'Which feature did you like the most?',
      options: [
        'User Interface',
        'Performance',
        'Customer Support',
        'Pricing',
        'Features',
      ],
    },
    {
      id: 'would_return',
      type: 'yesno',
      title: 'Would you use our service again?',
    },
    {
      id: 'feedback',
      type: 'textarea',
      title: 'Any additional feedback?',
      description: 'Share your thoughts, suggestions, or concerns',
    },
  ];

  // Example 2: Product Review
  const productQuestions: Question[] = [
    {
      id: 'quality',
      type: 'star',
      title: 'Rate the product quality',
      required: true,
    },
    {
      id: 'value',
      type: 'star',
      title: 'Rate the value for money',
    },
    {
      id: 'issue',
      type: 'yesno',
      title: 'Did you experience any issues?',
    },
    {
      id: 'description',
      type: 'text',
      title: 'Describe your experience in one sentence',
    },
    {
      id: 'details',
      type: 'textarea',
      title: 'Tell us more about your experience',
    },
  ];

  const handleComplete = (data: Record<string, any>) => {
    console.log('Review submitted:', data);
    // Handle the submission (e.g., send to API)
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 transition-colors duration-300'>
      <ThemeToggle />

      <ReviewFlow
        questions={serviceQuestions}
        title='Share Your Feedback'
        description='Help us improve by sharing your experience'
        onComplete={handleComplete}
      />

      {/* You can render multiple review flows with different questions */}
      {/* <ReviewFlow
        questions={productQuestions}
        title="Product Review"
        description="We'd love to hear about your purchase"
        onComplete={handleComplete}
      /> */}
    </div>
  );
};

export default ReviewExample;
