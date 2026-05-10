import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PlaneTakeoff, User, LogOut, Search, Compass, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/components/common/UI';

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
          "flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300",
          active 
            ? "bg-primary text-white shadow-glow" 
            : "text-slate-400 hover:text-white hover:bg-white/5"
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
        <div className="glass h-20 rounded-[32px] px-10 flex items-center justify-between border-white/10">
          <Link to="/" className="flex items-center gap-3 font-black text-2xl text-white group">
            <div className="bg-primary p-2.5 rounded-xl group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500 shadow-glow">
              <PlaneTakeoff className="h-6 w-6 text-white" />
            </div>
            <span className="tracking-tighter">Traveloop</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-3">
            <NavLink to="/search" icon={Search}>Explore</NavLink>
            <NavLink to="/trips" icon={Compass}>My Trips</NavLink>
            <NavLink to="/community" icon={User}>Community</NavLink>
            <NavLink to="/admin" icon={ShieldCheck}>Admin</NavLink>
          </nav>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/profile" 
              className="flex items-center gap-4 group/profile"
            >
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover/profile:text-primary transition-colors">Explorer</p>
                <p className="text-sm font-black text-white">{user?.firstName}</p>
              </div>
              <div className="relative">
                <img 
                  src={`https://i.pravatar.cc/100?u=${user?.id}`} 
                  className="h-11 w-11 rounded-xl border-2 border-white/10 group-hover/profile:border-primary/50 transition-all shadow-xl"
                  alt="profile"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-card rounded-full" />
              </div>
            </Link>
            
            <div className="w-px h-8 bg-white/5" />

            <button 
              onClick={handleLogout}
              className="p-3 text-slate-500 hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all active:scale-90"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
