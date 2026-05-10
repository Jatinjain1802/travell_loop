import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { PlaneTakeoff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button, Card, Input } from '@/components/common/UI';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log('Login data:', data);
    const mockUser = {
      id: '1',
      email: data.email,
      firstName: 'Traveler',
      lastName: 'User',
      role: 'user'
    };
    login(mockUser, 'mock-jwt-token');
    navigate('/');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background p-4 md:p-8 gap-8">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-primary rounded-[24px] mb-6 shadow-glow">
              <PlaneTakeoff className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-secondary">Welcome back</h1>
            <p className="text-muted mt-3 font-medium">
              Your adventures are waiting. Log in to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <Input 
                label="Email address"
                icon={Mail}
                placeholder="name@example.com"
                {...register('email')}
                error={errors.email?.message}
              />

              <div className="space-y-1">
                <Input 
                  label="Password"
                  type="password"
                  icon={Lock}
                  placeholder="••••••••"
                  {...register('password')}
                  error={errors.password?.message}
                />
                <div className="text-right px-2">
                  <Link to="#" className="text-xs font-bold text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>

            <Button type="submit" size="xl" className="w-full">
              Sign In
              <ArrowRight className="h-5 w-5" />
            </Button>
          </form>

          <div className="text-center text-sm font-bold text-muted">
            New to Traveloop?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Create an account
            </Link>
          </div>
        </Card>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex relative rounded-[40px] overflow-hidden shadow-premium">
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
        
        <div className="relative z-10 self-end p-16 space-y-6">
          <div className="glass p-8 rounded-[32px] space-y-4">
            <h2 className="text-3xl font-black text-secondary leading-tight">
              "Travel makes one modest. You see what a tiny place you occupy in the world."
            </h2>
            <p className="text-muted font-bold">— Gustave Flaubert</p>
          </div>
        </div>
      </div>
    </div>
  );
}
