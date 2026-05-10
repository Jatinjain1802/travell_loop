import { useEffect, useState } from 'react';
import { 
  Plus, Search, MapPin, 
  ChevronRight, Filter, TrendingUp, Sparkles,
  Clock, Users, MoreHorizontal, Calendar,
  ArrowRight, Globe, Zap
} from 'lucide-react';
import { useTripStore } from '@/store/tripStore';
import { Button, Card, cn } from '@/components/common/UI';
import TripCard from './components/TripCard';

export default function TripListingPage() {
  const { trips, fetchTrips, loading } = useTripStore();
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchTrips(activeTab);
  }, [fetchTrips, activeTab]);


  return (
    <div className="space-y-20 pb-32 animate-in fade-in duration-700">
      {/* Header Section */}
      <section className="relative pt-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 relative z-10">
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-xl">
                <Globe className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Explorer Dashboard</span>
            </div>
            <h1 className="text-7xl font-black tracking-tighter text-secondary leading-[0.9]">
              Your <span className="text-primary italic">Adventures.</span>
            </h1>
            <p className="text-slate-400 font-bold max-w-lg leading-relaxed text-lg">
              Manage your upcoming trips, explore past memories, and architect your next great escape.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative group w-full sm:w-80">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search destinations..." 
                className="h-20 pl-14 pr-8 rounded-3xl bg-white border-slate-100 border text-sm font-bold focus:ring-8 focus:ring-primary/5 transition-all outline-none w-full shadow-premium"
              />
            </div>
            <Link to="/trips/create" className="w-full sm:w-auto">
              <Button size="xl" className="h-20 px-10 shadow-2xl shadow-primary/20 group/btn w-full">
                <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform" />
                New Trip
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-16">
        {/* Main Feed */}
        <div className="lg:col-span-9 space-y-12">
          {/* Tabs & Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-100 pb-8 px-2">
            <div className="flex items-center gap-10">
              <button 
                onClick={() => setActiveTab('upcoming')}
                className={cn(
                  "text-sm font-black transition-all relative group",
                  activeTab === 'upcoming' ? "text-secondary" : "text-slate-400 hover:text-secondary"
                )}
              >
                Upcoming
                {activeTab === 'upcoming' && <div className="absolute -bottom-9 left-0 right-0 h-1.5 bg-primary rounded-t-full shadow-glow" />}
              </button>
              <button 
                onClick={() => setActiveTab('completed')}
                className={cn(
                  "text-sm font-black transition-all relative group",
                  activeTab === 'completed' ? "text-secondary" : "text-slate-400 hover:text-secondary"
                )}
              >
                Past
                {activeTab === 'completed' && <div className="absolute -bottom-9 left-0 right-0 h-1.5 bg-primary rounded-t-full shadow-glow" />}
              </button>
              <button className="text-sm font-black text-slate-400 hover:text-secondary transition-colors">
                Wishlist
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase text-slate-300 mr-2">Sort by: Date</span>
              <Button variant="ghost" size="sm" className="bg-slate-50 border border-slate-100 px-4 gap-2 text-slate-500 hover:bg-white hover:shadow-md transition-all">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {loading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="h-[400px] rounded-[40px] bg-slate-50 animate-pulse border border-slate-100" />
              ))
            ) : trips.length > 0 ? (
              trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-slate-200" />
                </div>
                <h3 className="text-xl font-black text-secondary">No {activeTab} trips found</h3>
                <p className="text-slate-400 mt-2 font-bold">Start by creating your first itinerary!</p>
              </div>
            )}


            {/* Empty State / Create New Card */}
            <Link to="/trips/create" className="h-full min-h-[400px] rounded-[40px] border-4 border-dashed border-slate-100 hover:border-primary/40 hover:bg-primary/5 transition-all group flex flex-col items-center justify-center gap-8">
              <div className="h-24 w-24 bg-white rounded-[32px] flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-premium border border-slate-50">
                <Plus className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-2xl font-black text-secondary">Draft an Adventure</p>
                <p className="text-sm font-bold text-slate-400">Map out your next dream destination</p>
              </div>
            </Link>
          </div>

          {/* Trending Section */}
          <section className="pt-20 space-y-10">
            <div className="flex items-center justify-between px-2">
              <div className="space-y-1">
                <h2 className="text-3xl font-black text-secondary tracking-tight">Trending Destinations</h2>
                <p className="text-sm font-bold text-slate-400">Where the community is heading next</p>
              </div>
              <Button variant="ghost" className="text-primary gap-2 font-black">
                See all
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-8 overflow-x-auto pb-10 no-scrollbar -mx-2 px-2">
              <TrendingDest image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000" city="Bali" country="Indonesia" />
              <TrendingDest image="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1000" city="Venice" country="Italy" />
              <TrendingDest image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000" city="Kyoto" country="Japan" />
              <TrendingDest image="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000" city="Dubai" country="UAE" />
            </div>
          </section>
        </div>

        {/* Sidebar Insights */}
        <aside className="lg:col-span-3 space-y-12">
          {/* AI Banner */}
          <div className="bg-secondary rounded-[40px] p-10 text-white relative overflow-hidden group shadow-2xl ring-1 ring-white/10">
            <div className="relative z-10 space-y-10">
              <div className="bg-primary p-5 rounded-2xl w-fit shadow-glow animate-bounce">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black leading-tight tracking-tight">Loop AI Discovery</h3>
                <p className="text-sm font-bold text-white/50 leading-relaxed">
                  Based on your interest in <span className="text-white">Oceania</span>, we've found 3 private islands that match your style.
                </p>
              </div>
              <Button className="w-full h-16 bg-white text-secondary hover:scale-[1.02] shadow-xl font-black transition-all">
                Unlock Insights
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-60 h-60 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />
          </div>

          {/* Quick Stats */}
          <div className="space-y-8">
            <h3 className="text-xl font-black text-secondary ml-2 flex items-center gap-3">
              Personal Stats
              <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
            </h3>
            <div className="grid gap-6">
              <StatItem label="Miles Traveled" value="28.4k" icon={TrendingUp} />
              <StatItem label="Points Earned" value="4,290" icon={Sparkles} />
              <StatItem label="Unique Cities" value="12" icon={MapPin} />
            </div>
          </div>

          {/* Community Feed Preview */}
          <Card className="p-8 space-y-6">
            <h4 className="text-sm font-black text-secondary">Travel Buddies</h4>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?u=buddy${i}`} className="h-10 w-10 rounded-full border-4 border-white shadow-sm" alt="buddy" />
              ))}
              <div className="h-10 w-10 rounded-full bg-slate-50 border-4 border-white flex items-center justify-center text-[10px] font-black text-slate-400">+12</div>
            </div>
            <p className="text-xs font-bold text-slate-400">3 friends are currently traveling in Europe.</p>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function TrendingDest({ image, city, country }) {
  return (
    <div className="flex-none w-72 h-96 relative rounded-[32px] overflow-hidden group cursor-pointer shadow-premium">
      <img src={image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={city} />
      <div className="absolute inset-0 bg-linear-to-t from-secondary/80 via-secondary/10 to-transparent" />
      <div className="absolute bottom-8 left-8 text-white space-y-1">
        <p className="text-2xl font-black tracking-tight">{city}</p>
        <p className="text-xs font-bold text-white/60 uppercase tracking-widest">{country}</p>
      </div>
      <div className="absolute top-6 right-6 h-10 w-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
        <ArrowRight className="h-5 w-5 text-white" />
      </div>
    </div>
  );
}

function StatItem({ label, value, icon: Icon }) {
  return (
    <Card padding="sm" className="bg-white border-slate-50/50 shadow-premium hover:shadow-xl hover:-translate-y-1 group transition-all duration-300">
      <div className="flex items-center gap-5">
        <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-primary/10 transition-colors">
          <Icon className="h-6 w-6 text-slate-400 group-hover:text-primary transition-colors" />
        </div>
        <div className="text-left">
          <p className="text-2xl font-black text-secondary leading-none">{value}</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1.5">{label}</p>
        </div>
      </div>
    </Card>
  );
}
