import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='min-h-screen bg-background flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold text-center'>Welcome Back</h1>
      <div className='flex flex-col items-center gap-4'>
        <br />
        <Link to='/review' className='text-blue-500'>
          Review
        </Link>

        <Link to='/review2' className='text-blue-500'>
          Review 2
        </Link>

        <Link to='/review3' className='text-blue-500'>
          Review 3
        </Link>

        <Link to='/review4' className='text-blue-500'>
          Review 4
        </Link>

        <Link to='/review5' className='text-blue-500'>
          Review 5
        </Link>
        <Link to='/review6' className='text-blue-500'>
          Review 6
        </Link>
      </div>
    </div>
  );
};

export default Home;
