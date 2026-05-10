import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, ArrowRight, Sparkles, Plane, Compass } from 'lucide-react';
import { useTripStore } from '@/store/tripStore';
import { Button, Card, Input } from '@/components/common/UI';

const tripSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  place: z.string().min(2, 'Destination is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
});

export default function CreateTripPage() {
  const navigate = useNavigate();
  const { addTrip } = useTripStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(tripSchema),
  });

  const onSubmit = async (data) => {
    const newTrip = {
      id: Date.now().toString(),
      ...data,
      status: 'planned'
    };
    addTrip(newTrip);
    navigate(`/trips/${newTrip.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 animate-premium">
      <div className="space-y-12">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 text-primary">
            <Compass className="h-8 w-8" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Phase 01: Initiation</span>
          </div>
          <h1 className="text-6xl font-black text-secondary tracking-tight">Create your next <br /><span className="text-primary italic">Masterpiece.</span></h1>
          <p className="text-slate-400 font-bold max-w-lg mx-auto">Fill in the core details to initialize your travel loop. Our AI engine will help you with the rest.</p>
        </div>

        <Card className="p-16 shadow-2xl border-none">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="col-span-2">
                <Input 
                  label="Trip Title"
                  placeholder="e.g., Summer in Tokyo 2024"
                  icon={Plane}
                  {...register('title')}
                  error={errors.title?.message}
                />
              </div>
              <Input 
                label="Destination"
                placeholder="Where are you going?"
                icon={MapPin}
                {...register('place')}
                error={errors.place?.message}
              />
              <Input 
                label="Travelers"
                placeholder="2 People"
                icon={Users}
                type="number"
                defaultValue={1}
              />
              <Input 
                label="Start Date"
                type="date"
                icon={Calendar}
                {...register('startDate')}
                error={errors.startDate?.message}
              />
              <Input 
                label="End Date"
                type="date"
                icon={Calendar}
                {...register('endDate')}
                error={errors.endDate?.message}
              />
            </div>

            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-6">
              <Button type="submit" size="xl" className="w-full sm:w-auto h-20 px-12 shadow-xl group">
                Initialize Trip
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
              <div className="flex items-center gap-3 text-slate-400 font-bold">
                 <Sparkles className="h-5 w-5 text-primary" />
                 <span>AI will suggest activities based on these dates</span>
              </div>
            </div>
          </form>
        </Card>

        {/* Templates */}
        <div className="space-y-8">
           <h3 className="text-xl font-black text-secondary text-left ml-2">Quick Start Templates</h3>
           <div className="grid md:grid-cols-3 gap-6">
              <TemplateCard title="Weekend Getaway" desc="3 Days • Essential activities only" />
              <TemplateCard title="Backpacker Trail" desc="14 Days • Budget-friendly focus" />
              <TemplateCard title="Luxury Escape" desc="7 Days • Premium curated experiences" />
           </div>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ title, desc }) {
  return (
    <Card padding="sm" className="hover:border-primary/30 cursor-pointer group text-left">
      <div className="space-y-2">
        <h4 className="font-black text-secondary group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-xs font-bold text-slate-400">{desc}</p>
      </div>
    </Card>
  );
}
