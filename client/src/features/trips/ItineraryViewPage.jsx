import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Share2, MessageSquare, 
  CheckSquare, FileText, ChevronRight, Clock, Plus, 
  Star, TrendingUp, BookOpen
} from 'lucide-react';
import { useTripStore } from '@/store/tripStore';
import { Button, Card } from '@/components/common/UI';

export default function ItineraryViewPage() {
  const { id } = useParams();
  const { trips } = useTripStore();
  const trip = trips.find(t => t.id === id) || trips[0];

  const [activeTab, setActiveTab] = useState('Day 1');

  if (!trip) return <div className="p-10 text-center">Trip not found</div>;

  return (
    <div className="space-y-12 py-6 relative">
      {/* Header Info */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-12 border-b border-border/60">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted">
            <Link to="/trips" className="hover:text-primary transition-colors">My Trips</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-secondary">Itinerary Hub</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tight text-secondary leading-tight">
              {trip.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-sm font-bold text-muted">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <MapPin className="h-4 w-4" />
                </div>
                {trip.place}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-muted">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Calendar className="h-4 w-4" />
                </div>
                June 15 - June 25, 2024
              </div>
              <span className="px-4 py-1.5 rounded-full bg-green-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-500/20">
                {trip.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex -space-x-4 mr-4">
            {[1, 2, 3, 4].map(i => (
              <img 
                key={i} 
                src={`https://i.pravatar.cc/100?u=${i}`} 
                alt="user" 
                className="h-12 w-12 rounded-2xl border-4 border-background shadow-xl"
              />
            ))}
            <button className="h-12 w-12 rounded-2xl border-4 border-background bg-secondary text-white flex items-center justify-center text-xs font-black hover:scale-110 transition-all">
              +5
            </button>
          </div>
          <Button variant="outline" size="lg" className="h-14 w-14 p-0 rounded-2xl">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button size="lg" className="h-14 px-8 shadow-2xl">
            <MessageSquare className="h-5 w-5" />
            Join Community
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left Column - Itinerary Timeline */}
        <div className="lg:col-span-8 space-y-10">
          {/* Day Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
            {['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'].map((day) => (
              <button
                key={day}
                onClick={() => setActiveTab(day)}
                className={cn(
                  "px-8 py-4 rounded-[20px] text-sm font-black whitespace-nowrap transition-all",
                  activeTab === day 
                    ? "bg-secondary text-white shadow-xl scale-105" 
                    : "bg-white text-muted border border-border hover:border-primary/50"
                )}
              >
                {day}
              </button>
            ))}
            <Button variant="ghost" className="h-14 w-14 rounded-[20px] bg-white border border-border">
              <Plus className="h-6 w-6" />
            </Button>
          </div>

          {/* Timeline View */}
          <div className="space-y-8 relative before:absolute before:left-6 before:top-8 before:bottom-8 before:w-px before:bg-dashed before:border-l-2 before:border-dashed before:border-border/60">
            {[
              { time: '09:00 AM', title: 'Breakfast at Café de Flore', category: 'Food', duration: '1h', rating: 4.8 },
              { time: '11:00 AM', title: 'Eiffel Tower Tour', category: 'Sightseeing', duration: '2h', rating: 4.9 },
              { time: '02:00 PM', title: 'Louvre Museum Visit', category: 'Culture', duration: '3h', rating: 4.7 },
            ].map((activity, idx) => (
              <div key={idx} className="relative pl-20 group">
                <div className="absolute left-3 top-6 w-6 h-6 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10 shadow-glow">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                
                <Card className="hover:border-primary/50 group-hover:shadow-glow transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                        <Clock className="h-4 w-4" />
                        {activity.time} • {activity.duration}
                      </div>
                      <h3 className="text-2xl font-black text-secondary group-hover:text-primary transition-colors">{activity.title}</h3>
                      <span className="inline-block px-3 py-1 rounded-lg bg-muted/10 text-muted font-bold text-[10px] uppercase tracking-tighter">
                        {activity.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1.5 text-lg font-black text-accent">
                          <Star className="h-5 w-5 fill-accent" />
                          {activity.rating}
                        </div>
                        <p className="text-[10px] text-muted uppercase font-black tracking-tighter">Rating</p>
                      </div>
                      <Button variant="ghost" className="h-12 w-12 p-0 rounded-xl">
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
            
            <div className="pl-20">
              <button className="w-full py-8 border-2 border-dashed border-border rounded-[40px] text-muted font-black text-lg flex items-center justify-center gap-3 hover:bg-primary/5 hover:border-primary/30 transition-all group">
                <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform" />
                Add activity to {activeTab}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Insights & Tools */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-secondary text-white border-none relative overflow-hidden p-10">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Budget Status</span>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-black">$2,450.00</p>
                <p className="text-sm font-bold text-white/60">Estimated Total Expenses</p>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                <div className="bg-primary w-[65%] h-full rounded-full shadow-glow" />
              </div>
              <p className="text-xs font-bold text-white/50 italic text-center">"You're doing great! 35% under budget."</p>
            </div>
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] -mr-24 -mt-24" />
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-secondary ml-2">Trip Tools</h3>
            <div className="grid gap-4">
              <ToolLink 
                to={`/trips/${id}/checklist`} 
                icon={CheckSquare} 
                title="Packing Checklist" 
                desc="12/24 items packed" 
                color="bg-orange-500"
              />
              <ToolLink 
                to={`/trips/${id}/notes`} 
                icon={BookOpen} 
                title="Travel Journal" 
                desc="4 entries written" 
                color="bg-indigo-500"
              />
              <ToolLink 
                to={`/trips/${id}/invoice`} 
                icon={FileText} 
                title="Expense Invoice" 
                desc="Generate PDF report" 
                color="bg-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolLink({ to, icon: Icon, title, desc, color }) {
  return (
    <Link to={to}>
      <Card padding="sm" className="hover:border-primary group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn("p-4 rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110", color)}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-black text-secondary">{title}</h4>
              <p className="text-xs font-bold text-muted">{desc}</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted group-hover:translate-x-1 transition-transform" />
        </div>
      </Card>
    </Link>
  );
}

import { cn } from '@/components/common/UI';
