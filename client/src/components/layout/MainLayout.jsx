import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Decorative background blob */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-12 relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
