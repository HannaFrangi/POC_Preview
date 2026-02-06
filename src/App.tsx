import { Toaster } from '@/components/ui/sonner';
import ThemeToggle from './components/ThemeToggle';
import AppNav from './routes/routes';

export function App() {
  return (
    <div className='min-h-screen bg-background'>
      <ThemeToggle />
      <AppNav />
      <Toaster />
    </div>
  );
}

export default App;
