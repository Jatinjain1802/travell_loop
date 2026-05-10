import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Code, Globe } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button, Card, Input } from '@/components/common/UI';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error: storeError } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate('/trips');
    } catch (err) {
      // Error is handled in store
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Brand Visual */}
        <div className="hidden lg:flex flex-col justify-center space-y-12 pr-12">
          <img src="/travelloop_logo.png" className="h-20 w-fit object-contain" alt="Logo" />
          <div className="space-y-6">
            <h1 className="text-6xl font-black text-secondary leading-tight">
              Welcome back to <br />
              the <span className="text-primary italic">Loop.</span>
            </h1>
            <p className="text-xl text-muted font-bold leading-relaxed max-w-md">
              Sign in to access your curated itineraries, travel documents, and community experiences.
            </p>
          </div>
          <div className="flex items-center gap-8 pt-6">
            <div className="space-y-1">
              <p className="text-3xl font-black text-secondary">50k+</p>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Active Explorers</p>
            </div>
            <div className="w-px h-12 bg-slate-200" />
            <div className="space-y-1">
              <p className="text-3xl font-black text-secondary">1.2M</p>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Trips Planned</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <Card className="p-12 shadow-2xl border-none">
          <div className="space-y-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-secondary">Member Login</h2>
              <p className="text-muted font-bold">Enter your credentials to continue your journey.</p>
              {storeError && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive text-xs font-black uppercase tracking-widest animate-premium">
                  {storeError}
                </div>
              )}
            </div>


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <Input 
                  label="Email Address"
                  placeholder="name@company.com"
                  icon={Mail}
                  {...register('email')}
                  error={errors.email?.message}
                />
                <Input 
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  icon={Lock}
                  {...register('password')}
                  error={errors.password?.message}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-primary focus:ring-primary/20" />
                  Remember me
                </label>
                <Link to="/forgot-password" title="Recover Password" className="text-slate-400 hover:text-primary transition-colors">Forgot Password?</Link>
              </div>

              <Button type="submit" className="w-full h-16 shadow-xl" disabled={loading}>
                {loading ? 'Authenticating...' : 'Sign In Now'}
                {!loading && <ArrowRight className="h-5 w-5" />}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
              <div className="relative flex justify-center text-xs font-black uppercase tracking-widest"><span className="bg-white px-4 text-slate-400">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-14 border-slate-200 text-secondary hover:bg-slate-50">
                <Code className="h-5 w-5" />
                Github
              </Button>
              <Button variant="outline" className="h-14 border-slate-200 text-secondary hover:bg-slate-50">
                <Globe className="h-5 w-5" />
                Google
              </Button>
            </div>

            <p className="text-center text-sm font-bold text-muted">
              Don't have an account? {' '}
              <Link to="/register" className="text-primary hover:underline font-black">Create Free Account</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
