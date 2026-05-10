import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Decorative Brand Blobs */}
      <div className="fixed top-[-15%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-15%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <Navbar />
      <main className="container mx-auto px-6 pt-40 pb-20 relative z-10">
        <Outlet />
      </main>
      
      {/* Footer / Brand Footer */}
      <footer className="py-20 border-t border-slate-50 relative z-10 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-8 text-left">
            <img src="/travelloop_logo.png" className="h-16 w-fit object-contain" alt="Traveloop Logo" />
            <p className="text-slate-400 font-bold max-w-sm leading-relaxed">
              Your global travel companion. Plan, organize, and experience the world with the precision of a professional and the heart of a local.
            </p>
          </div>
          <div className="space-y-6 text-left">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-secondary">Platform</h4>
            <ul className="space-y-3 text-slate-400 font-bold">
              <li className="hover:text-primary cursor-pointer transition-colors">Explore</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Communities</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Trip Planner</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Mobile App</li>
            </ul>
          </div>
          <div className="space-y-6 text-left">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-secondary">Support</h4>
            <ul className="space-y-3 text-slate-400 font-bold">
              <li className="hover:text-primary cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Safety Hub</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 pt-20 mt-20 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-300">© 2024 Traveloop Enterprise. All rights reserved.</p>
          <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-300">
             <span className="hover:text-primary cursor-pointer transition-colors">Twitter</span>
             <span className="hover:text-primary cursor-pointer transition-colors">Instagram</span>
             <span className="hover:text-primary cursor-pointer transition-colors">LinkedIn</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
