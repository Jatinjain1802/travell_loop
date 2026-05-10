import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Plane, User, LogOut, Search, Compass, ShieldCheck, Menu } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn, Button } from '@/components/common/UI';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  const NavLink = ({ to, icon: Icon, children }) => {
    const active = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={cn(
          "flex items-center gap-2.5 px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300",
          active 
            ? "bg-secondary text-white shadow-xl" 
            : "text-muted hover:text-secondary hover:bg-slate-100"
        )}
      >
        <Icon className={cn("h-4 w-4 transition-transform", active && "scale-110")} />
        {children}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="container mx-auto">
        <div className="bg-white/90 backdrop-blur-xl h-24 rounded-[32px] px-8 flex items-center justify-between border border-white shadow-premium">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/travelloop_logo.png" className="h-14 object-contain group-hover:scale-105 transition-transform" alt="Logo" />
          </Link>

          <nav className="hidden xl:flex items-center gap-2">
            <NavLink to="/search" icon={Search}>Explore</NavLink>
            <NavLink to="/trips" icon={Compass}>My Trips</NavLink>
            <NavLink to="/community" icon={User}>Community</NavLink>
            <NavLink to="/admin" icon={ShieldCheck}>Admin</NavLink>
          </nav>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/profile" 
              className="flex items-center gap-4 group/profile hover:bg-slate-50 p-2 pr-6 rounded-2xl transition-all"
            >
              <div className="relative">
                <img 
                  src={`https://i.pravatar.cc/100?u=${user?.id}`} 
                  className="h-12 w-12 rounded-2xl border-4 border-white shadow-xl group-hover/profile:border-primary/20 transition-all"
                  alt="profile"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full shadow-lg" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verified Member</p>
                <p className="text-sm font-black text-secondary leading-none mt-1">{user?.firstName}</p>
              </div>
            </Link>
            
            <div className="w-px h-10 bg-slate-100" />

            <button 
              onClick={handleLogout}
              className="p-4 text-slate-400 hover:text-destructive hover:bg-destructive/5 rounded-2xl transition-all active:scale-90"
              title="Logout"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
