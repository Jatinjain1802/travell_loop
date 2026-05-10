import { Link, useNavigate } from 'react-router-dom';
import { PlaneTakeoff, User, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <PlaneTakeoff className="h-6 w-6" />
          <span>Traveloop</span>
        </Link>

        <nav className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 mr-4">
            <Link to="/search" className="text-sm font-medium hover:text-primary transition-colors">
              Search
            </Link>
            <Link to="/trips" className="text-sm font-medium hover:text-primary transition-colors">
              My Trips
            </Link>
            <Link to="/community" className="text-sm font-medium hover:text-primary transition-colors">
              Community
            </Link>
            <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">
              Admin
            </Link>
          </div>
          
          <div className="flex items-center gap-4 border-l pl-4 ml-2">
            <Link to="/profile" className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:inline-block">
                {user?.firstName}
              </span>
            </Link>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-muted rounded-full text-destructive transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
