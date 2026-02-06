// app/page.tsx
import { ReviewCollection } from '@/components/Sample5/ReviewCollection';

export default function Sample5() {
  return (
    <main className='min-h-screen p-4 md:p-8 bg-linear-to-br from-background to-muted/30'>
      <div className='container mx-auto max-w-4xl'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl md:text-4xl font-bold tracking-tight mb-2'>
            Customer Feedback
          </h1>
          <p className='text-muted-foreground'>
            We value your opinion. Please take a moment to share your
            experience.
          </p>
        </div>
        <ReviewCollection />
      </div>
    </main>
  );
}
