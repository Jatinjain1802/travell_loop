import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button, Card, Input } from '@/components/common/UI';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser, loading } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const success = await registerUser(data);
    if (success) navigate('/trips');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="hidden lg:flex flex-col space-y-12">
          <img src="/travelloop_logo.png" className="h-20 w-fit object-contain" alt="Logo" />
          <div className="space-y-8">
            <h1 className="text-6xl font-black text-secondary leading-[1.1]">
              Start your <br />
              <span className="text-primary italic">Global Adventure.</span>
            </h1>
            <div className="space-y-6">
              <FeatureItem icon={ShieldCheck} title="Verified Destinations" desc="Every location in our loop is manually verified for safety and quality." />
              <FeatureItem icon={Globe} title="Global Community" desc="Connect with travelers worldwide and share your unique experiences." />
            </div>
          </div>
        </div>

        <Card className="p-12 shadow-2xl border-none">
          <div className="space-y-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-secondary">Create Account</h2>
              <p className="text-muted font-bold">Join 50,000+ explorers worldwide.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Input 
                  label="First Name"
                  placeholder="John"
                  icon={User}
                  {...register('firstName')}
                  error={errors.firstName?.message}
                />
                <Input 
                  label="Last Name"
                  placeholder="Doe"
                  icon={User}
                  {...register('lastName')}
                  error={errors.lastName?.message}
                />
              </div>
              <Input 
                label="Email Address"
                placeholder="john@example.com"
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

              <div className="space-y-6 pt-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                  By clicking "Create Account", you agree to our <span className="text-primary cursor-pointer hover:underline">Terms of Service</span> and <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>.
                </p>
                <Button type="submit" className="w-full h-16 shadow-xl" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account Now'}
                  {!loading && <ArrowRight className="h-5 w-5" />}
                </Button>
              </div>
            </form>

            <p className="text-center text-sm font-bold text-muted">
              Already have an account? {' '}
              <Link to="/login" className="text-primary hover:underline font-black">Sign In Instead</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, title, desc }) {
  return (
    <div className="flex gap-4 group">
      <div className="bg-primary/10 p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300 h-fit">
        <Icon className="h-6 w-6 text-primary group-hover:text-white" />
      </div>
      <div>
        <h3 className="font-black text-secondary text-lg">{title}</h3>
        <p className="text-slate-400 font-bold text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
