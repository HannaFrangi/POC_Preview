import Home from '@/pages/Home';
import ReviewExample from '@/pages/Sample1';
import FullscreenReviewExample from '@/pages/Sample2';
import ReviewForm from '@/pages/Sample3';
import SinglePageReviewExample from '@/pages/Sample4';
import Sample5 from '@/pages/Sample5';
import Sample6 from '@/pages/Sample6';
import { Route, Routes } from 'react-router-dom';

const AppNav = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/review' element={<FullscreenReviewExample />} />
      <Route path='/review2' element={<ReviewExample />} />
      <Route path='/review3' element={<ReviewForm />} />
      <Route path='/review4' element={<SinglePageReviewExample />} />
      <Route path='/review5' element={<Sample5 />} />
      <Route path='/review6' element={<Sample6 />} />
    </Routes>
  );
};

export default AppNav;
