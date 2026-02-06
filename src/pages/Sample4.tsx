import SinglePageReviewFlow, {
  type Question,
} from '@/components/sample3/ReviewForm';
import ThemeToggle from '@/components/ThemeToggle';

const SinglePageReviewExample = () => {
  // Example: Complete Customer Feedback Form
  const feedbackQuestions: Question[] = [
    {
      id: 'overall_satisfaction',
      type: 'star',
      title: 'How satisfied are you with our service?',
      description: 'Rate your overall experience with us',
      required: true,
    },
    {
      id: 'name',
      type: 'text',
      title: 'What is your name?',
      required: true,
    },
    {
      id: 'email',
      type: 'text',
      title: 'Email address',
      description: "We'll never share your email with anyone else",
    },
    {
      id: 'recommendation_score',
      type: 'scale',
      title: 'How likely are you to recommend us to a friend or colleague?',
      description: 'Rate from 0 (not likely) to 10 (very likely)',
      min: 0,
      max: 10,
      required: true,
    },
    {
      id: 'favorite_feature',
      type: 'choice',
      title: 'Which feature do you value the most?',
      options: [
        'User Interface & Design',
        'Performance & Speed',
        'Customer Support',
        'Pricing & Value',
        'Feature Set',
        'Documentation & Resources',
      ],
      required: true,
    },
    {
      id: 'ease_of_use',
      type: 'star',
      title: 'How easy was it to use our product?',
    },
    {
      id: 'would_purchase_again',
      type: 'yesno',
      title: 'Would you purchase from us again?',
    },
    {
      id: 'improvements',
      type: 'textarea',
      title: 'What could we do better?',
      description: 'Please share any suggestions for improvement',
    },
    {
      id: 'additional_comments',
      type: 'textarea',
      title: 'Any other comments or feedback?',
    },
  ];

  // Example: Short Product Review
  const productReview: Question[] = [
    {
      id: 'product_rating',
      type: 'star',
      title: 'Rate this product',
      required: true,
    },
    {
      id: 'reviewer_name',
      type: 'text',
      title: 'Your name',
      required: true,
    },
    {
      id: 'review_title',
      type: 'text',
      title: 'Review title',
      description: 'Sum up your experience in one line',
    },
    {
      id: 'review_text',
      type: 'textarea',
      title: 'Your review',
      description: 'Tell others what you think about this product',
      required: true,
    },
    {
      id: 'would_recommend',
      type: 'yesno',
      title: 'Would you recommend this product?',
    },
  ];

  // Example: Event Registration & Feedback
  const eventForm: Question[] = [
    {
      id: 'full_name',
      type: 'text',
      title: 'Full Name',
      required: true,
    },
    {
      id: 'email_address',
      type: 'text',
      title: 'Email Address',
      required: true,
    },
    {
      id: 'attendance',
      type: 'yesno',
      title: 'Will you be attending the event?',
      required: true,
    },
    {
      id: 'session_preference',
      type: 'choice',
      title: 'Which session interests you most?',
      options: [
        'Opening Keynote',
        'Technical Workshop A',
        'Technical Workshop B',
        'Panel Discussion',
        'Networking Session',
        'Closing Remarks',
      ],
    },
    {
      id: 'dietary_requirements',
      type: 'text',
      title: 'Any dietary requirements?',
    },
    {
      id: 'expectations',
      type: 'textarea',
      title: 'What are you hoping to learn or achieve?',
    },
  ];

  const handleComplete = (data: Record<string, any>) => {
    console.log('Single Page Form submitted:', data);
    // Handle the submission (e.g., send to API)
  };

  return (
    <div className='min-h-screen'>
      <ThemeToggle />

      <SinglePageReviewFlow
        questions={feedbackQuestions}
        title='Customer Feedback Survey'
        description='Help us improve by sharing your experience. This form takes about 3-5 minutes to complete.'
        brandColor='#6366f1' // Indigo
        onComplete={handleComplete}
        // logoUrl="/path/to/your/logo.png" // Optional
      />

      {/* Alternative examples - uncomment to try */}

      {/* Product Review */}
      {/* <SinglePageReviewFlow
        questions={productReview}
        title='Write a Review'
        description='Share your experience with this product'
        brandColor='#10b981' // Green
        onComplete={handleComplete}
      /> */}

      {/* Event Registration */}
      {/* <SinglePageReviewFlow
        questions={eventForm}
        title='Event Registration'
        description='Sign up for our upcoming conference'
        brandColor='#f59e0b' // Amber
        onComplete={handleComplete}
      /> */}
    </div>
  );
};

export default SinglePageReviewExample;
