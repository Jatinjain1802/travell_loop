import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Plane, User, LogOut, Search, Compass, ShieldCheck, Menu, Sparkles } from 'lucide-react';
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

  const NavLink = ({ to, icon: Icon, children }) => {
    const active = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={cn(
          "flex items-center gap-2.5 px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300",
          active 
            ? "bg-secondary text-white shadow-xl scale-105" 
            : "text-muted hover:text-secondary hover:bg-slate-100"
        )}
      >
        <Icon className={cn("h-4 w-4 transition-transform", active && "scale-110")} />
        {children}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="container mx-auto">
        <div className="bg-white/80 backdrop-blur-2xl h-24 rounded-[32px] px-8 flex items-center justify-between border border-white/50 shadow-premium group/nav">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group/logo">
            <div className="bg-primary/5 p-1 rounded-2xl group-hover/logo:bg-primary/10 transition-colors">
              <img src="/travelloop_logo.png" className="h-12 object-contain group-hover/logo:scale-105 transition-transform duration-500" alt="Traveloop Logo" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-secondary leading-none">TRAVELOOP</span>
              <span className="text-[9px] font-black tracking-[0.3em] text-primary uppercase mt-0.5">Explore the world</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-2 bg-slate-50/50 p-1.5 rounded-[24px] border border-slate-100">
            <NavLink to="/search" icon={Search}>Explore</NavLink>
            <NavLink to="/trips" icon={Compass}>My Trips</NavLink>
            <NavLink to="/community" icon={User}>Community</NavLink>
            {user?.role === 'admin' && (
              <NavLink to="/admin" icon={ShieldCheck}>Admin</NavLink>
            )}
          </nav>
          
          {/* Action Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                <Link 
                  to="/profile" 
                  className="flex items-center gap-4 group/profile hover:bg-slate-50 p-1.5 pr-6 rounded-2xl transition-all"
                >
                  <div className="relative">
                    <img 
                      src={`https://i.pravatar.cc/100?u=${user?.id}`} 
                      className="h-11 w-11 rounded-xl border-4 border-white shadow-xl group-hover/profile:border-primary/20 transition-all object-cover"
                      alt="profile"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full shadow-lg" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Voyager</p>
                    <p className="text-sm font-black text-secondary leading-none mt-0.5">{user?.firstName}</p>
                  </div>
                </Link>
                
                <div className="w-px h-8 bg-slate-200" />

                <button 
                  onClick={handleLogout}
                  className="p-3 text-slate-400 hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all active:scale-90"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="md">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="md" className="group/btn">
                    Get Started
                    <Sparkles className="h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
