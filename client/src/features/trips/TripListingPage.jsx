import { Link } from 'react-router-dom';
import { 
  Plus, Search, MapPin, 
  ChevronRight, Filter, TrendingUp, Sparkles,
  Clock, Users, MoreHorizontal
} from 'lucide-react';
import { useTripStore } from '@/store/tripStore';
import { Button, Card, cn } from '@/components/common/UI';

export default function TripListingPage() {
  const { trips } = useTripStore();

  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-4 text-left">
          <h1 className="text-5xl font-black tracking-tight text-white">My <span className="text-primary italic">Trips</span></h1>
          <p className="text-slate-400 font-medium max-w-lg leading-relaxed">Manage your upcoming adventures and relive past journeys in high fidelity.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group flex-1 lg:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search trips..." 
              className="h-14 pl-12 pr-6 rounded-2xl glass border-white/5 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none w-full lg:w-64 text-white"
            />
          </div>
          <Link to="/trips/create">
            <Button size="lg" className="h-14 px-8 shadow-glow">
              <Plus className="h-5 w-5" />
              New Trip
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Main Feed */}
        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6 px-2">
            <div className="flex items-center gap-6">
              <button className="text-sm font-black text-primary relative pb-6 mb-[-25px]">
                Active Trips
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-glow" />
              </button>
              <button className="text-sm font-black text-slate-500 hover:text-white transition-colors pb-6 mb-[-25px]">
                Past Adventures
              </button>
            </div>
            <Button variant="ghost" className="h-10 px-4 gap-2 text-slate-500">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {trips.map((trip) => (
              <Card key={trip.id} padding="none" className="group overflow-hidden">
                <Link to={`/trips/${trip.id}`} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070`} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                      alt={trip.title}
                    />
                    <div className="absolute top-6 left-6 glass px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      In 12 Days
                    </div>
                  </div>
                  <div className="p-8 space-y-6 text-left">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors leading-tight">{trip.title}</h3>
                        <button className="p-2 text-slate-500 hover:text-white transition-colors">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-primary" />
                          {trip.place}
                        </div>
                        <div className="w-1 h-1 rounded-full bg-slate-800" />
                        <div className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-primary" />
                          2 Travelers
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-dashed border-white/5 flex items-center justify-between">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                          <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="h-8 w-8 rounded-lg border-2 border-card shadow-lg" alt="user" />
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                        View Itinerary
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}

            <Link to="/trips/create" className="h-[480px] rounded-[32px] border-2 border-dashed border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all group flex flex-col items-center justify-center gap-4">
              <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                <Plus className="h-8 w-8 text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-white">Create New Trip</p>
                <p className="text-sm font-bold text-slate-500">Plan your next masterpiece</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="lg:col-span-3 space-y-8">
          <Card className="bg-secondary p-8 text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="bg-white/10 p-3 rounded-2xl w-fit">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-black leading-tight">AI Travel Insight</h3>
              <p className="text-sm font-bold text-white/50 leading-relaxed">
                Based on your interest in "Nature", you might love exploring the Swiss Alps this winter.
              </p>
              <Button variant="outline" className="w-full h-12 border-white/10 text-white hover:bg-white/5">Get Recommendation</Button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-black text-white ml-2 text-left">Quick Stats</h3>
            <div className="grid gap-4">
              <StatItem label="Total Miles" value="12,450" icon={TrendingUp} />
              <StatItem label="Cities Visited" value="24" icon={MapPin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, icon: Icon }) {
  return (
    <Card padding="sm" className="bg-white/[0.02] border-white/5">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="text-left">
          <p className="text-2xl font-black text-white leading-none">{value}</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">{label}</p>
        </div>
      </div>
    </Card>
  );
}
